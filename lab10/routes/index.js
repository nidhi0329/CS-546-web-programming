const peopleRoutes = require("./route");


const constructorMethod = app => {
    app.use("/", peopleRoutes);


    app.use("*", (req, res) => {
        res.status(404);
    });
};

module.exports = constructorMethod;