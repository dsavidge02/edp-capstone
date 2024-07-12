import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import "./css/Login.css";
import key_icon from "../assets/icons/key.svg";
import lock_alt_icon from "../assets/icons/lock-alt.svg";
import envelope_icon from "../assets/icons/envelope.svg";
import user_alt_icon from "../assets/icons/user-alt.svg";
import { useFormContext } from "../contexts/FormContext";

const Login = ({ initialFormType }) => {
  const { formType, switchToLogin, switchToRegister } = useFormContext();
  // const [formType, setForm] = useState(initialFormType);

  // const switchFormLogin = () => {
  //     setForm("Login");
  // }

  // const switchFormRegister = () => {
  //     setForm("Register");
  // }

  return (
    <Container className="form-container bg-light">
      <h2 className="text-center mb-4">{formType}</h2>
      <Form className="inputs">
        {formType === "Register" && (
          <div className="input">
            <img src={user_alt_icon} alt="Username" />
            <input type="text" placeholder="Username" />
          </div>
        )}
        <div className="input">
          <img src={envelope_icon} alt="Email" />
          <input type="email" placeholder="Email ID" />
        </div>
        <div className="input">
          <img src={lock_alt_icon} alt="Password" />
          <input type="password" placeholder="Password" />
        </div>
        {formType === "Register" && (
          <div className="input">
            <img src={lock_alt_icon} alt="Confirm Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>
        )}
        {formType === "Register" && (
          <div className="form-bottom">
            <Button>Sign Up</Button>
            <div className="form-change-text">
              Already have an account?{" "}
              <span onClick={switchToLogin}>Log in</span>
            </div>
          </div>
        )}
        {formType === "Login" && (
          <div className="form-bottom">
            <div className="form-change-text">
              Forgot password? <span>Reset your password</span>
            </div>
            <Button>Login</Button>
            <div className="form-change-text">
              Don't have an account?{" "}
              <span onClick={switchToRegister}>Sign up</span>
            </div>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default Login;
