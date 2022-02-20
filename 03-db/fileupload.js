const express = require('express');
const app = express();
const multer = require('multer'); // Load multer- Multer is used to handle files
const morgan = require('morgan'); // Morgan logs requests that we get in the console


app.use(morgan('combined'));
app.use(express.static('static'));

// const urlencoded = express.urlencoded({ extended: false }); <-- For encoded URLs
// const jsonencoder = express.json(); <-- For json

// Save file on the diskStorage
const storageObject = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Save file with unique name by adding the current date
    }
  }
);

// Start multer
const multipartDataEncoder = multer({ storage: storageObject });

// Use multer for a single file
app.post('/upload', multipartDataEncoder.single('myFile'), (req, res) => {
  console.log(req.file);
  res.send(req.file);
});

app.listen(3000, () => {
	console.log(`🥳 Yay, server started at http://localhost:3000`);
});