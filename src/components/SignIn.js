import React from "react";
import styles from "../styles/signIn.module.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var { uname, password } = document.forms[0];
    let name = uname.value;
    let pwd = password.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pwd", pwd);

    try {
      const response = await axios.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        const { name, token } = response.data;
        cookies.set("name", name);
        cookies.set("token", token);
        navigate("/home");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.centerAlignment}>
        <div className={styles.signInBox}>
          <h1 className="text-4xl font-thin relative top-12 ">Sign in </h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.contentPos}>
              <div>
                <label className={styles.usernameAlignment}>Username</label>
                <br />
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder="user name"
                  name="uname"
                  required
                />
              </div>

              <div>
                <label className={styles.passwordAlignment}>Password</label>
                <br />
                <input
                  className={styles.inputField}
                  type="password"
                  placeholder="password"
                  name="password"
                  required
                />
              </div>

              <div className={styles.loginbtnPos}>
                <br />
                <input
                  className={styles.loginBtn}
                  type="submit"
                  value="Login"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
