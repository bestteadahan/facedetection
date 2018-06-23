const express = require('express');
const router = express.Router();
const fs = require('fs');
const PythonShell = require('python-shell');

// const multer = require('multer')
// // 定義form parser儲存位置以及檔名格式
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './tmp/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
//     }
// })
// // 建立multer()物件
// const FormParser = multer({
//     preservePath: true,
//     storage: storage
// })



router.get('/', (req, res) => {
    res.redirect('/face')
});

router.get('/:type', (req, res) => {
    let type = req.params.type
    res.render(type, { title: type.toUpperCase() })
});


router.post('/', (req, res) => {

    let head = req.body.head,
        passport = req.body.passport,
        headpath = 'uploads/head.png',
        passportpath = 'uploads/passport.png',
        funcPath = 'detect.py'

    fs.writeFileSync(headpath, head.split(',')[1], 'base64')
    fs.writeFileSync(passportpath, passport.split(',')[1], 'base64')

    let options = {
        mode: 'text',
        pythonOptions: ['-u', '-W ignore'],
        args: [headpath, passportpath]
    }

    PythonShell.run(funcPath, options, function (err, results) {
        // let data = JSON.parse(results)
        if (err) console.log(err)
        
        let data = JSON.parse(results)
        console.log('results: ', data)
        res.send(data.toString())
    })

    // res.send(true)
});

module.exports = router;
