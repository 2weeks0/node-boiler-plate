import { ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authThunk, selectUserInfo } from "../store/slices/userSlice";

export default function Auth<T>(Component: ComponentType<T>, option: boolean | null) {
  const AuthCheck = (props: T) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);

    useEffect(() => {
      console.log("dispatch");
      dispatch(authThunk());
    }, [dispatch]);

    useEffect(() => {
      if (option === null) {
        return;
      }

      if (userInfo && option === false) {
        navigate("/");
      } else if (!userInfo && option) {
        navigate("/login");
      }
    }, [navigate, userInfo]);

    return <Component {...props} />;
  };

  return AuthCheck;
}
