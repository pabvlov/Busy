const express = require('express');
const router = express.Router();
const service = require('../services/service.service.js');
const multer = require('multer');

const storageEngine = multer.diskStorage({
    destination: "./app/images",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 100000000 },
});

router.get('/services', async (err, res, next) => {
    try {
        const services = service.getServices().then((data) => {
            console.log(data[0]);
            res.json({ ok: true, content: data[0].result })
        })
        
        
    } catch (err) {
        console.error(`Error while getting all services: `, err.message);
        res.json({ ok: false, message: err.message });
        next(err);
    }
});

router.get('/service/:id', async (req, res) => {
    try {
        const serviceById = await service.getServiceById(req.params.id);
        res.status(200).json({
            ok: true,
            content: {
                service: serviceById[0],
            }
        });
    } catch (err) {
        console.error(`Error while getting the service: `, err.message);
        next(err);
    }
});

router.post('/work/uploadService', upload.single("file"), (req, res) => {
    try {
        console.log(req.file);
        if (req.file) {
            res.json(
                {
                    ok: true,
                    message: "Image uploaded: " + req.file.filename,
                }
            );
        } else {
            res.status(400).json({
                ok: false,
                message: "No file uploaded, please upload a valid one",
            });
        }
    } catch (err) {
        console.error(`Error while uploading service: `, err.message);
        next(err);
    }
});

router.post('/work/apply', (req, res, next) => {
    try {
        const { id_trabajo, rut_trabajador } = req.body;
        if (id_trabajo == 0 || rut_trabajador == 0) {
            res.status(200).json({
                ok: false,
                message: "Necesitamos que actualices la página y vuelvas a intentarlo",
            });
        }
        if (work.checkHimself(id_trabajo, rut_trabajador)) {
            console.log();
            console.log("No puedes postularte a tu propio trabajo");
            res.status(200).json({
                ok: false,
                message: "No puedes postularte a tu propio trabajo",
            });
        } else {
            console.log(work.alreadyApplied(id_trabajo, rut_trabajador));
            if (!work.alreadyApplied(id_trabajo, rut_trabajador)) {
                work.applyWork(id_trabajo, rut_trabajador)
                res.status(200).json({
                    ok: true,
                    message: "Trabajo aplicado con éxito",
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: "Ya te has postulado a este trabajo",
                });
            }
        }
    } catch (err) {
        console.error(`Error while applying service: `, err.message);
        next(err);
    }
});

router.post('/service/add', upload.single("file"), (req, res, next) => {
    try {
        console.log(JSON.parse(req.body.service));
        console.log(req.file);
        const { titulo, descripcion, precio, rut_usuario } = JSON.parse(req.body.service);
        const object = {
            titulo,
            descripcion,
            precio,
            image: req.file.filename,
            rut_usuario: rut_usuario,
        }

        if (req.file) {
            if (service.uploadService(object)) {
                res.status(200).json({
                    ok: true,
                    message: "Trabajo subido con éxito",
                })
            } else {
                res.status(400).json({
                    ok: false,
                    message: "Error while uploading work",
                })
            }
        } else {
            res.status(400).json({
                ok: false,
                message: "No file uploaded, please upload a valid one",
            });
        }
    } catch (err) {
        console.error(`Error while adding service: `, err.message);
        next(err);
    }
});


module.exports = router;