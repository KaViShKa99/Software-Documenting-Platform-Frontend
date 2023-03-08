import React,{ useState, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Edit from '@mui/icons-material/Edit';

export default function FormDialog({tableCol,tableName, rowValue, dArr, setUpdate}) {

  const [open, setOpen] = useState(false);
  const parameterInputRef = useRef(null)
  const propNameInputRef = useRef(null)
  const typeInputRef = useRef(null)
  const defaultValueInputRef = useRef(null)
  const responseInputRef =  useRef(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const save =()=>{
    switch(tableName){
      case 'Prop':
        const index = dArr.findIndex((obj) => obj.id === rowValue.id);
        const newAr = [...dArr] 
        newAr[index] = {
            id:rowValue.id,
            propName:propNameInputRef.current.value,
            type:typeInputRef.current.value,
            defaultValue:defaultValueInputRef.current.value
        }
        setUpdate(newAr)
        break
      case 'Parameter':
        const index2 = dArr.findIndex((obj) => obj.id === rowValue.id);
        const newAr2 = [...dArr] 
        newAr2[index2] = {
            id:rowValue.id,
            parameter:parameterInputRef.current.value,
            type:typeInputRef.current.value,
        }
        setUpdate(newAr2)
        break
      case 'Response':
        const index3 = dArr.findIndex((obj) => obj.id === rowValue.id);
        const newAr3 = [...dArr] 
        newAr3[index3] = {
            id:rowValue.id,
            response:responseInputRef.current.value,
        }
        setUpdate(newAr3)
        break
      default:
        break
    }
    setOpen(false);
  }

  return (
    <div>
      <Button color="success" startIcon={<Edit />}  onClick={handleClickOpen}></Button>

      <Dialog open={open} onClose={handleClose}>
      
        <DialogTitle>Edit {tableName}</DialogTitle>
        <DialogContent>

          { tableName === 'Parameter' && ( <TextField
            
           
            inputRef={parameterInputRef}
            autoFocus
            margin="dense"
            id={tableCol[0].headerName}
            label={tableCol[0].headerName}
            type={tableCol[0].headerName}s
            fullWidth
            variant="standard"
          /> )}

          
          { tableName === 'Prop' && ( <TextField
            
            
            inputRef={propNameInputRef}
            autoFocus
            margin="dense"
            id="propName"
            label="Prop Name"
            type="propName"
            fullWidth
            variant="standard"
          /> )}

          { (tableName === 'Prop' || tableName === 'Parameter') && (<TextField
            
           
            inputRef={typeInputRef}
            autoFocus
            margin="dense"
            id="type"
            label="Type"
            type="Type"
            fullWidth
            variant="standard"
          />)}

          { tableName === 'Prop' && (<TextField

            
            inputRef={defaultValueInputRef}
            autoFocus
            margin="dense"
            id="defaultValue"
            label="Default Value"
            type="defaultValue"
            fullWidth
            variant="standard"
          />)}

          { tableName === 'Response' && (<TextField

          style={{width:"400px"}}
          inputRef={responseInputRef}
          autoFocus
          margin="dense"
          id={tableCol[0].headerName}
          label={tableCol[0].headerName}
          type={tableCol[0].headerName}
          fullWidth
          variant="standard"
          />)}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
