import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Link,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../store/slices/userSlice";

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  agree: boolean;
}

interface Error {
  email: boolean;
  password: boolean;
  name: boolean;
  confirmPassword: boolean;
}

interface IProps {}

export const RegisterPage: FC<IProps> = (props) => {
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState<Error>({
    email: false,
    password: false,
    name: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!form.email || !form.password || !form.name || !form.confirmPassword) {
      return;
    }

    if (!form.agree) {
      return alert("이용 약관에 동의해주세요.");
    }

    if (form.password !== form.confirmPassword) {
      setError({ ...error, password: true, confirmPassword: true });
      return alert("비밀번호와 비밀번호 확인이 다릅니다.");
    }

    const result = await dispatch(
      registerThunk({ email: form.email, password: form.password, name: form.name })
    );
    if (result.payload?.success) {
      alert("회원가입 성공!");
      navigate("/login");
    } else {
      alert(result.payload.msg);
    }
  };

  return (
    <RegisterPagePresenter
      form={form}
      error={error}
      onChangeEmail={(v) => setForm({ ...form, email: v })}
      onChangePassword={(v) => setForm({ ...form, password: v })}
      onChangeName={(v) => setForm({ ...form, name: v })}
      onChangeConfirmPassword={(v) => setForm({ ...form, confirmPassword: v })}
      onChangeAgree={(v) => setForm({ ...form, agree: v })}
      onSubmit={onSubmit}
      setErrorEmail={(v) => setError({ ...error, email: v })}
      setErrorPassword={(v) => setError({ ...error, password: v })}
      setErrorConfirmPassword={(v) => setError({ ...error, confirmPassword: v })}
      setErrorName={(v) => setError({ ...error, name: v })}
    />
  );
};

interface IPresenterProps {
  form: RegisterForm;
  error: Error;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onChangeName: (v: string) => void;
  onChangeConfirmPassword: (v: string) => void;
  onChangeAgree: (v: boolean) => void;
  onSubmit: () => Promise<void>;
  setErrorEmail: (v: boolean) => void;
  setErrorPassword: (v: boolean) => void;
  setErrorConfirmPassword: (v: boolean) => void;
  setErrorName: (v: boolean) => void;
}

export const RegisterPagePresenter: FC<IPresenterProps> = ({
  form,
  error,
  onChangeEmail,
  onChangePassword,
  onChangeName,
  onChangeConfirmPassword,
  onChangeAgree,
  onSubmit,
  setErrorEmail,
  setErrorPassword,
  setErrorConfirmPassword,
  setErrorName,
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", m: 2 }}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5" margin="normal">
        회원가입
      </Typography>

      <TextField
        label="E-mail"
        variant="outlined"
        margin="normal"
        type="email"
        required
        fullWidth
        autoFocus
        value={form.email}
        onChange={(e) => onChangeEmail(e.target.value)}
        error={error.email}
        helperText={error.email ? "이메일을 입력하세요." : ""}
        onBlur={() => setErrorEmail(!form.email)}
      />

      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        required
        fullWidth
        value={form.password}
        onChange={(e) => onChangePassword(e.target.value)}
        error={error.password}
        helperText={error.password ? "비밀번호를 입력하세요." : ""}
        onBlur={() => setErrorPassword(!form.password)}
      />

      <TextField
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        type="password"
        required
        fullWidth
        value={form.confirmPassword}
        onChange={(e) => onChangeConfirmPassword(e.target.value)}
        error={error.confirmPassword}
        helperText={error.confirmPassword ? "비밀번호 확인을 입력하세요." : ""}
        onBlur={() => setErrorConfirmPassword(!form.confirmPassword)}
      />

      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        type="text"
        required
        fullWidth
        value={form.name}
        onChange={(e) => onChangeName(e.target.value)}
        error={error.name}
        helperText={error.name ? "이름을 입력하세요." : ""}
        onBlur={() => setErrorName(!form.name)}
      />

      <Grid container>
        <FormControlLabel
          control={
            <Checkbox checked={form.agree} onChange={(e) => onChangeAgree(e.target.checked)} />
          }
          label="이용 약관에 동의합니다."
        />
      </Grid>

      <Button variant="contained" fullWidth onClick={onSubmit} sx={{ m: 2 }}>
        회원가입
      </Button>

      <Grid container>
        <Grid item xs/>
        <Link href="/login">로그인</Link>
      </Grid>
    </Container>
  );
};
