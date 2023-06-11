const express = require('express');
const router = express.Router();
const work = require('../services/work.service.js');
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

router.get('/works', async (req, res) => {
    try {
        const works = await work.getWorks()

        res.json({ ok: true, content: works.map(item => item.result[0]) })
        //res.json(await { ok: true, content: works });
    } catch (err) {
        console.error(`Error while getting all jobs: `, err.message);
        res.json({ ok: false, message: err.message });
        next(err);
    }
});

router.get('/work/:id', async (req, res, err) => {
    try {
        const workAppliers = await work.getWorkAppliers(req.params.id);
        res.status(200).json({
            ok: true,
            content: workAppliers[0].result,
        });
    } catch (err) {
        console.error(`Error while getting the job: `, err.message);
        next(err);
    }
});

router.put('/work/choose', async (req, res, err) => {
    try {
        const applier = work.chooseApplier(req.body.id_trabajo, req.body.rut_trabajador, req.body.state).then((data) => {
            res.json({ ok: true, content: data })
        console.log(applier);
        })
    } catch (err) {
        console.error(`Error while getting the job: `, err.message);
        next(err);
    }
});

router.post('/work/uploadWork', upload.single("file"), (req, res) => {
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
        console.error(`Error while getting all works: `, err.message);
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
        if(work.checkHimself(id_trabajo, rut_trabajador)) {
            console.log("No puedes postularte a tu propio trabajo");
            res.status(200).json({
                ok: false,
                message: "No puedes postularte a tu propio trabajo",
            });
        } else {
            console.log(work.alreadyApplied(id_trabajo, rut_trabajador));
            if(!work.alreadyApplied(id_trabajo, rut_trabajador)){
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
        console.error(`Error while getting all works: `, err.message);
        next(err);
    }
});

router.post('/work/add', upload.single("file"), (req, res) => {
    try {
        console.log(JSON.parse(req.body.work));
        console.log(req.file);
        const { title, description, price, peopleNeeded, endDate, selectionDate, rut_empleador, ubicacion } = JSON.parse(req.body.work);
        const object = {
            title,
            description,
            price,
            peopleNeeded,
            endDate,
            selectionDate,
            image: req.file.filename,
            rut_empleador: rut_empleador,
            ubicacion: ubicacion
        }
        
        if (req.file) {
            if(work.uploadWork(object)){
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
        console.error(`Error while getting all works: `, err.message);
        next(err);
    }
});

router.delete('/work/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (id == 0) {
            res.status(200).json({
                ok: false,
                message: "Necesitamos que actualices la página y vuelvas a intentarlo",
            });
        }
        if(work.deleteWork(id)){
            res.status(200).json({
                ok: true,
                message: "Trabajo eliminado con éxito",
            });
        } else {
            res.status(400).json({
                ok: false,
                message: "Error while deleting work",
            });
        }
    } catch (err) {
        console.error(`Error while getting all works: `, err.message);
        next(err);
    }
});


module.exports = router;