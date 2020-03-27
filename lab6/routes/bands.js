var express = require('express');
var router = express.Router();
var data = require("../data");
var bands = data.bands;

router.get("/", async (req, res) => {
    try {
        let GetAllBands = await bands.GetAllBands();
        res.status(200).json(GetAllBands);
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.post("/", async (req, res) => {
     try {
        if (typeof req.body.bandName == "string" && typeof req.body.bandMembers == "object" && typeof req.body.yearFormed == "number" && typeof req.body.genres == "object" && typeof req.body.recordLabel == "string" && req.body.bandName  && req.body.bandMembers  && req.body.bandMembers.length  && req.body.yearFormed && req.body.genres && req.body.genres.length && req.body.recordLabel) {
            let CreateBands = await bands.CreateBands(req.body.bandName, req.body.bandMembers, req.body.yearFormed, req.body.genres, req.body.recordLabel);
            res.status(200).json(CreateBands);
        } else {
            res.status(400).json("data are not perfect.");
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let GetBandByID = await bands.GetBandByID(req.params.id);
        if (GetBandByID == null) {
            res.status(404).json("Id not found");
        } else {
            res.status(200).json(GetBandByID);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put("/:id", async (req, res) => {
        try {
        if (typeof req.body.bandName == "string" && typeof req.body.bandMembers == "object" && typeof req.body.yearFormed == "number" && typeof req.body.genres == "object" && typeof req.body.recordLabel == "string" && req.body.bandName  && req.body.bandMembers  && req.body.bandMembers.length  && req.body.yearFormed && req.body.genres && req.body.genres.length && req.body.recordLabel) {
            let Updateband = await bands.Updateband(req.params.id, req.body.bandName, req.body.bandMembers, req.body.yearFormed, req.body.genres, req.body.recordLabel);
            if (Updateband == null) {
                res.status(404).json("Id not found");
            } else {
                res.status(200).json(Updateband);
            }
        } else {
            res.status(400).json("data are not perfect.");
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let deleteBand = await bands.deleteBand(req.params.id);
        if(deleteBand == null){
            res.status(404).json("Id not found");
        }else{
            res.status(200).json(deleteBand);
        }
    } catch (e) {
        res.status(500).json({ error:  e.message });
    }
});

module.exports = router;
