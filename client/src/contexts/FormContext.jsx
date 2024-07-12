import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formType, setFormType] = useState("Login");

  const switchToLogin = () => {
    setFormType("Login");
  };

  const switchToRegister = () => {
    setFormType("Register");
  };

  return (
    <FormContext.Provider value={{ formType, switchToLogin, switchToRegister }}>
      {children}
    </FormContext.Provider>
  );
};
