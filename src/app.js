const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/index');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: ["http://localhost:5500", "https://web-una.vercel.app"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    createParentPath: true,
    tempFileDir: "./temp/",
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/web-una", routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
