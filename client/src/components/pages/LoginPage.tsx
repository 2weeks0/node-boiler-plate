import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { loginThunk } from "../../store/slices/userSlice";

interface IProps {}

export const LoginPage: FC<IProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!email || !password) {
      return;
    }

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
      onChangeEmail={(v) => setEmail(v)}
      password={password}
      onChangePassword={(v) => setPassword(v)}
      onSubmit={onSubmit}
      errorEmail={errorEmail}
      setErrorEmail={(v) => setErrorEmail(v)}
      errorPassword={errorPassword}
      setErrorPassword={(v) => setErrorPassword(v)}
    />
  );
};

interface IPresenterProps {
  email: string;
  onChangeEmail: (v: string) => void;
  password: string;
  onChangePassword: (v: string) => void;
  onSubmit: () => Promise<void>;
  errorEmail: boolean;
  setErrorEmail: (v: boolean) => void;
  errorPassword: boolean;
  setErrorPassword: (v: boolean) => void;
}

const LoginPagePresenter: FC<IPresenterProps> = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  onSubmit,
  errorEmail,
  setErrorEmail,
  errorPassword,
  setErrorPassword,
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", m: 2 }}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5" margin="normal">
        로그인
      </Typography>

      <TextField
        label="E-mail"
        variant="outlined"
        margin="normal"
        type="email"
        required
        fullWidth
        autoFocus
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
        error={errorEmail}
        helperText={errorEmail ? "이메일을 입력하세요." : ""}
        onBlur={() => setErrorEmail(!email)}
      />

      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        required
        fullWidth
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
        error={errorPassword}
        helperText={errorPassword ? "비밀번호를 입력하세요." : ""}
        onBlur={() => setErrorPassword(!password)}
      />

      <Button variant="contained" fullWidth onClick={() => onSubmit()} sx={{ m: 2 }}>
        로그인
      </Button>

      <Grid container>
        <Grid item xs/>
        <Grid item>
          <Link href="/register">회원가입</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
