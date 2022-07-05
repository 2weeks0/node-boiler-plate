import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../store/slices/userSlice";

interface IProps {}

export const RegisterPage: FC<IProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const arr = [
      { value: email, msg: "아이디를 입력하세요." },
      { value: password, msg: "비밀번호를 입력하세요." },
      { value: name, msg: "이름을 입력하세요." },
      { value: confirmPassword, msg: "비밀번호 확인을 입력하세요." },
    ];

    for (const it of arr) {
      if (!it.value) {
        return alert(it.msg);
      }
    }

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    const result = await dispatch(registerThunk({ email, password, name }));
    if (result.payload?.success) {
      alert("회원가입 성공!");
      navigate("/login");
    } else {
      alert(result.payload.msg);
    }
  };

  return (
    <RegisterPagePresenter
      email={email}
      onChangeEmail={(v: string) => setEmail(v)}
      password={password}
      onChangePassword={(v: string) => setPassword(v)}
      name={name}
      onChangeName={(v: string) => setName(v)}
      confirmPassword={confirmPassword}
      onChangeConfirmPassword={(v: string) => setConfirmPassword(v)}
      onSubmit={onSubmit}
    />
  );
};

interface IPresenterProps {
  email: string;
  onChangeEmail: Function;
  password: string;
  onChangePassword: Function;
  name: string;
  onChangeName: Function;
  confirmPassword: string;
  onChangeConfirmPassword: Function;
  onSubmit: Function;
}

export const RegisterPagePresenter: FC<IPresenterProps> = (props) => {
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={props.confirmPassword}
            onChange={(e) => props.onChangeConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={props.name}
            onChange={(e) => props.onChangeName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          회원가입
        </button>
      </form>
    </div>
  );
};
