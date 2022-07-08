import ko from "./ko";

export interface ResourceString {
  REGISTER_TITLE: string;
  REGISTER_LABEL_EMAIL: string;
  REGISTER_LABEL_PASSWORD: string;
  REGISTER_LABEL_CONFIRM_PASSWORD: string;
  REGISTER_LABEL_NAME: string;
  REGISTER_LABEL_AGREE: string;
  REGISTER_LABEL_BTN_REGISTER: string;
  REGISTER_LABEL_LINK_LOGIN: string;
  REGISTER_ERROR_EMPTY_EMAIL: string;
  REGISTER_ERROR_EMPTY_PASSWORD: string;
  REGISTER_ERROR_EMPTY_CONFIRM_PASSWORD: string;
  REGISTER_ERROR_EMPTY_NAME: string;
  REGISTER_ERROR_UNCHECK_AGREE: string;
  REGISTER_ERROR_DIFF_PASSWORD_CONFIRM: string;
}

const userLang = navigator.language;

let resourceString: ResourceString;

switch (userLang) {
  case "ko-KR":
    resourceString = ko;
    break;

  default:
    resourceString = ko;
    break;
}

export default resourceString;
