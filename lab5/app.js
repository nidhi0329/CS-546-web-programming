
const express = require("express");
const app = express();
var port = 3000;
const routes = require('./routes/index'); 
 
app.use('/', routes);

app.use("*", (req,res)=>{
  res.status(404).json({ message: "not found" });
});

app.listen(port, () => {
  console.log("Your routes will be running on http://localhost:" +port);
});