import React, { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import PopupDailog from "../commons/FormDailog";
import { Scrollbars } from "react-custom-scrollbars-2";

const MODAL_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  zIndex: 1000,
  transform: "translate(-50%,-50%)",
  padding: "300px",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottm: 0,
  backgroundColor: "rgba(0 , 0, 0, 0.7)",
  zIndex: 1000,
  width: "100%",
  height: "100%",
};

const selectMenuStyle = {
  paddingTop: "1rem",
  width: "20rem",
  fontSize: "20px",
};

const PopupWindow = ({ open, close, data, sendData }) => {
  const [personName, setPersonName] = useState([]);
  const [folder, setFolder] = useState("");
  const [fold, setFold] = useState([]);
  const [apiCalls, setApiCalls] = useState([]);
  const [rowsAddProps, setRowsAddProps] = useState([]);
  const [rowsAddParam, setRowsAddParam] = useState([]);
  const [rowsAddResponse, setRowsAddResponse] = useState([]);
  const [apiSelectFolder, setApiSelectFolder] = useState("");
  const [componnentSelectFolder, setcomponnentSelectFolder] = useState("");
  const [apiCallSelect, setapiCallSelect] = useState("");
  const [update, setUpdate] = useState(false);
  const [componnentCheckbox, setComponnentCheckbox] = useState(false);
  const [mainArray, setMainArray] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [apiRouteTextValue, setApiRouteTextValue] = useState("");
  const [folderObject, setFolderObject] = useState({
    name: "",
    subArray: [],
  });
  const folderNameInput = useRef("");
  const componnentNameInput = useRef("");
  const apiRouteNameInput = useRef("");

  const columnsAddResponse = [
    {
      field: "response",
      headerName: "Response",
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="error"
              startIcon={<Delete />}
              style={{ fontSize: "2px" }}
              onClick={(e) => responseRowDelete(e, params.row)}
            ></Button>
            <PopupDailog
              tableCol={params.api.getAllColumns()}
              tableName="Response"
              rowValue={params.row}
              dArr={rowsAddResponse}
              setUpdate={(data) => setRowsAddResponse(data)}
            />
          </div>
        );
      },
    },
  ];

  const columnsOfAddParameter = [
    {
      field: "parameter",
      headerName: "Parameter Name",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="error"
              startIcon={<Delete />}
              style={{ fontSize: "2px" }}
              onClick={(e) => paramRowDelete(e, params.row)}
            ></Button>
            <PopupDailog
              tableCol={params.api.getAllColumns()}
              tableName="Parameter"
              rowValue={params.row}
              dArr={rowsAddParam}
              setUpdate={(data) => setRowsAddParam(data)}
            />
          </div>
        );
      },
    },
  ];

  const columnsOfAddProps = [
    {
      field: "propName",
      headerName: "Prop Name",
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 50,
      editable: false,
      sortable: false,
    },
    {
      field: "defaultValue",
      headerName: "Default Value",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      sortable: false,
      editable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="error"
              startIcon={<Delete />}
              style={{ fontSize: "2px" }}
              onClick={(e) => tableRowDelete(e, params.row)}
            ></Button>
            <PopupDailog
              tableCol={params.api.getAllColumns()}
              tableName="Prop"
              rowValue={params.row}
              dArr={rowsAddProps}
              setUpdate={(data) => setRowsAddProps(data)}
            />
          </div>
        );
      },
    },
  ];

  const addResponse = () => {
    const currentResponse = [
      ...rowsAddResponse,
      {
        id: randomId(),
        response: "response",
      },
    ];
    setRowsAddResponse(currentResponse);
  };

  const addParameters = () => {
    const currentParameters = [
      ...rowsAddParam,
      {
        id: randomId(),
        parameter: "Parameter",
        type: "type",
      },
    ];
    setRowsAddParam(currentParameters);
  };

  const paramRowDelete = (e, rowVal) => {
    e.stopPropagation();
    const objWithIdIndex = rowsAddParam.findIndex(
      (obj) => obj.id === rowVal.id
    );
    const neArr = [...rowsAddParam];
    neArr.splice(objWithIdIndex, 1);
    setRowsAddParam(neArr);
  };

  const responseRowDelete = (e, rowVal) => {
    e.stopPropagation();
    const objWithIdIndex = rowsAddResponse.findIndex(
      (obj) => obj.id === rowVal.id
    );
    const neArr = [...rowsAddResponse];
    neArr.splice(objWithIdIndex, 1);
    setRowsAddResponse(neArr);
  };

  const addProp = () => {
    const currentValues = [
      ...rowsAddProps,
      {
        id: randomId(),
        propName: "Prop Name",
        type: "type",
        defaultValue: "value",
      },
    ];
    setRowsAddProps(currentValues);
  };

  const tableRowDelete = (e, rowVal) => {
    e.stopPropagation();

    const objWithIdIndex = rowsAddProps.findIndex(
      (obj) => obj.id === rowVal.id
    );
    const neArr = [...rowsAddProps];
    neArr.splice(objWithIdIndex, 1);
    setRowsAddProps(neArr);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setFolder(value);
  };

  const apiSelectChange = (e) => {
    setApiSelectFolder(e.target.value);
  };

  const apiCallSelectChange = (e) => {
    setapiCallSelect(e.target.value);
  };

  const componentSelectChange = (e) => {
    setcomponnentSelectFolder(e.target.value);
  };

  const componentCheckBoxChange = (e) => {
    setComponnentCheckbox(e.target.checked);
  };

  // find object by name
  const findObjectByName = (name, arr) => {
    for (let obj of arr) {
      if (obj.name === name) {
        return obj;
      } else if (obj.subArray && obj.subArray.length > 0) {
        const found = findObjectByName(name, obj.subArray);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const saveNewFolder = (arr, folderPath) => {
    const folderName = folderPath[0];
    const matchingObj = findObjectByName(folderName.trim(), arr);

    if (!matchingObj.subArray) {
      return;
    }

    if (folderPath.length === 1) {
      const newFolderName = folderNameInput.current.value;
      if (!matchingObj.subArray.find((f) => f.name === newFolderName)) {
        matchingObj.subArray.push({ name: newFolderName, subArray: [] });
        setFold([]);
        createFolderPathStructure([matchingObj]);
      }
    } else {
      saveNewFolder(matchingObj, folderPath.slice(1));
    }
  };

  const saveNewComponent = (arr, folderPath, newCompObj) => {
    const folderName = folderPath[0];
    const matchingObj = findObjectByName(folderName.trim(), arr);

    if (!matchingObj.subArray) {
      return;
    }

    if (folderPath.length === 1) {
      const newComponentName = componnentNameInput.current.value;

      if (data.fillData) {
        matchingObj.subArray.map((v) => {
          if (v.name === data.fillData.componnentName) {
            v.name = newCompObj.componnentName;
            v.componentObj = newCompObj;
          }
        });
      } else if (
        !matchingObj.subArray.find((f) => f.name === newComponentName)
      ) {
        matchingObj.subArray.push({
          name: newComponentName,
          type: "component",
          subArray: [],
          componentObj: newCompObj,
        });
      }
    } else {
      saveNewComponent(matchingObj, folderPath.slice(1), newCompObj);
    }
  };

  const saveNewApi = (arr, folderPath, newApiObj) => {
    const folderName = folderPath[0];
    const matchingObj = findObjectByName(folderName.trim(), arr);

    if (!matchingObj.subArray) {
      return;
    }

    if (folderPath.length === 1) {
      const newApiName = apiRouteNameInput.current.value;

      if (data.fillData) {
        matchingObj.subArray.map((v) => {
          if (v.name === data.fillData.apiRoute) {
            v.name = newApiObj.apiRoute;
            v.apiObj = newApiObj;
          }
        });
      } else if (!matchingObj.subArray.find((f) => f.name === newApiName)) {
        matchingObj.subArray.push({
          name: apiRouteNameInput.current.value,
          type: "api",
          subArray: [],
          apiObj: newApiObj,
        });
      }
    } else {
      saveNewApi(matchingObj, folderPath.slice(1), newApiObj);
    }
  };

  // add api function
  const addApiSave = () => {
    const newApiObj = {
      apiRoute: apiRouteNameInput.current.value,
      parentFolder: apiSelectFolder,
      paramArray: rowsAddParam,
      response: rowsAddResponse,
    };

    if (mainArray.length === 0) {
      setFolderObject({
        name: "/",
        subArray: [
          {
            name: apiRouteNameInput.current.value,
            type: "api",
            subArray: [],
            apiObj: newApiObj,
          },
        ],
      });
      setUpdate(true);
    }

    const folderPath =
      apiSelectFolder === "/" ? apiSelectFolder : apiSelectFolder.split("/");
    saveNewApi(mainArray, folderPath, newApiObj);

    close(false);
  };

  // add component function
  const addComponentSave = () => {
    const newCompObj = {
      componnentName: componnentNameInput.current.value,
      parentFolder: componnentSelectFolder,
      singleUse: componnentCheckbox,
      propsArray: rowsAddProps,
      apiCalls: apiCallSelect,
    };

    if (mainArray.length === 0) {
      setFolderObject({
        name: "/",
        subArray: [
          {
            name: componnentNameInput.current.value,
            type: "component",
            subArray: [],
            componentObj: newCompObj,
          },
        ],
      });
      setUpdate(true);
    }

    const folderPath =
      componnentSelectFolder === "/"
        ? componnentSelectFolder
        : componnentSelectFolder.split("/");
    saveNewComponent(mainArray, folderPath, newCompObj);

    close(false);
  };

  // add folder function
  const addFolderSave = () => {
    if (mainArray.length === 0) {
      const newFolderObject = {
        name: folder,
        subArray: [{ name: folderNameInput.current.value, subArray: [] }],
      };
      setFolderObject(newFolderObject);
      setUpdate(true);
      createFolderPathStructure(mainArray);
    }

    const folderPath = folder === "/" ? folder : folder.split("/");
    console.log("folder name ", folderPath);
    saveNewFolder(mainArray, folderPath);
  };

  // folder path create function
  const createFolderPathStructure = (arr, path = "") => {
    if (arr.length === 0) {
      setFold((pre) => [...pre, folderNameInput.current.value]);
    }
    for (let obj of arr) {
      if (!obj.type) {
        const fullPath =
          obj.name === "/"
            ? `${obj.name}`
            : path === "/" || path === ""
            ? `${obj.name}`
            : `${path} / ${obj.name}`;
        setFold((pre) => [...pre, fullPath]);

        if (obj.subArray.length > 0) {
          createFolderPathStructure(obj.subArray, fullPath);
        }
      }
    }
  };

  // api calls find function
  const findApiCalls = (arr) => {
    for (let obj of arr) {
      if (obj.type === "api") {
        const apiName = obj.name;
        setApiCalls((pre) => [...pre, apiName]);
      }
      if (obj.subArray.length > 0) {
        findApiCalls(obj.subArray);
      }
    }
  };

  useEffect(() => {
    if (mainArray.length >= 1 && update) {
      setMainArray((pre) => [...pre, folderObject]);
    } else if (update) {
      setMainArray([folderObject]);
    }
    sendData(mainArray);
  }, [folderObject, mainArray, mainArray.length, sendData, update]);

  useEffect(() => {
    if (mainArray) {
      console.log(mainArray);
    }
  });

  useEffect(() => {
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    if (data.app === "frontend") {
      setFold([]);
      if (data.frontendArray.length !== 0) {
        createFolderPathStructure(data.frontendArray);
      } else {
        setFold(["/"]);
      }
      setMainArray(data.frontendArray);
      setApiCalls([]);
      findApiCalls(data.backendArray);
    }

    if (data.app === "backend") {
      setFold([]);
      if (data.backendArray.length !== 0) {
        createFolderPathStructure(data.backendArray);
      } else {
        setFold(["/"]);
      }
      setMainArray(data.backendArray);
    }

    if (data.fillData && data.title === "Add Folder") {
      setFold([]);
      if (data.fillData.length !== 0) {
        createFolderPathStructure([data.folderObj]);
      } else {
        setFold(["/"]);
      }
      setMainArray(data.mainARR);
    }

    if (data.fillData && data.title === "Add Component") {
      setTextValue(data.fillData.componnentName);
      setFold([data.fillData.parentFolder]);
      setRowsAddProps(data.fillData.propsArray);
      setComponnentCheckbox(data.fillData.singleUse);
    }

    if (data.fillData && data.title === "Add API") {
      setApiRouteTextValue(data.fillData.apiRoute);
      setFold([data.fillData.parentFolder]);
      setRowsAddParam(data.fillData.paramArray);
      setRowsAddResponse(data.fillData.response);
    }

    if (data.mainArr) {
      setMainArray(data.mainArr);
    }
  }, [data]);

  if (!open) return null;
  return (
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLE}>
        {(() => {
          switch (data.title) {
            case "Add Folder":
              return (
                <div
                  style={{
                    backgroundColor: "#EDEDED",
                    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                    width: "35rem",
                    height: "40rem",
                  }}
                >
                  <button
                    className="w-7 float-right relative top-0 hover:bg-red-700 hover:text-white hover:w-7 "
                    onClick={close}
                  >
                    X
                  </button>
                  <label className="flex justify-center relative top-12 text-3xl font-semibold">
                    {data.title}
                  </label>

                  <div
                    style={{
                      marginTop: "4rem",
                      height: "30rem",
                      paddingTop: "4rem",
                    }}
                    className="flex justify-center "
                  >
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel
                        id="demo-multiple-name-label"
                        style={{ fontSize: "20px" }}
                      >
                        {folder}
                      </InputLabel>

                      <Select
                        multiple
                        native
                        value={personName}
                        onChange={handleChange}
                        inputProps={{
                          id: "select-multiple-native",
                        }}
                        input={<OutlinedInput label={folder} />}
                        style={selectMenuStyle}
                      >
                        {fold.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                      <TextField
                        inputRef={folderNameInput}
                        id="standard-basic"
                        label={`sub folders for ${folder}`}
                        variant="standard"
                        style={{ width: "20rem", marginTop: "1rem" }}
                      />
                      <Button
                        varient="contained"
                        style={{
                          width: "20rem",
                          backgroundColor: "lightblue",
                          marginTop: "1rem",
                        }}
                        onClick={addFolderSave}
                      >
                        Save
                      </Button>
                    </FormControl>
                  </div>
                </div>
              );
            case "Add Component":
              return (
                <div
                  style={{
                    backgroundColor: "#EDEDED",
                    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                    width: "38rem",
                    height: "40rem",
                  }}
                >
                  <button
                    className="w-7 float-right relative top-0 hover:bg-red-700 hover:text-white hover:w-7  "
                    onClick={close}
                  >
                    X
                  </button>
                  <label className="flex justify-center text-3xl relative top-12 font-semibold">
                    {data.title}
                  </label>

                  <Scrollbars
                    style={{
                      width: "34rem",
                      height: "30rem",
                      marginTop: "4rem",
                      paddingTop: "1rem",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "4rem",
                        height: "30rem",
                        paddingTop: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      <div
                        className="space-y-4 "
                        style={{ marginLeft: "4rem" }}
                      >
                        <TextField
                          inputRef={componnentNameInput}
                          id="standard-basic"
                          label={"Component Name"}
                          variant="standard"
                          style={{ width: "28rem" }}
                          value={textValue || ""}
                          onChange={(e) => setTextValue(e.target.value)}
                        />

                        <FormControl sx={{ width: 450 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Parent Folder
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={componnentSelectFolder}
                            onChange={componentSelectChange}
                            autoWidth
                            label="Parent Folder"
                          >
                            {fold.map((name) =>
                              data.fillData ? (
                                <MenuItem
                                  key="parent"
                                  sx={{ width: 440 }}
                                  value={name}
                                >
                                  {name}
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  key={name}
                                  sx={{ width: 440 }}
                                  value={name}
                                >
                                  {name}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>

                        <div
                          style={{
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            marginLeft: "-1rem",
                          }}
                        >
                          <FormControlLabel
                            value="Single Use"
                            control={
                              <Checkbox
                                onChange={componentCheckBoxChange}
                                checked={componnentCheckbox || false}
                              />
                            }
                            label="Single Use"
                            labelPlacement="start"
                          />
                        </div>

                        <br />
                        <Button
                          color="primary"
                          startIcon={<AddIcon />}
                          style={{ marginBottom: "20px" }}
                          onClick={addProp}
                        >
                          Add prop
                        </Button>
                        <br />

                        <Box
                          sx={{
                            height: 250,
                            width: "100%",
                          }}
                        >
                          <DataGrid
                            rows={rowsAddProps || []}
                            columns={columnsOfAddProps}
                            editMode="row"
                            // rowsPerPageOptions={[]}
                            // pageSize={3}
                            disableColumnMenu
                            disableColumnFilter
                            disableColumnSelector
                            // isRowSelectable={rowSelector}

                            experimentalFeatures={{ newEditingApi: true }}
                          />
                        </Box>

                        <FormControl sx={{ m: 1, width: 450 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            API Calls
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={apiCallSelect}
                            onChange={apiCallSelectChange}
                            autoWidth
                            label="API Calls"
                          >
                            {apiCalls.map((name) => (
                              <MenuItem
                                key={name}
                                sx={{ width: 440 }}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Button
                          varient="contained"
                          style={{
                            width: "29rem",
                            backgroundColor: "lightblue",
                            marginTop: "1rem",
                          }}
                          onClick={addComponentSave}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Scrollbars>
                </div>
              );
            case "Add API":
              return (
                <div
                  style={{
                    backgroundColor: "#EDEDED",
                    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                    width: "38rem",
                    height: "40rem",
                  }}
                >
                  <button
                    className="w-7 float-right relative top-0 hover:bg-red-700 hover:text-white hover:w-7"
                    onClick={close}
                  >
                    X
                  </button>
                  <label className="flex justify-center text-3xl relative top-12 font-semibold">
                    {data.title}
                  </label>
                  <Scrollbars
                    style={{
                      width: "34rem",
                      height: "30rem",
                      marginTop: "4rem",
                      paddingTop: "1rem",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "4rem",
                        height: "30rem",
                        paddingTop: "1rem",
                        paddingRight: "1rem",
                        marginLeft: "4rem",
                      }}
                    >
                      <TextField
                        inputRef={apiRouteNameInput}
                        id="standard-basic"
                        label={"API Route"}
                        variant="standard"
                        style={{
                          width: "28rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                        value={apiRouteTextValue || ""}
                        onChange={(e) => setApiRouteTextValue(e.target.value)}
                      />
                      <FormControl sx={{ width: 450 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Parent Folder
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={apiSelectFolder}
                          onChange={apiSelectChange}
                          autoWidth
                          label="Parent Folder"
                        >
                          {fold.map((name) =>
                            data.fillData ? (
                              <MenuItem
                                key="parent"
                                sx={{ width: 440 }}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ) : (
                              <MenuItem
                                key={name}
                                sx={{ width: 440 }}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                      <br />{" "}
                      <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={addParameters}
                      >
                        Add Parameter
                      </Button>
                      <Box
                        sx={{
                          height: 200,
                          width: "100%",
                        }}
                      >
                        <DataGrid
                          rows={rowsAddParam || []}
                          columns={columnsOfAddParameter}
                          editMode="row"
                          // rowsPerPageOptions={[]}
                          disableColumnMenu
                          disableColumnFilter
                          disableColumnSelector
                          experimentalFeatures={{ newEditingApi: true }}
                        />
                      </Box>
                      <br />{" "}
                      <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={addResponse}
                      >
                        Add Response
                      </Button>
                      <Box
                        sx={{
                          height: 200,
                          width: "100%",
                        }}
                      >
                        <DataGrid
                          rows={rowsAddResponse || []}
                          columns={columnsAddResponse}
                          editMode="row"
                          // rowsPerPageOptions={[]}
                          disableColumnMenu
                          disableColumnFilter
                          disableColumnSelector
                          experimentalFeatures={{ newEditingApi: true }}
                        />
                      </Box>
                      <Button
                        varient="contained"
                        style={{
                          width: "30rem",
                          backgroundColor: "lightblue",
                          marginTop: "1rem",
                        }}
                        onClick={addApiSave}
                      >
                        Save
                      </Button>
                    </div>
                  </Scrollbars>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default PopupWindow;
