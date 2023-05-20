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
        res.json(await { ok: true, content: await work.getWorks()});
    } catch (err) {
        console.error(`Error while getting all jobs: `, err.message);
        res.json({ ok: false, message: err.message });
        next(err);
    }
});

router.get('/work/getWorkById/:id', async (req, res) => {
    try {
        const workById = await work.getWorkById(req.params.id);
        res.status(200).json({
            ok: true,
            work: workById,
        });
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

router.post('/work/add', upload.single("file"), (req, res) => {
    try {
        console.log(JSON.parse(req.body.work));
        console.log(req.file);
        const { title, description, price, peopleNeeded, endDate, selectionDate, rut_empleador } = JSON.parse(req.body.work);
        const object = {
            title,
            description,
            price,
            peopleNeeded,
            endDate,
            selectionDate,
            image: req.file.filename,
            rut_empleador: rut_empleador
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


module.exports = router;