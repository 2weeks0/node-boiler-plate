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
  FormHelperText,
  FormControl,
} from "@mui/material";
import React, { FC, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../store/slices/userSlice";
import resourceString from "../resources/string";

interface RegisterForm {
  [index: string]: string | boolean;
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  agree: boolean;
}

interface RegisterError {
  [index: string]: Error;
  email: Error;
  password: Error;
  name: Error;
  confirmPassword: Error;
  agree: Error;
}

interface Error {
  value: boolean;
  msg: string;
}

type Key = "email" | "password" | "confirmPassword" | "name" | "agree";

interface IProps {}

export const RegisterPage: FC<IProps> = (props) => {
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState<RegisterError>({
    email: {
      value: false,
      msg: "",
    },
    password: {
      value: false,
      msg: "",
    },
    name: {
      value: false,
      msg: "",
    },
    confirmPassword: {
      value: false,
      msg: "",
    },
    agree: {
      value: false,
      msg: "",
    },
  });
  const inputRefs = useRef<any>([]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const getEmptyErrorMsg = (key: Key): string => {
    switch (key) {
      case "email":
        return resourceString.REGISTER_ERROR_EMPTY_EMAIL;
      case "password":
        return resourceString.REGISTER_ERROR_EMPTY_PASSWORD;
      case "confirmPassword":
        return resourceString.REGISTER_ERROR_EMPTY_CONFIRM_PASSWORD;
      case "name":
        return resourceString.REGISTER_ERROR_EMPTY_NAME;
      case "agree":
        return resourceString.REGISTER_ERROR_UNCHECK_AGREE;
    }
  };

  const onChangeValue = (key: Key, v: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: v,
    }));
    setError((prev) => ({
      ...prev,
      [key]: {
        value: !v,
        msg: !v ? getEmptyErrorMsg(key) : "",
      },
    }));
  };

  const onKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (index === Object.keys(form).length - 1) {
      inputRefs.current[index].blur();
      return onSubmit();
    }

    if (event.key === "Enter") {
      inputRefs.current[index + 1].focus();
    }
  };

  const onSubmit = async () => {
    if (!form.email || !form.password || !form.name || !form.confirmPassword || !form.agree) {
      Object.keys(form).forEach((key) =>
        setError((prev) => ({
          ...prev,
          [key]: {
            value: !form[key],
            msg: !form[key] ? getEmptyErrorMsg(key as Key) : "",
          },
        }))
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError((prev) => ({
        ...prev,
        password: { value: true, msg: resourceString.REGISTER_ERROR_DIFF_PASSWORD_CONFIRM },
        confirmPassword: { value: true, msg: resourceString.REGISTER_ERROR_DIFF_PASSWORD_CONFIRM },
      }));
      return;
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
      onChangeValue={onChangeValue}
      onSubmit={onSubmit}
      inputRefs={inputRefs}
      onKeyPress={onKeyPress}
    />
  );
};

interface IPresenterProps {
  form: RegisterForm;
  error: RegisterError;
  onChangeValue: (key: Key, v: string | boolean) => void;
  onSubmit: () => Promise<void>;
  inputRefs: React.MutableRefObject<any>;
  onKeyPress: (event: React.KeyboardEvent, index: number) => void;
}

export const RegisterPagePresenter: FC<IPresenterProps> = ({
  form,
  error,
  onChangeValue,
  onSubmit,
  inputRefs,
  onKeyPress,
}) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 10,
        marginBottom: 10,
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
        {resourceString.REGISTER_TITLE}
      </Typography>

      <TextField
        label={resourceString.REGISTER_LABEL_EMAIL}
        variant="outlined"
        margin="normal"
        type="email"
        required
        fullWidth
        autoFocus
        value={form.email}
        onChange={(e) => onChangeValue("email", e.target.value)}
        error={error.email.value}
        helperText={error.email.msg}
        onKeyUp={(e) => onKeyPress(e, 0)}
        inputRef={(ref) => (inputRefs.current[0] = ref)}
      />

      <TextField
        label={resourceString.REGISTER_LABEL_PASSWORD}
        variant="outlined"
        margin="normal"
        type="password"
        required
        fullWidth
        value={form.password}
        onChange={(e) => onChangeValue("password", e.target.value)}
        error={error.password.value}
        helperText={error.password.msg}
        onKeyUp={(e) => onKeyPress(e, 1)}
        inputRef={(ref) => (inputRefs.current[1] = ref)}
      />

      <TextField
        label={resourceString.REGISTER_LABEL_CONFIRM_PASSWORD}
        variant="outlined"
        margin="normal"
        type="password"
        required
        fullWidth
        value={form.confirmPassword}
        onChange={(e) => onChangeValue("confirmPassword", e.target.value)}
        error={error.confirmPassword.value}
        helperText={error.confirmPassword.msg}
        onKeyUp={(e) => onKeyPress(e, 2)}
        inputRef={(ref) => (inputRefs.current[2] = ref)}
      />

      <TextField
        label={resourceString.REGISTER_LABEL_NAME}
        variant="outlined"
        margin="normal"
        type="text"
        required
        fullWidth
        value={form.name}
        onChange={(e) => onChangeValue("name", e.target.value)}
        error={error.name.value}
        helperText={error.name.msg}
        onKeyUp={(e) => onKeyPress(e, 3)}
        inputRef={(ref) => (inputRefs.current[3] = ref)}
      />

      <Grid container>
        <FormControl error={error.agree.value}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.agree}
                onChange={(e) => onChangeValue("agree", e.target.checked)}
              />
            }
            label={resourceString.REGISTER_LABEL_AGREE}
            onKeyUp={(e) => onKeyPress(e, 4)}
            inputRef={(ref) => (inputRefs.current[4] = ref)}
          />
          <FormHelperText>{error.agree.msg}</FormHelperText>
        </FormControl>
      </Grid>

      <Button variant="contained" fullWidth onClick={onSubmit} sx={{ m: 2 }}>
        {resourceString.REGISTER_LABEL_BTN_REGISTER}
      </Button>

      <Grid container>
        <Grid item xs />
        <Link href="/login">{resourceString.REGISTER_LABEL_LINK_LOGIN}</Link>
      </Grid>
    </Container>
  );
};
