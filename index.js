const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const bodyParser = require('body-parser')
const upload = multer({ dest: '/uploads' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// solution

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
    try {
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        })
    }
    catch (error){
        res.send(`the following error occurred: ${error}`)
    }
})
