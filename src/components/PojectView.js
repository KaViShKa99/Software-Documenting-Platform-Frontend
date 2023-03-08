import React, { useState, useEffect } from "react";
import styles from "../styles/projectView.module.css";
import PopupWindow from "../commons/PopupWindow";
import Cookies from "universal-cookie/cjs/Cookies";
import FolderStructure from "../commons/FolderStructure";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

const cookies = new Cookies();

const ProjectView = () => {
  let userName = cookies.get("name");
  let { state } = useLocation();

  const [frontendAddFoldIsOpen, setFrontendAddFoldIsOpen] = useState(false);
  const [backendAddFoldIsOpen, setbackendAddFoldIsOpen] = useState(false);
  const [compIsOpen, setCompIsOpen] = useState(false);
  const [apiIsOpen, setApiIsOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    app: "",
  });
  const [compData, setCompData] = useState({
    title: "Add Component",
    fillData: [],
    mainArr: [],
    compName: "",
  });
  const [apiData, setApiData] = useState({
    title: "Add API",
    fillData: [],
    mainArr: [],
    compName: "",
  });

  const [getFrontendAllFolders, setFrontendAllFolders] = useState([]);
  const [getBackendAllFolders, setBackendAllFolders] = useState([]);
  const [frontendFoldersArray, setFrontendFoldersArray] = useState([]);
  const [backendFoldersArray, setBackendFoldersArray] = useState([]);

  const addFolderbtnHandlerForBackend = () => {
    setbackendAddFoldIsOpen(true);
    setData({
      title: "Add Folder",
      app: "backend",
      backendArray: backendFoldersArray,
    });
  };

  const addFolderbtnHandlerForFrontend = () => {
    setFrontendAddFoldIsOpen(true);
    setData({
      title: "Add Folder",
      app: "frontend",
      frontendArray: frontendFoldersArray,
    });
  };

  const addComponentHandler = () => {
    setFrontendAddFoldIsOpen(true);
    setData({
      title: "Add Component",
      app: "frontend",
      frontendArray: frontendFoldersArray,
      backendArray: backendFoldersArray,
    });
  };

  const addApiHandler = () => {
    setbackendAddFoldIsOpen(true);
    setData({
      title: "Add API",
      app: "backend",
      backendArray: backendFoldersArray,
    });
  };

  const backendFoldStructSet = (mainArray) => {
    if (backendAddFoldIsOpen) {
      if (mainArray.length !== 0) {
        setBackendFoldersArray(mainArray);
      }
    }
  };

  const frontendFoldStructSet = (mainArray) => {
    if (frontendAddFoldIsOpen) {
      if (mainArray.length !== 0) {
        setFrontendFoldersArray(mainArray);
      }
    }
  };

  const compArray = (arr) => {
    // console.log('comp Array');
    // setMainFoldArr(arr)
  };

  const apiArray = (arr) => {};

  const comppData = (data) => {
    setCompData(data);
  };

  const folderData = (data) => {
    setData(data);
  };

  const getApiData = (data) => {
    setApiData(data);
  };

  const compOpen = (open) => {
    setCompIsOpen(open);
  };

  const frontendAddFolderOpen = (open) => {
    setFrontendAddFoldIsOpen(open);
  };
  const backendAddFolderOpen = (open) => {
    setbackendAddFoldIsOpen(open);
  };

  const apiOpen = (open) => {
    setApiIsOpen(open);
  };

  //post request handle
  useEffect(() => {
    const formData = new FormData();
    let userName = cookies.get("name");

    formData.append("projectName", state);
    formData.append("uname", userName);
    formData.append("frontendFoldStruct", JSON.stringify(frontendFoldersArray));
    formData.append("backendFoldStruct", JSON.stringify(backendFoldersArray));

    if (frontendFoldersArray.length > 0) {
      axios({
        method: "POST",
        url: "/projectView",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          // console.log("pst req ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // }, [state, frontendFoldersArray, backendFoldersArray]);
  });

  // get request handle
  useEffect(() => {
    axios({
      method: "GET",
      url: "/projectView",
      params: {
        uname: `${userName}`,
        projectName: `${state}`,
      },
    }).then((res) => {
      setFrontendAllFolders(res.data.frontendStruct);
      setBackendAllFolders(res.data.backendStruct);
    });
  }, []);

  useEffect(() => {
    setFrontendFoldersArray(getFrontendAllFolders);
  }, [getFrontendAllFolders]);

  useEffect(() => {
    setBackendFoldersArray(getBackendAllFolders);
  }, [getBackendAllFolders]);

  return (
    <div className={styles.bgColor}>
      <label className={styles.userName}>
        <PermIdentityOutlinedIcon />
        {userName}
      </label>
      <div className={styles.frontendView}>
        <label className={styles.topicName}>Frontend</label>
        <br />
        <br />
        <button
          className={styles.button}
          onClick={addFolderbtnHandlerForFrontend}
        >
          Add Folder
        </button>
        <button className={styles.button} onClick={addComponentHandler}>
          Add Component
        </button>
        <div
          style={{
            marginTop: "1rem",
            float: "left",
            textAlign: "left",
            marginLeft: "3.5rem",
            width: "25rem",
          }}
        >
          <FolderStructure
            folders={frontendFoldersArray}
            data={comppData}
            popupOpen={compOpen}
            rootArray={frontendFoldersArray}
            addFolderPopupOpen={frontendAddFolderOpen}
            addFolderData={folderData}
          />
        </div>
      </div>

      {/*frontend add folder popup open */}
      <PopupWindow
        open={frontendAddFoldIsOpen}
        close={() => setFrontendAddFoldIsOpen(false)}
        data={data}
        sendData={frontendFoldStructSet}
      />

      {/* add component popup open */}
      <PopupWindow
        open={compIsOpen}
        close={() => setCompIsOpen(false)}
        data={compData}
        sendData={compArray}
      />

      {/* backend add folder popup open  */}
      <PopupWindow
        open={backendAddFoldIsOpen}
        close={() => setbackendAddFoldIsOpen(false)}
        data={data}
        sendData={backendFoldStructSet}
      />

      {/* api popup open */}
      <PopupWindow
        open={apiIsOpen}
        close={() => setApiIsOpen(false)}
        data={apiData}
        sendData={apiArray}
      />

      <div className={styles.backendView}>
        <label className={styles.topicName}>Backend</label>
        <br />
        <br />
        <button
          className={styles.button}
          onClick={addFolderbtnHandlerForBackend}
        >
          Add Folder
        </button>
        <button className={styles.button} onClick={addApiHandler}>
          Add API
        </button>

        <div
          style={{
            marginTop: "1rem",
            float: "left",
            textAlign: "left",
            marginLeft: "3.5rem",
            width: "25rem",
          }}
        >
          <FolderStructure
            folders={backendFoldersArray}
            data={getApiData}
            popupOpen={apiOpen}
            rootArray={backendFoldersArray}
            addFolderPopupOpen={backendAddFolderOpen}
            addFolderData={folderData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
