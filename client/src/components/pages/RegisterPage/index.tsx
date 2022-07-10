import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import resourceString from "../../../resources/string";
import { registerThunk } from "../../../store/slices/userSlice";
import { InputForm, RegisterPagePresenter } from "./RegisterPage";

interface IProps {}

const RegisterPage: FC<IProps> = (props) => {
  const inputForm: InputForm = {
    email: useInput(resourceString.REGISTER_ERROR_EMPTY_EMAIL),
    password: useInput(resourceString.REGISTER_ERROR_EMPTY_PASSWORD),
    name: useInput(resourceString.REGISTER_ERROR_EMPTY_NAME),
    confirmPassword: useInput(resourceString.REGISTER_ERROR_EMPTY_CONFIRM_PASSWORD),
  };

  const inputRefs = useRef<any>([]);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (index === Object.keys(inputForm).length - 1) {
      inputRefs.current[index].blur();
      return onSubmit();
    }

    if (event.key === "Enter") {
      inputRefs.current[index + 1].focus();
    }
  };

  const onSubmit = async () => {
    let flag = false;
    Object.values(inputForm)
      .filter((it) => !it.props.value)
      .forEach((it) => {
        flag = true;
        it.setError(true);
        it.setHelperText(it.emptyHelperText);
      });
    if (flag) {
      return;
    }

    const isPasswordDiff = inputForm.password.props.value !== inputForm.confirmPassword.props.value;
    inputForm.password.setError(isPasswordDiff);
    inputForm.password.setHelperText(
      isPasswordDiff ? resourceString.REGISTER_ERROR_DIFF_PASSWORD_CONFIRM : ""
    );
    inputForm.confirmPassword.setError(isPasswordDiff);
    inputForm.confirmPassword.setHelperText(
      isPasswordDiff ? resourceString.REGISTER_ERROR_DIFF_PASSWORD_CONFIRM : ""
    );
    if (isPasswordDiff) {
      return;
    }

    const result = await dispatch(
      registerThunk({
        email: inputForm.email.props.value,
        password: inputForm.password.props.value,
        name: inputForm.name.props.value,
      })
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
      inputForm={inputForm}
      onSubmit={onSubmit}
      inputRefs={inputRefs}
      onKeyPress={onKeyPress}
    />
  );
};

export default RegisterPage;