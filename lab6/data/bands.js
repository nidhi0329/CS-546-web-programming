var mongoCollections = require('../config/mongoCollections');
var bands = mongoCollections.bands;
var albums = mongoCollections.albums;
var mongoObj = new require('mongodb');

const GetAllBands = async function GetAllBands() {
    try {
        let bandCollection = await bands();
        let data = await bandCollection.find({}).toArray();
        let albumCollection = await albums();
        var albumsIds = [];
        data.forEach(ele => {
            ele.albums.forEach(ele1 => {
                albumsIds.push(mongoObj.ObjectID(ele1))
            });
        });
        let albumsData = await albumCollection.find({ _id: { $in: albumsIds } }).toArray();
        data.forEach(ele => {
            let albums = [];
            ele.albums.forEach(aelement => {
                albumsData.filter(element => {
                    if (aelement == element._id.toString()) {
                        albums.push(element)
                    }
                });
            });
            ele.albums = albums;
        });
        return data;
    } catch (e) {
        throw (e)
    }
};

const CreateBands = async function CreateBands(bandName, bandMembers, yearFormed, genres, recordLabel) {
    try {

        let bandCollection = await bands();
        let insertBand = {
            bandName: bandName,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            genres: genres,
            recordLabel: recordLabel,
            albums: []
        };
        let data = await bandCollection.insertOne(insertBand);
        return data.ops[0];

    } catch (e) {
        throw (e);
    }
};

const GetBandByID = async function GetBandByID(id) {
    try {
        let bandCollection = await bands();
        let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(id) });
        let Ids = [];
        if (bandData == null) {
            return bandData;
        } else {
            bandData.albums.filter(id => {
                Ids.push(mongoObj.ObjectID(id));
            })
            let albumCollection = await albums();
            let albumsData = await albumCollection.find({ _id: { $in: Ids } }).toArray();
            bandData.albums = albumsData;
            return bandData;
        }
    } catch (e) {
        throw (e);
    }
};

const Updateband = async function Updateband(id, bandName, bandMembers, yearFormed, genres, recordLabel) {
    try {
        let bandCollection = await bands();
        let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(id) });
        if (bandData == null) {
            return bandData;
        } else {
            let updateJson = {
                $set: {
                    "bandName": bandName,
                    "bandMembers": bandMembers,
                    "yearFormed": yearFormed,
                    "genres": genres,
                    "recordLabel": recordLabel,
                    "albums": (bandData.albums && bandData.albums.length) ? bandData.albums : []
                }
            };
            let bandCollection = await bands();
            let updateBand = await bandCollection.updateOne({ _id: mongoObj.ObjectID(id) }, updateJson);
            if (updateBand.matchedCount === 0) {
                throw ("data not updated");
            } else {
                let data = await getBand(id);
                return data;
            }
        }
    } catch (e) {
        throw (e)
    }
}

const deleteBand = async function deleteBand(id) {
    try {
        let bandCollection = await bands();
        let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(id) });
        if (bandData == null) {
            return bandData;
        } else {
            var deleteBand = await bandCollection.deleteOne({ _id: mongoObj.ObjectID(id) });
            let albumsIds = []
            bandData.albums.filter(dt => {
                albumsIds.push(mongoObj.ObjectID(dt));
            })
            let albumCollection = await albums();
            let albumsData = await albumCollection.find({ _id: { $in: albumsIds } }).toArray();
            var deleteAlbums = await albumCollection.deleteMany({ _id: { $in: albumsIds } });
            bandData["deleted"] = true;
            return (bandData);
        }
    } catch (e) {
        throw (e);
    }

}

const getBand = async (id) => {
    let bandCollection = await bands();
    let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(id) });
    let Ids = [];
    bandData.albums.filter(id => {
        Ids.push(mongoObj.ObjectID(id));
    })
    let albumCollection = await albums();
    let albumsData = await albumCollection.find({ _id: { $in: Ids } }).toArray();
    bandData.albums = albumsData;
    return bandData;
}
module.exports = {
    GetAllBands: GetAllBands,
    CreateBands: CreateBands,
    GetBandByID: GetBandByID,
    Updateband: Updateband,
    deleteBand: deleteBand
}