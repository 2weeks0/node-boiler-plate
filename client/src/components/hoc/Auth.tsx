import React, { FC, ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../store/slices/userSlice";
import { selectUserInfo } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

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
