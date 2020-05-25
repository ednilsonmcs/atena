const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'xlsx'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if(!fs.existsSync(`./tmp/xlsx`)) fs.mkdirSync(`./tmp/xlsx`, { recursive: true })
            cb(null,path.resolve(__dirname, '..', '..', 'tmp', 'xlsx'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`
                cb(null, filename)
            });
        }
    }),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Tipo de arquivo inválido!'));
        }
    },
};