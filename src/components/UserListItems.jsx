import useThunk from "../hooks/use-thunk";
import { GoTrash } from "react-icons/go";
import { RemoveUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";
function UserListItems({user}){
  const [doRemove, isLoading, error] = useThunk(RemoveUser);
  const handleDeleteUser = () => {
    doRemove(user);
  }

  const header = <> <Button className="mr-3" onClick={handleDeleteUser}>
          {isLoading ? (
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2 text-red-500 animate-spin"
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
              <span className="italic">Deleting...</span>
            </div>
          ) : (
            <GoTrash />
          )}
        </Button>
        {user.name}</>
return (
<ExpandablePanel header={header}><AlbumList user={user}/></ExpandablePanel>
);
}
export default UserListItems;