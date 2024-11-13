import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    TextField,
    Button,
    Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import AdminApi from "../../api/AdminApi";
// import CreateFieldPopup from "./CreateFieldPopup";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RecruitmentPopup from "./RecruitmentPopup";

function Campaign() {
    const [pageNumber, setPageNumber] = useState(1);
    const [candidate, setCandidate] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [campaignName, setCampaignName] = useState('');
    const [tax, setTax] = useState('');
    const [reload, setReload] = useState(false);

    const handleReload = () => {
        fetch();
        setReload(!reload);
    };
    const getStatusInfo = (status) => {
        switch (status) {
            case true:
                return { color: 'green', text: 'Đang hoạt động' };
            case false:
                return { color: 'goldenrod', text: 'Ngừng hoạt động' };
            default:
                return { color: 'black', text: 'Không xác định' };
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetch();
    };

    const fetch = async () => {
        const response = await AdminApi.getListCampaign(pageNumber, campaignName, tax);
        setCandidate(response.data);
        setTotalPages(response.totalPage);
    };

    useEffect(() => {
        fetch();
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetch();
        }
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', padding: 2, bgcolor: '#E8EDF2' }}>
            <Box sx={{ bgcolor: '#ffffff', padding: 2, borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Tên chiến dịch"
                            variant="outlined"
                            size="small"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <TextField
                            label="Mã số thuế"
                            variant="outlined"
                            size="small"
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetch}
                            startIcon={<SearchIcon />}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                        startIcon={<AddIcon />}
                    >
                        Thêm chiến dịch
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{  }}>
                            <TableCell sx={{ fontWeight: 'bold'}}>STT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Tiêu chiến dịch</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Tên doanh nghiệp</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Mã số thuế</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: 'bold'}}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidate.map((item, index) => {
                            const { color, text } = getStatusInfo(item.status);
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <TableCell>{((pageNumber - 1) * 10) + index + 1}</TableCell>
                                    <TableCell>{item.campaignName}</TableCell>
                                    <TableCell>{item.enterpriseName}</TableCell>
                                    <TableCell>{item.tax}</TableCell>
                                    <TableCell style={{ color }}>{text}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="view" color="primary">
                                            <RecruitmentPopup onSuccess={handleReload} createStep={false} campaign={item} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={totalPages}
                    page={pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {/*<CreateFieldPopup open={open} onClose={handleClose} />*/}
        </Box>
    );
}

export default Campaign;
