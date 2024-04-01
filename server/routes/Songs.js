const router =require('express').Router();

const song=require('../models/song');

router.post('/save',async(req,res)=>{
    const newSong= song(
        {
            name:req.body.name,
            imageUrl:req.body.imageUrl,
            songUrl:req.body.songUrl,
            album:req.body.album,
            artist:req.body.artist,
            language:req.body.language,
            catgerory:req.body.catgerory
        });
    try{
        const savedSong=await newSong.save();
        return res.status(200).send({success:true, song: savedSong});
    }catch(error){
        return res.status(400).send({success:false , msg:error});
    }
});
router.get("/getOne/:id",async (req,res)=>{
    const filter ={_id: req.params.id};

    const Data =await song.findOne(filter);

    if(Data){
        return res.status(200).send({success:true, song: Data});
    }else{
        return res.status(400).send({success:false , msg:"data not found"});
    }
});

router.get("/getAll", async (req,res)=>{
    const cursor = await  song.find({}).sort({createdAt: 1});
    if(cursor){
        return res.status(200).send({success:true, songs: cursor});
    }else{
        return res.status(400).send({success:false , msg:"data not found"});
    }
});

router.put("/update/:id",async(req,res)=>{
    const filter={_id: req.params.id};

    const options={
        Upsert:true,
        new:true,
    };


    try{
        const result = await song.findOneAndUpdate(
            filter,
            {
                name:req.body.name,
                imageUrl:req.body.imageUrl,
                songUrl:req.body.songUrl,
                album:req.body.album,
                artist:req.body.artist,
                language:req.body.language,
                catgerory:req.body.catgerory
        },
        options
        );
        return res.status(200).send({success:true , data:result});
    }catch(error){
        return res.status(400).send({success:false , msg:error});
    }
})

router.delete("/delete/:id",async(req,res) =>{
    const filter={_id: req.params.id};

    const result = await song.deleteOne(filter);
     if(result){
        return res.status(200).send({success:true, msg:"data deleted successfully" , Data: result  })
     }
     else{
        return res.status(400).send({success:false, msg:"data not found"});
     }

})
module.exports=router;
