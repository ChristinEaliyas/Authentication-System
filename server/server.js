const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors')
const app = express();
const server = require("http").Server(app);


// ----- Env Variable -----
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT

// ----- Database ----
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));


// ----- Client Server Setup -----

app.use(cors())
app.use(express.json());


app.use('/', (req, res) => {
  return res.json("Server Running");
})
// ----- Client API -----
app.use('/api-request/register', require('./routes/register'));
app.use('/api-request/login', require('./routes/auth'));

app.use(verifyJWT);
app.post('/jwt-test', (req, res) => {
  console.log("You have Access");
  res.status(200).send()
})


app.post('/api-request/image', (req, res) => {
  const { imageData } = req.body;
  console.log("Function Called");
  // Create a unique filename using a timestamp
  const fileName = `photo_${Date.now()}.jpeg`;
  const filePath = path.join(__dirname, 'photos', fileName);

  // Save the image to the server
  fs.writeFile(filePath, imageData, 'base64', (err) => {
    if (err) {
      console.error(err);
      console.log("Image Not Saved");
      res.status(500).send('Error saving photo');
    } else {
      console.log('Photo saved successfully');
      res.status(200).send('Photo saved successfully');
    }
  });
  console.log("Error");
  re.status(400).send("Image not Saved");
});

server.listen(PORT, () =>{
  console.log("Server Running", PORT);
});
