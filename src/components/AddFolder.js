import React from "react";
import styles from '../styles/addFolder.module.css'
// import Select from "react-dropdown-select";
import { FormControl, InputLabel } from "@mui/material";

const MODAL_STYLE ={
    position: 'fixed',
    top:'50%',
    left:'50%',
    zIndex:1000,
    background:'#FFF',
    transform:'translate(-50%,-50%)',
    padding:'300px',
    backgroundColor:'white'
}

const OVERLAY_STYLE ={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottm:0,
    backgroundColor:'rgba(0 , 0, 0, 0.7)',
    zIndex:1000,
    width:'100%',
    height:'100%'

}


const AddFolder = ( {open , close}) =>{

    if(!open) return null
    return(
        <div style={OVERLAY_STYLE}>
            <div style={MODAL_STYLE}>
                <label className={styles.topName}>Add Folder</label>
                <button className={styles.closeBtn} onClick={close}>X</button>

                {/* <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                </FormControl> */}
                
                {/* <select className={styles.dropboxMenu} value="Folder 1" >
                    <option value="parent">Parent Folder</option>
                    <option value="/">/</option>
                    <option value="Folder 1">Folder 1</option>
                    <option value="Folder 2">Folder 2</option>
                    <option value="Folder 3">Folder 3</option>
                </select> */}
            </div>
        </div>
    )
}

export default AddFolder;