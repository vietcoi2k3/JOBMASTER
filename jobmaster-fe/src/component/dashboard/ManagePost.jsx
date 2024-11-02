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
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    Pagination,
    FormControl,
    Select,
    Grid,
    MenuItem,
    Typography,
    Box
} from '@mui/material';
import { Edit, Visibility, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";
import Notification from "../notification/Notification";
import ConfirmDialog from '../share/ConfirmDialog';
import NotificationDialog from "../share/NotificationDialog";

export default function ManagePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("ALL");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [postId, setPostId] = useState();
    const [openNoti, setOpenNoti] = useState(false);
    const [mgsConfirm, setMgsConfirm] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: 'success'
    });

    useEffect(() => {
        getList();
    }, [pageNumber, status]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') getList();
    };

    const getList = () => {
        setLoading(true);
        EnterpriseApi.getListPost(pageNumber, search, status === "ALL" ? "" : status)
            .then((e) => {
                setPost(e.data);
                setTotalPage(e.totalPages);
            })
            .catch(() => setNotification({
                open: true,
                message: "Lỗi khi tải dữ liệu",
                type: "error"
            }))
            .finally(() => setLoading(false));
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleResetStatus = () => {
        EnterpriseApi.resetPostStatus(postId)
            .then(() => {
                setNotification({
                    open: true,
                    message: "Hạ tin đăng thành công",
                    type: "success"
                });
                getList();
            })
            .catch(() => {
                setNotification({
                    open: true,
                    message: "Lỗi khi hạ tin đăng",
                    type: "error"
                });
            });
    };

    const checkStatus = () => {
        EnterpriseApi.getStatus()
            .then((res) => {
                if (res !== 'ACTIVE') {
                    setOpenNoti(true);
                } else {
                    navigate("/dashboard/job-form/create");
                }
            })
            .catch(() => {
                setNotification({
                    open: true,
                    message: "Lỗi khi kiểm tra trạng thái",
                    type: "error"
                });
            });
    };

    return (
        <Box p={4} sx={{ backgroundColor: '#F5F7FA', minHeight: '100vh' ,width :'100%'}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="primary">Quản lý tin đăng tuyển</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={checkStatus}
                    sx={{ borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold' }}
                >
                    + Thêm tin tuyển dụng
                </Button>
            </Box>

            <Notification
                open={notification.open}
                onClose={() => setNotification({ open: false })}
                message={notification.message}
                type={notification.type}
            />

            <Grid container spacing={2} alignItems="center" mb={3}>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            displayEmpty
                            sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                        >
                            <MenuItem value="ALL">Tất cả tin đăng</MenuItem>
                            <MenuItem value="APPROVED">Đã được duyệt</MenuItem>
                            <MenuItem value="AWAITING_APPROVAL">Đang chờ duyệt</MenuItem>
                            <MenuItem value="NOT_APPROVED">Chưa duyệt</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Nhập tên chiến dịch"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={getList}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                    />
                </Grid>
            </Grid>

            <TableContainer sx={{ backgroundColor: "#ffffff", borderRadius: '8px', boxShadow: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tin tuyển dụng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Vị trí</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Chiến dịch</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Số lượng CV</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Thao tác</TableCell>
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
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.position}</TableCell>
                                    <TableCell>{post.nameCam}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => navigate(`/dashboard/view-cv/${post.id}`)}
                                        >
                                            Xem CV ({post.quantityCv})
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Xem tin">
                                            <IconButton onClick={() => navigate("/dashboard/job-form/detail/" + post.id)}>
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa">
                                            <IconButton onClick={() => navigate("/dashboard/job-form/update/" + post.id)}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hạ tin">
                                            <Switch
                                                checked={post.status === 'AWAITING_APPROVAL' || post.status === 'APPROVED'}
                                                disabled={post.status === 'NOT_APPROVED'}
                                                onClick={() => {
                                                    setMgsConfirm("Bạn có muốn hạ tin đăng không?");
                                                    setPostId(post.id);
                                                    setOpenConfirm(true);
                                                }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box mt={3}>
                <Pagination
                    onChange={(event, page) => setPageNumber(page)}
                    page={pageNumber}
                    count={totalPage}
                    color="primary"
                    sx={{
                        backgroundColor: '#ffffff',
                        padding: '10px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
            </Box>

            <ConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                title="Xác nhận"
                onConfirm={handleResetStatus}
                message={mgsConfirm}
            />

            <NotificationDialog
                open={openNoti}
                onClose={() => setOpenNoti(false)}
                message="Bạn không thể thêm tin tuyển dụng mới trong thời điểm hiện tại."
            />
        </Box>
    );
}
