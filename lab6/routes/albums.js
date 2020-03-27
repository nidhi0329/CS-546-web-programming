var express = require('express');
var router = express.Router();
var data = require("../data");
var albums = data.albums;

router.get("/", async (req, res) => {
    try {
        let GetAllAlbums = await albums.GetAllAlbums();
        res.status(200).json(GetAllAlbums);
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.post("/", async (req, res) => {
    try {
        if (typeof req.body.title == "string" && typeof req.body.author == "string" && req.body.title && req.body.author && req.body.songs.length) {
            let CreateAlbums = await albums.CreateAlbums(req.body.title, req.body.author, req.body.songs);
            res.status(200).json(CreateAlbums);
        } else {
            res.status(400).json("data are not perfect.");
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let GetAlbumsByID = await albums.GetAlbumsByID(req.params.id);
        if (GetAlbumsByID == null) {
            res.status(404).json("Id not found");
        } else {
            res.status(200).json(GetAlbumsByID);
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        if (req.body.newTitle || req.body.newTitle) {
            let UpdateAlbums = await albums.UpdateAlbums(req.params.id, req.body.newTitle, req.body.newTitle);
            if (UpdateAlbums == null) {
                res.status(404).json({"error" : "Id not found"});
            } else {
                res.status(200).json(UpdateAlbums);
            }
        } else {
            res.status(400).json("data are not perfect.");
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let deleteAlbums = await albums.deleteAlbums(req.params.id);
        if (deleteAlbums == null) {
            res.status(404).json("Id not found");
        } else {
            res.status(200).json(deleteAlbums);
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});
module.exports = router;