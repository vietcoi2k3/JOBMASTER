import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tabs,
    Tab,
    Box,
    TextField,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
import CreateFieldPopup from "./CreateFieldPopup";
import {useNavigate} from "react-router-dom";
import CreatePositionPopup from "./CreatePositionPopup";


// Component for the table
function SettingTable2() {
    const [tabIndex, setTabIndex] = useState(0); // State for active tab
    const [code,setCode] = useState(null)
    const [name,setName] = useState(null)
    const [position,setPosition] = useState([])
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        AdminApi.getListPosition(code,name).then((e)=>{
            setPosition(e)
        })
    };
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(()=>{
        AdminApi.getListPosition(code,name).then((e)=>{
            setPosition(e)
        })
    },[])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 1 }}>

                {/* Search fields */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <TextField label="Tên vị trí" variant="outlined" size="small" />
                        <TextField label="Mã vị trí " variant="outlined" size="small" />
                    </Box>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Thêm mới
                    </Button>
                </Box>
            </Box>

            {/* Table section */}
            <TableContainer component={Paper} sx={{ marginTop: 2 ,maxHeight: 400}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>code</TableCell>
                            <TableCell>Tên lĩnh vực</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {position.map((field, index) => (
                            <TableRow key={field.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{field.code}</TableCell>
                                <TableCell>{field.name}</TableCell>
                                <TableCell style={{ color: field.status === 'ACTIVE' ? 'green' : 'red' }}>
                                    {field.status}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="view" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color="primary" onClick ={()=>{
                                        AdminApi.deletePosition(field.id).then((e)=>{
                                            AdminApi.getListPosition(code,name).then((e)=>{
                                                setPosition(e)
                                            })
                                        })
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreatePositionPopup open={open} onClose={handleClose} />
        </Box>
    );
}

export default SettingTable2;
