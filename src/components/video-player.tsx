import React, { useState } from "react";
import { VideoI } from "../types/data.types";
import ReactPlayer from "react-player";
import { Read_Less, Read_More, base_url } from "../constants/constants";

interface VideoPlayerI {
  item: VideoI;
}

const VideoPlayer: React.FC<VideoPlayerI> = (props) => {
  const [readFlag, setReadFlag] = useState<boolean>(false);
  return (
    <div className="bg-white p-2">
      
        <ReactPlayer
          url={base_url+props?.item?.sources?.[0]}
          width="100"
          height="100"
          playing
          controls
        />

       <h1 className="text-primary font-medium text-1xl md:text-2xl">{props?.item?.title} <span className="text-xs md:text-1xl">{props?.item?.subtitle}</span></h1>
     

        <div className="text-sm md:text-lg ">
          {readFlag ? props?.item?.description?.slice(0, props?.item?.description?.length)+" " : props?.item?.description?.slice(0, 20)+"... "}
          {props?.item?.description?.length > 20 && <button className="text-primary text-xs md:text-sm" onClick={()=>setReadFlag(!readFlag)}>{readFlag ? Read_Less : Read_More}</button>}
        </div>
        

    </div>
  );
};

export default VideoPlayer;
