"use client"
import { useRef } from 'react';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

import { CallLogin } from "../../api";
import "./page.css"

const LoginForm = () => {
  const router = useRouter();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);


  const handleLoginClick = async (event: React.FormEvent) => {
    event.preventDefault();
    var jsonParam: any = {
      username: username?.current?.value,
      password: password?.current?.value,
    }

    CallLogin(jsonParam).then((resp: any) => {
      localStorage.setItem("token", resp.data.access_token);
      router.push("/todos");
    }).catch((err: any) => {
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.message
      })
    })
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLoginClick}>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegisterClick} style={{ backgroundColor: "red", marginLeft: "5px" }}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
