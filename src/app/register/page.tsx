"use client"
import { useRef } from 'react';
import { useRouter } from "next/navigation";
import "./page.css";
import Swal from 'sweetalert2'

import { CallRegister } from "../../api";

const RegisterForm = () => {

  const username = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const router = useRouter();


  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    var jsonParam: any = {
      username: username?.current?.value,
      password: password?.current?.value,
    }

    CallRegister(jsonParam).then((resp: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Register Success',
      }).then(() => {
        router.push("/login");
      })
    }).catch((err: any) => {
      Swal.fire({
        icon: 'error',
        title: err.response.data.status,
        text: err.response.data.message
      })
    })
  };

  const handleBackClick = () => {
    router.push("/login");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleFormSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username" style={{ color: "black" }}>Username</label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            ref={username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: "black" }}>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            ref={password}
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleBackClick} style={{ backgroundColor: "red", marginLeft: "5px" }}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
