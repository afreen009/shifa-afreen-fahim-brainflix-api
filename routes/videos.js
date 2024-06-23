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
            return res.status(400).send('No video Found with that id'); 
        }
        res.status(200).json(video);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while fetching video data"});
    }
});

router.post("/", (req, res)=>{
    try {
        const {title, image, description} = req.body;
        const postVideo = {
            id: uuid4(),
            title: title || "Video Title",
            image: image || "http://localhost:8080/images/thumbnail.jpg",
            description: description || "Video Description",
            channel: "Shifu Panda",
            views: "980,544",
            likes: "22,479",
            duration: "4:01",
            timestamp: Date.now(),
            comments: [
                {
                    "id": uuid4(),
                    "name": "Sharia Pova",
                    "comment": "Your travel diaries are like a passport to wanderlust! Each city comes alive through your lens, making me feel like I'm right there with you. Your storytelling captures the essence of these enchanting places, igniting a desire to explore Europe even more. Can't wait for the next adventure!",
                    "likes": 0,
                    "timestamp": 1690348662000
                  },
                  {
                    "id": uuid4(),
                    "name": "Hateeje",
                    "comment": "Your videos are a true escape for the soul. Watching this feels like taking a scenic stroll through the charming streets of Europe. Thank you for bringing the magic of travel to our screens!",
                    "likes": 0,
                    "timestamp": 1690262262000
                  },
                  {
                    "id": uuid4(),
                    "name": "Adnan Al-Burj",
                    "comment": "I appreciate the attention to detail and the way you immerse us in the local culture. Each video is an invitation to dream and plan our own adventures. Keep inspiring us with your incredible travel diaries!",
                    "likes": 0,
                    "timestamp": 1690175862000
                  }
            ]
        };
        const videoData = readVideos();
        writeVideos([...videoData, postVideo]);
        res.status(201).json(postVideo);
    } catch (error) {
        res.status(500).json({message: "Error while uploading video data"});
    }
});
export default router;
