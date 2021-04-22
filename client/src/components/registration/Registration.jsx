import React, { useState } from "react";
import Input from "../../utils/input/Input";
import { registration } from "../../actions/user";
import "./registration.scss";

const Registration = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="registration">
      <div className="registration__header">Registration</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Input your email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Input your password"
      />
      <button
        className="registration__btn"
        onClick={() => registration(email, password)}
      >
        Registration
      </button>
    </div>
  );
};
export default Registration;
