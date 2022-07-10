import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Link,
} from "@mui/material";
import React, { FC } from "react";
import { UseInput } from "../../../hooks/useInput";
import resourceString from "../../../resources/string";

export interface InputForm {
  [index: string]: UseInput;
  email: UseInput;
  password: UseInput;
  name: UseInput;
  confirmPassword: UseInput;
}

interface IPresenterProps {
  inputForm: InputForm;
  onSubmit: () => Promise<void>;
  inputRefs: React.MutableRefObject<any>;
  onKeyPress: (event: React.KeyboardEvent, index: number) => void;
}

export const RegisterPagePresenter: FC<IPresenterProps> = ({
  inputForm,
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
        {...inputForm.email.props}
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
        {...inputForm.password.props}
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
        {...inputForm.confirmPassword.props}
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
        {...inputForm.name.props}
        onKeyUp={(e) => onKeyPress(e, 3)}
        inputRef={(ref) => (inputRefs.current[3] = ref)}
      />

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
