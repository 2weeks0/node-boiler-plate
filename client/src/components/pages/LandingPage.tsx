import React, { FC } from "react";
import { LogoutButton } from "../atoms/LogoutButton";

interface IProps {}

export const LandingPage: FC<IProps> = (props) => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      LandingPage
      <LogoutButton />
    </div>
  );
};
