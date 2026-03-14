import { useEffect } from "react";
import useThunk from "../hooks/use-thunk";
import AddAlbum from "../store/thunks/addAlbums";
import { FetchAlbum } from "../store/thunks/fetchAlbum";
import Button from "./Button";
import { useSelector } from "react-redux";
import Skeleton from "./Skeleton";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import PhotoList from "./PhotoList";
function AlbumList({user}){
   const [createAlbum, isCreatingAlbum, creatingAlbumErr] = useThunk(AddAlbum);
   const [fetchAlbum, isFetchingAlbums, fetchingAlbumsErr] = useThunk(FetchAlbum);

    const {data} = useSelector((state) => state.albums );
    const handleAddAlbum = () => {
        createAlbum(user);
    }

    useEffect(() => {
        fetchAlbum(user.id);
    }, [fetchAlbum, user.id])


    let content;
    if(isFetchingAlbums){
        const userAlbums = data.filter((album) => album.userId === user.id);
    content = (
      <Skeleton
        times={userAlbums.length > 0 ? userAlbums.length : 3}
        className="w-full h-10"
      />
    );
    }else if(fetchingAlbumsErr){
        content = <div>Error fetching albums.</div>;
    }else{
        content = data
          .filter((ablum) => ablum.userId === user.id)
          .map((album) => (
            <div
              className="flex items-center justify-between p-3 border rounded shadow-sm bg-gray-50"
              key={album.id}
            >
              {album.name}
            </div>
          ));
    }

    const buttonCustom = isCreatingAlbum ? (
      <div className="flex items-center text-gray-600">
        <svg
          className="w-5 h-5 mr-2 text-blue-500 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="italic">Adding...</span>
      </div>
    ) : (
      <Button className="cursor-pointer" onClick={handleAddAlbum}>
        + Add Album
      </Button>
    );
    
    return (
      <div className="m-3">
        {/* 1. Phần Header: Xếp ngang bằng flex-row */}
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-xl font-bold"> Albums of {user.name} </h1>
          <div className="flex flex-col items-end">
            {buttonCustom}
            {creatingAlbumErr && (
              <div className="mt-1 text-sm text-red-500">
                Error adding album.
              </div>
            )}
          </div>
        </div>
        {/* 2. Phần Danh sách Album: Dùng grid grid-cols-3 để chia 3 cột */}
        <div className="grid grid-cols-3 gap-4">{content}</div>
      </div>
    );
}
export default AlbumList;