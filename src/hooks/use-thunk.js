import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
function useThunk(thunk) {
  const dispatch = useDispatch();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [loadingUserErr, setLoadingUserErr] = useState(null);
  const runThunk = useCallback(
    (arg) => {
      setIsLoadingUser(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setLoadingUserErr(err))
        .finally(() => setIsLoadingUser(false));
    },
    [dispatch, thunk],
  );

  return [runThunk, isLoadingUser, loadingUserErr];
}
export default useThunk;
