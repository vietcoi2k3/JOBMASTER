import React, { useEffect, useState } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    Tooltip,
    TextField, Button,
    CircularProgress,
    InputAdornment, Pagination,
    FormControl,
    Select,
    Grid, InputLabel, MenuItem
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";
import EuroIcon from '@mui/icons-material/Euro';
import SearchIcon from '@mui/icons-material/Search';
import Notification from "../notification/Notification";
import JobPostingDialog from "../share/JobPostingDialog";


export default function ManagePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("ALL");
    const [notification, setNotification] = React.useState({
        open: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        getList();
    }, [pageNumber, status]);


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getList();
        }
    };
    const getList = () => {
        setLoading(true);
        EnterpriseApi.getListPost(pageNumber, search, status === "ALL" ? "" : status)
            .then((e) => {
                setPost(e.data)
                setTotalPage(e.totalPages)
            })
            .catch()
            .finally(() => setLoading(false))
    }
    return (
        <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Tin đăng tuyển</h1>
                <button onClick={() => navigate("/dashboard/job-form/create")} className="bg-primary text-accent py-2 px-4 rounded border-sidebar">+ Thêm tin tuyển dụng</button>
            </div>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ open: false })}
                message={notification.message}
                type={notification.type}
            />
            <Grid container alignItems="center">
                {/* Dropdown for status */}
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => { setStatus(e.target.value) }}
                            sx={{ backgroundColor: '#ffffff' }}
                        >
                            <MenuItem value="ALL">Tất cả tin đăng</MenuItem>
                            <MenuItem value="APPROVED">Đã được duyệt</MenuItem>
                            <MenuItem value="AWAITING_APPROVAL">Đang chờ duyệt</MenuItem>
                            <MenuItem value="NOT_APPROVED">Chưa duyệt</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
    
                {/* TextField for search */}
                <Grid item xs={12} sm={9}>
                    <TextField
                        label="Nhập tên chiến dịch"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="search"
                        sx={{ backgroundColor: '#ffffff' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon
                                        onClick={getList}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <TableContainer sx={{ backgroundColor: "#ffffff"}} className="border-s-accent rounded ">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Tin tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Vị trí</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Chiến dịch tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Số lượng CV</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            post.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                        <div>{post.title}</div>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>{post.position}</TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                        <div>{post.nameCam}</div>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" color="primary" onClick={() => [
                                            navigate(`/dashboard/view-cv/${post.id}`)
                                        ]}>
                                            Xem CV ({post.quantityCv})
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'space-between' }}>
                                        <Tooltip title="Xem tin">
                                            <IconButton onClick={() => navigate("/dashboard/job-form/detail/" + post.id)}>
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton onClick={() => { navigate("/dashboard/job-form/update/" + post.id) }}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hạ tin">
                                        <Switch 
                                        disabled ={post.status === 'NOT_APPROVED'}
                                         checked={post.status === 'AWAITING_APPROVAL' || post.status === 'APPROVED'} />
                                        </Tooltip>
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    
                </Table>
            </TableContainer>
            <Pagination
                onChange={(event, page) => setPageNumber(page)}
                page={pageNumber}
                count={totalPage}
                color="primary"
                sx={{
                    width: '100%',
                    backgroundColor: '#ffff',
                    marginTop: 1,
                    '& .MuiPagination-ul': {
                        justifyContent: 'center'
                    }
                }}
            />
        </div>
    );
}    
