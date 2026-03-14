import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FetchUser, AddUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/use-thunk";
import UserListItems from "./UserListItems";

function UserList() {
  
  const [doFetchUser, isLoadingUser, loadingUserErr] = useThunk(FetchUser);
  const [doCreateUser, isCreating, creatingErr] = useThunk(AddUser);
  
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUser()
  }, [doFetchUser]);
  
   const handleAdd = () => {
      doCreateUser();
   };

  const renderUser = data.map((user) => {
    return( 
    <UserListItems key={user.id} user={user}/>
    )
  });

  if (isLoadingUser) {
    return <Skeleton times={6}/>;
  }

  if (loadingUserErr) {
    return <div>Error....</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl"> User </h1>
        {isCreating ? (
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
            <span className="italic">Processing...</span>
          </div>
        ) : (
          <Button primary onClick={handleAdd}>+ Add User</Button>
        )}
       {creatingErr && <div className="mx-3 mb-2 text-red-500">Error creating user...</div>}
      </div>
      {renderUser}
    </div>
  );
}
export default UserList;
