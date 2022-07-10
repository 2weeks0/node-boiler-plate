import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../stores/slices/userSlice";

interface IProps {}

export const LogoutButton: FC<IProps> = (props) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onClickHandler = async () => {
    const result = await dispatch(logoutThunk());
    if (result.payload?.success) {
      navigate("/login");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };
  return <LogoutButtonPresenter onClick={onClickHandler} />;
};

interface IPresenterProps {
  onClick: Function;
}

const LogoutButtonPresenter: FC<IPresenterProps> = (props) => {
  return (
    <button className="btn btn-primary" onClick={() => props.onClick()}>
      로그아웃
    </button>
  );
};
