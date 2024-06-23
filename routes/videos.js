import express from "express";
import fs from "fs"; 
import uuid4 from "uuid4";

const router = express.Router();


const readVideos = () => {
    const videosFile = fs.readFileSync("./data/videos.json");
    return JSON.parse(videosFile);
}

const writeVideos = (incomingVideos) => {
    const videos = JSON.stringify(incomingVideos);
    fs.writeFileSync("./data/videos.json", videos);
}

router.get("/", (req, res)=> {
    try {
        const videoData = readVideos();
        const videos =videoData.map((video)=>{
            return {
                id: video.id,
                title: video.title,
                channel:video.channel,
                image: video.image,
            }
        });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message: "Error while fetching video"});
    }
});

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params; 
        const videosData = readVideos();
    
        const video = videosData.find(video => {
            if(video.id === id){
                video.image == video.image;
                return video;
            }
        });
    
        if (!video) {
            return res.status(400).send('No video Found with that id'); //return to halt the function execution
        }
        res.status(200).json(video);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while fetching video data"});
    }
});
export default router;
