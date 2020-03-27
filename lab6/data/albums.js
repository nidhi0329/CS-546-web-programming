var mongoCollections = require('../config/mongoCollections');
var albums = mongoCollections.albums;
var bands = mongoCollections.bands;
var mongoObj = new require('mongodb');

const GetAllAlbums = async function GetAllAlbums() {
    try {
        let albumCollection = await albums();
        let data = await albumCollection.find({}).toArray();
        let bandCollection = await bands();
        var bandIds = [];
        data.forEach(ele => {
            bandIds.push(mongoObj.ObjectID(ele.author))
        });
        let bandData = await bandCollection.find({ _id: { $in: bandIds } }).toArray();
        data.forEach(ele => {
            bandData.forEach(element => {
                if (ele.author == element._id.toString()) {
                    ele.author = {
                        _id: element._id.toString(),
                        bandName: element.bandName
                    }
                }
            });
        });
        return data;
    } catch (e) {
        throw (e);
    }
};

const CreateAlbums = async function CreateAlbums(title, author, songs) {
    try {
        let bandCollection = await bands();
        let id = mongoObj.ObjectID(author)
        let bandData = await bandCollection.findOne({ _id: id });
        if (bandData) {
            let albumsData = {
                title: title,
                songs: (songs.length) ? songs : [],
                author: author
            };
            let albumCollection = await albums();
            let data = await albumCollection.insertOne(albumsData);
            let albumId = data.ops[0]._id.toString();
            bandData.albums.push(albumId);
            let updateJson = {
                $set: { albums: bandData.albums }
            }
            var updateBand = await bandCollection.updateOne({ _id: id }, updateJson);
            data.ops[0].author = {
                _id: bandData._id,
                bandName: bandData.bandName
            }
            return data.ops[0];
        } else {
            throw ("band data doesnot exist.");
        }
    } catch (e) {
        throw (e);
    }
}


const GetAlbumsByID = async function GetAlbumsByID(id) {
    try {
        let albumCollection = await albums();
        let album_id = mongoObj.ObjectID(id)
        let albumsData = await albumCollection.findOne({ _id: album_id });
        if (albumsData == null) {
            return albumsData;
        } else {
            let bandCollection = await bands();
            let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(albumsData.author) });
            if (bandData == null) {
                throw ("data not found");
            } else {
                albumsData.author = {
                    _id: bandData._id,
                    bandName: bandData.bandName
                }
                return (albumsData);
            }
        }
    } catch (e) {
        throw (e);
    }
};

const UpdateAlbums = async function UpdateAlbums(id, newTitle, newSongs) {
    try {
        let albumCollection = await albums();
        let albumsData = await albumCollection.findOne({ _id: mongoObj.ObjectID(id) });
        if (albumsData == null) {
            return albumsData;
        } else {
            let updateJson = {};
            if (newTitle) {
                updateJson["title"] = newTitle;
            }

            if (newSongs) {
                albumsData.songs.push(newSongs);
                updateJson["songs"] = albumsData.songs
            }
            var UpdateAlbum = await albumCollection.updateOne({ _id: mongoObj.ObjectID(id) }, { $set: updateJson });
            if (UpdateAlbum.matchedCount === 0) {
                res.status(404).json("Could not update band with id of " + id)
            } else {
                var data = await getAlbums(id);
                return (data);
            }
        }
    } catch (e) {
        throw (e);
    }
}

const deleteAlbums = async function deleteAlbums(id) {
    try {
        let albumsData = await getAlbums(id);
        if (albumsData == null) {
            return albumsData;
        } else {
            let req_id = mongoObj.ObjectID(id);
            let albumCollection = await albums();
            var deleteAlbums = await albumCollection.deleteOne({ _id: req_id });
            albumsData["deleted"] = true;
            let bandCollection = await bands();
            let bandid = mongoObj.ObjectID(albumsData.author._id);
            let bandData = await bandCollection.findOne({ _id: bandid });
            if (bandData) {
                bandData.albums = bandData.albums.filter(dt => {
                    if (dt.toString() == id) {
                        return false;
                    } else {
                        return true
                    }
                });
                let updateJson = {
                    $set: { albums: bandData.albums }
                }
                var updateBand = await bandCollection.updateOne({ _id: bandid }, updateJson);
                return (albumsData);
            } else {
                return (albumsData);
            }
        }
    } catch (e) {
        throw (e);
    }

}


const getAlbums = async (id) => {
    let albumCollection = await albums();
    let ids = mongoObj.ObjectID(id);
    let albumsData = await albumCollection.findOne({ _id: ids });
    if (albumsData == null) {
        return albumsData;
    } else {
        let bandCollection = await bands();
        let bandData = await bandCollection.findOne({ _id: mongoObj.ObjectID(albumsData.author) });
        albumsData.author = {
            _id: albumsData.author,
            bandName: (bandData.bandName) ? bandData.bandName : ""
        }
        return albumsData;
    }
}


module.exports = {
    GetAllAlbums: GetAllAlbums,
    CreateAlbums: CreateAlbums,
    GetAlbumsByID: GetAlbumsByID,
    UpdateAlbums: UpdateAlbums,
    deleteAlbums: deleteAlbums
}