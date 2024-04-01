const router = require("express").Router();

// our artist
const artist = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    // twitter:req.body.twitter,
    instagram: req.body.instagram,
  });
  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

router.get("/getAll", async (req, res) => {
  const cursor = await artist.find({}).sort({ createdAt: 1 });
  if (cursor) {
    return res.status(200).send({ success: true, data: cursor });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    Upsert: true,
    new: true,
  };

  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        instagram: req.body.instagram,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await artist.deleteOne(filter);
  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "data deleted successfully", Data: result });
  } else {
    return res.status(400).send({ success: false, msg: "data not found" });
  }
});

module.exports = router;
