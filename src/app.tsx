import React, { useEffect, useRef, useState } from "react";
import { mediaJSON } from "./data";
import { VideoI } from "./types/data.types";
import { RxCross2 } from "react-icons/rx";
import Playlist from "./components/playlist";
import { Sort_Asc, Sort_Default, Sort_Desc, selected_video } from "./constants/constants";
import VideoPlayer from "./components/video-player";

const App = () => {
  const [data, setData] = useState<VideoI[]>(mediaJSON.categories?.[0]?.videos);
  const [selectVideo, setSelectVideo] = useState<VideoI>(selected_video);
  const [searchMovie, setSearchMovie] = useState<string>("");
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sort, setSort] = useState<string>("");

  //Debouncing technique
  useEffect(() => {
    if (searchMovie) {

      setSort(Sort_Default);
      ref.current = setTimeout(() => {
        let searchedMovies = mediaJSON.categories?.[0]?.videos?.filter((item)=>item.title?.toLowerCase().includes(searchMovie?.toLowerCase()));
        setData(searchedMovies);
      }, 500);

    }
    else{
      setData(mediaJSON.categories?.[0]?.videos);
    }

    return () => {
      ref.current && clearTimeout(ref.current);
    };
  }, [searchMovie]);

  const handleClick = (item: VideoI):void => {
    
    setSelectVideo(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setSearchMovie(e.target.value);
  };

  const handleReset = ():void =>{
    setSearchMovie("");
    setData(mediaJSON.categories?.[0]?.videos);
    setSort(Sort_Default);
  }

  const handleSort = (e:React.ChangeEvent<HTMLSelectElement>):void =>{

     setSort(e.target.value);

     if(e.target.value === Sort_Desc){
      let sortedArr = (searchMovie ? [...data] : [...mediaJSON.categories[0].videos]).sort((a:VideoI,b:VideoI)=> b.title.localeCompare(a.title));
      setData(sortedArr);
     }else if(e.target.value === Sort_Asc){
      let sortedArr = (searchMovie ? [...data] : [...mediaJSON.categories[0].videos]).sort((a:VideoI,b:VideoI)=> a.title.localeCompare(b.title));
      setData(sortedArr);
     }
     else{
      setData((searchMovie ? [...data] : [...mediaJSON.categories[0].videos]))
     }

  }

  return (
    <div className="mt-4 mb-4 ml-8 mr-8">
      <h1 className="text-2xl lg:text-4xl sm:text-3xl text-center text-primary">
        {mediaJSON?.categories?.[0]?.name}
      </h1>

      <div className="mt-2 flex ">
        <input
          className="border-b-2 border-primary focus:outline-none"
          placeholder="Search Movies..."
          value={searchMovie}
          onChange={handleChange}
        />

        {searchMovie && (
          <button className="bg-primary text-white pt-1 pb-1 pl-2 pr-2 rounded-sm ml-2" onClick={handleReset}>
            Reset
          </button>
        )}

        <div className="ml-4">
          <select value={sort} className="rounded-sm bg-primary text-white focus:outline-none pt-1 pb-1 pl-2 pr-2" onChange={handleSort}>
            <option value={Sort_Default}>Sort Movies</option>
            <option value={Sort_Asc}>A to Z</option>
            <option value={Sort_Desc}>Z to A</option>
          </select>
        </div>

      </div>


      <div className="grid grid-cols-2 gap-4 justify-items-center mt-8 lg:grid-cols-4 sm:grid-cols-3">
        {data?.map((item) => {
          return (
            <Playlist item={item} key={item?.title} handleClick={handleClick} />
          );
        })}
      </div>
      {
        data?.length===0 && <div className="h-60 flex justify-center items-center">
          <h2 className="text-primary text-xl md:text-3xl">Nothing Found...</h2>
        </div>
      }

      {selectVideo?.title && (
        <div className="w-screen h-screen fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center  bg-black bg-opacity-60">
          <div className="w-1/2 relative">
            <VideoPlayer item={selectVideo} />
            <RxCross2
              className="text-white absolute -right-14 -top-10 text-xl md:text-3xl font-extrabold cursor-pointer"
              onClick={() => setSelectVideo(selected_video)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
