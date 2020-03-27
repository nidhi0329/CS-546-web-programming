const dbcollection = require("../mongoCollection");
const animals = dbcollection.animals;

module.exports = {
async create(name, animalType) {
        if (!name || (typeof(name) != "string")) throw "You must provide animal name";

        if (!animalType || (typeof(animalType) != "string"))
            throw "You must provide an animal type";

        var animalCollection = await animals();
        let New_Animal = {
            name: name,
            animalType: animalType
        };
        var Add_animal = await animalCollection.insertOne(New_Animal);
        if (Add_animal.insertedCount === 0) throw "Could not add animal";

        var New_ID = Add_animal.insertedId;

        var animal = await this.get(New_ID);
        return animal;
    },

    async getAll() {
            var animalCollection = await animals();
            var Data = await animalCollection.find({}).toArray();
            return Data;
},

async get(id) {
        if (!id) throw ("You must provide an id.");
        var animalCollection = await animals();
        var object_id = new require('mongodb').ObjectID(id);
        var get_ID = await animalCollection.findOne({ _id: object_id });
        if (get_ID == null) throw "No animal with this id.";
        return get_ID;
},

async remove(id) {
        if (!id) throw "Id not provided, plese provide it";
        var animalCollection = await animals();
        var object_id = new require('mongodb').ObjectID(id);
        var Default = await this.get(id);
        var Eliminate_ID = await animalCollection.removeOne({ _id: object_id });
        if (Eliminate_ID.deletedCount === 0) {
            throw `unable to remove animal with id of ${id}`;
        }
        else
            return Default;
},

async rename(id, newName) {
        if (!id) throw ("You must provide an id.");
        if (!newName) throw ("You must provide an new name.");
        if (typeof newName !== "string") throw "newName needs to be in string";
        var animalCollection = await animals();
        var object_id = new require('mongodb').ObjectID(id);
        var New_animal = await animalCollection.updateOne({ _id: object_id }, { $set: { name: newName } });
        if (New_animal.matchedCount === 0) throw new Error("Could not update animal name with id of " + id)
        return await this.get(id);
}

};