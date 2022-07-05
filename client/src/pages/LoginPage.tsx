import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface IProps {}

export const LoginPage: FC<IProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ email, password }));
    if (result.payload?.success) {
      navigate("/");
    } else {
      alert(result.payload.msg);
    }
  };

  return (
    <LoginPagePresenter
      email={email}
      onChangeEmail={(v: string) => setEmail(v)}
      password={password}
      onChangePassword={(v: string) => setPassword(v)}
      onSubmit={onSubmit}
    />
  );
};

interface IPresenterProps {
  email: string;
  onChangeEmail: Function;
  password: string;
  onChangePassword: Function;
  onSubmit: Function;
}

const LoginPagePresenter: FC<IPresenterProps> = (props) => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form className="w-25 h-25" onSubmit={(e) => props.onSubmit(e)}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={props.email}
            onChange={(e) => props.onChangeEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={props.password}
            onChange={(e) => props.onChangePassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          로그인
        </button>
      </form>
    </div>
  );
};
