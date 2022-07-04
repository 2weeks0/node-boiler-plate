import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../store/slices/userSlice";
import { useNavigate } from 'react-router-dom';

interface IProps {
}

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
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form className="w-25 h-25" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
