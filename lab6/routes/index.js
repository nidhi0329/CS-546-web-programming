var bandsRoutes = require("./bands");
var albumsRoutes = require("./albums");

const constructorMethod = app => {
  app.use("/bands", bandsRoutes);
  app.use("/albums", albumsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Post not found" });
  });
};
module.exports = constructorMethod;