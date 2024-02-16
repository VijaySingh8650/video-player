import React from 'react'
import { VideoI } from '../types/data.types'
import { base_url } from '../constants/constants';
import { MdOutlineSlowMotionVideo } from "react-icons/md";


interface PlaylistI {
  item: VideoI;
  handleClick: (item:VideoI) => void;
}
const Playlist:React.FC<PlaylistI> = (props) => {
  return (
    <div className='w-full transition-transform duration-500 ease-in-out hover:scale-110 relative cursor-pointer shadow-md p-2 rounded-md' onClick={() => props?.handleClick(props?.item)}>
      
      <img src={base_url+props?.item?.thumb} alt={props?.item?.title} className="rounded-lg"/>
      <MdOutlineSlowMotionVideo className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white shadow dark:text-white'/>
      <h3 className='text-primary'>{props?.item?.title}</h3>

    </div>
  )
}

export default Playlist
