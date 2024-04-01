const express = require('express');
const app = express();


const cors=require('cors');
const {default:mongoose}=require('mongoose');

app.use(cors({origin:true}));
app.use(express.json());

app.get('/',(req,res)=>{
    return res.json("hai hello")
});

// user authentication
const userRoute=require('./routes/Auth');
app.use('/api/users/',userRoute);

// artist routes
const artistRoutes=require('./routes/Artist');
app.use('/api/artists/',artistRoutes);
// album routes
const albumRoutes = require('./routes/Album');
app.use('/api/albums/',albumRoutes);
//songs routes
const songsRoutes = require('./routes/Songs');
app.use('/api/songs/',songsRoutes);
mongoose.connect("mongodb+srv://dhanushkumark62:Z4yn3SeB30bdHScT@cluster0.zv03vka.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection
.once("open",()=>console.log("connected"))
.on("error",(error)=>{
    console.log(`ERROR:${error}`);
});


app.listen(2003,()=>console.log(" listening in port 2003"));