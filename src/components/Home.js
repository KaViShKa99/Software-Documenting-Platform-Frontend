import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import axios from "axios";

const cookies = new Cookies();

function Home() {
  let userNameForTitle = cookies.get("name");
  let uName = useRef("");
  const [val, setVal] = useState([]);
  const navigate = useNavigate();

  uName.current = userNameForTitle;

  const projectView = (e) => {
    navigate("/projectView", { state: e.target.value });
  };

  const handleAdd = () => {
    let projects = [...val, []];
    setVal(projects);
  };

  useEffect(() => {
    const formData = new FormData();
    let userName = cookies.get("name");

    formData.append("uname", userName);
    formData.append("projects", val.length);

    if (val.length > 0) {
      axios({
        method: "POST",
        url: "/home",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [val]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/home", {
          params: {
            uname: `${userNameForTitle}`,
          },
        });

        if (response.data) {
          const arr = new Array(response.data).fill({});
          setVal(arr);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <>
      <div className={styles.container}>
        <label className={styles.userName}>
          <PermIdentityOutlinedIcon />
          {userNameForTitle}
        </label>{" "}
        <br /> <br />
        <div className={styles.addProjectBtnPos}>
          <button className={styles.addProjectBtn} onClick={() => handleAdd()}>
            Add Project
          </button>
        </div>
        <div className={styles.content}>
          {val.map((data, i) => {
            return (
              <button
                key={i}
                className={styles.projectBtn}
                value={`Project ${i + 1}`}
                onClick={(e) => projectView(e)}
              >
                Project {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Home;
