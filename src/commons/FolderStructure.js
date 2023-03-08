import React, { useState } from "react";
import Link from "@mui/joy/Link";

import { Collapse } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const FolderStructure = (props) => {
  let folders = props.folders;
  let mainARR = props.rootArray;

  const [open, setOpen] = useState(false);
  const [foldName, SelectFold] = useState(null);

  return folders.map((f, i) => {
    if (f.subArray) {
      return (
        <ul key={f.name} style={{ marginLeft: "1rem", lineHeight: "1.5rem" }}>
          <li key={f.name} style={{ marginLeft: "1rem" }}>
            {(() => {
              if (f.type === "component") {
                return (
                  <Link
                    component="button"
                    id={f.name}
                    onClick={(e) => {
                      props.popupOpen(true);
                      if (e.target.id === f.name) {
                        props.data({
                          title: "Add Component",
                          fillData: f.componentObj,
                          mainArr: mainARR,
                        });
                      }
                    }}
                  >
                    {f.name}
                  </Link>
                );
              } else if (f.type === "api") {
                return (
                  <Link
                    component="button"
                    id={f.name}
                    onClick={(e) => {
                      props.popupOpen(true);

                      if (e.target.id === f.name) {
                        props.data({
                          title: "Add API",
                          fillData: f.apiObj,
                          mainArr: mainARR,
                        });
                      }
                    }}
                  >
                    {f.name}
                  </Link>
                );
              } else {
                if (f.subArray.length > 0) {
                  return (
                    <ul>
                      <button
                        id={f.name}
                        onClick={(e) => {
                          var parentElement = e.target.parentNode;
                          var parentId = parentElement.id;

                          if (parentId === f.name) {
                            if (foldName === f.name || foldName === null) {
                              setOpen(!open);
                            } else {
                              setOpen(true);
                            }

                            SelectFold(f.name);
                          }
                        }}
                      >
                        {open && foldName === f.name ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </button>
                      <button
                        style={{
                          background: "lightgrey",
                          padding: "0px 10px 0px 10px",
                          border: "solid black 1px",
                        }}
                        id={f.name}
                        onClick={(e) => {
                          props.addFolderPopupOpen(true);
                          console.log(
                            "target id and f.name ",
                            e.target.id,
                            f.name
                          );
                          if (e.target.id === f.name)
                            props.addFolderData({
                              title: "Add Folder",
                              fillData: f.subArray,
                              mainArr: mainARR,
                              folderObj: f,
                            });
                        }}
                      >
                        {f.name}
                      </button>

                      <Collapse
                        in={open && foldName === f.name}
                        timeout="auto"
                        unmountOnExit
                      >
                        {
                          <FolderStructure
                            folders={f.subArray}
                            data={props.data}
                            popupOpen={props.popupOpen}
                            rootArray={props.rootArray}
                            addFolderPopupOpen={props.addFolderPopupOpen}
                            addFolderData={props.addFolderData}
                          />
                        }
                      </Collapse>
                    </ul>
                  );
                } else {
                  return f.name;
                }
              }
            })()}
          </li>
        </ul>
      );
    }
    return <li key={f.name}>{f.name}</li>;
  });
};

export default FolderStructure;
