const express = require("express");
const mongoose = require("mongoose");
const Blogrouter = require("./routes/Blog_routes");
const router = require("./routes/User_routes");

const mongodbUri = "mongodb+srv://admin:20cryXMlueTh7cDL@cluster0.nntgedh.mongodb.net/?retryWrites=true&w=majority";


const app = express();

app.use(express.json());


app.use("/api/user", router);
app.use('/api/blog',Blogrouter);



mongoose
  .connect(mongodbUri)
  .then(() => {
    app.listen(5500, () => {
      console.log("4000 port is listening");
    });
  })
  .catch((err) => {
    console.log(err);
  });
