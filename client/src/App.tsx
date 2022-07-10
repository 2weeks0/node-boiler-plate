import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import store from "./store";
import { Provider } from "react-redux";
import Auth from "./components/hoc/Auth";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLandingPage />} />
            <Route path="login" element={<AuthLoginPage />} />
            <Route path="register" element={<AuthRegisterPage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
