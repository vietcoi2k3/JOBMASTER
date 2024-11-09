import React, { useEffect, useState } from 'react';
import {
    Box, TextField, Select, MenuItem, Typography, Button, Grid, Paper, CircularProgress, InputLabel, FormControl
} from '@mui/material';
import Province from "../../api/Province";
import Notification from "../notification/Notification";
import EnterpriseApi from "../../api/EnterpriseApi";
import { useLocation, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ConfirmDialog from '../share/ConfirmDialog';


const JobForm = ({ operator }) => {
    const params = useParams();
    const id = operator === 'create' ? null : params.id;
    const navigate = useNavigate();
    const [listCity, setListCity] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listCampaign, setListCampaign] = useState([])
    const [listPosition, setListPosition] = useState([])
    const [listField, setListField] = useState([])
    const [errors, setErrors] = useState({});
    const [openConfirm, setOpenConfirm] = useState(false);
    const [mgsConfirm, setMgsConfirm] = useState('');
    const [hasFillData, setHasFillData] = useState(true);
    const [status, setStatus] = useState();
    const [notification, setNotification] = React.useState({
        open: false,
        message: '',
        type: 'success'
    });
    const initialData = {
        title: "",
        field: "",
        position: "",
        deadline: "",
        quantity: "",
        city: "",
        district: "",
        typeWorking: "",
        level: "",
        experience: "",
        gender: "",
        timeWorking: "",
        description: "",
        required: "",
        interest: "",
        requiredSkill: "",
        skillShouldHave: "",
        campaignId: "",
        salaryRange: "",
        campaignName: "",
        detailAddress: "",
    };
    const [data, setData] = useState(initialData);

    useEffect(() => {
        checkStatus();
        getProvince();
        EnterpriseApi.getAllPosition().then((e) => {
            setListPosition(e)
        })
        EnterpriseApi.getAllField().then((e) => {
            setListField(e)
        })

    }, [])
    useEffect(() => {
        if (id) { // kiểm tra nếu id khác null hoặc undefined
            EnterpriseApi.getAllCampaign(id).then((e) => setListCampaign(e));
        } else {
            EnterpriseApi.getAllCampaign().then((e) => setListCampaign(e));
        }
    }, [id]);
    useEffect(() => {
        if (id === null) {
            setData(initialData);
        } else {
            setHasFillData(false);
            EnterpriseApi.getDetailPost(id)
                .then((res) => {
                    setStatus(res.status);
                    setData(res);
                })
                .catch((error) => {
                    setNotification({
                        open: true,
                        message: error.message,
                        type: "error"
                    });
                })
                .then(() => {
                    setHasFillData(true)
                });
        }
    }, [id])
    useEffect(()=>{
        if(data.city&&listCity){
            // console.log(listCity.find(e=>e.province_name===data.city)+"4444444444444")
            getDistrict(listCity.find(e=>e.province_name===data.city).province_id);

        }
    },[data.city]);
    const checkStatus = () => {
        EnterpriseApi.getStatus()
            .then((res) => {
                if (res !== 'ACTIVE') {
                    localStorage.removeItem('access-token');
                    navigate('/');
                }
            })
            .catch((error) => {
                localStorage.removeItem('access-token');
                navigate('/');
                console.error("Error fetching status:", error); // bắt lỗi khi fetch status
            });

    }
    const handleResetStatus = () => {
        setLoading(true);
        EnterpriseApi.resetPostStatus(id)
            .then((res) => {
                setNotification({
                    open: true,
                    message: "Hạ tin đăng thành công",
                    type: "success"
                })
                setTimeout(1000);
                navigate("/dashboard/manage-post");
            })
            .catch((error) => {
                setNotification({
                    open: true,
                    message: error,
                    type: "error"
                })
            })
        setLoading(false);

    }
    const handleSubmit = () => {
        const validation = validateData(data);

        if (!validation.isValid) {
            setErrors(validation.errors); // Cập nhật lỗi vào trạng thái
            setNotification({
                open: true,
                message: "Điền đầy đủ thông tin yêu cầu",
                type: "error"
            })
            return;
        }
        setLoading(true)
        if (operator === 'update') {
            EnterpriseApi.updatePost(id, data)
                .then((res) => {
                    setNotification({
                        open: true,
                        message: "Cập nhật thành công",
                        type: "success"
                    })
                    navigate("/dashboard/manage-post")
                })
                .catch((error) =>
                    setNotification({
                        open: true,
                        message: error,
                        type: "error"
                    }))
                .finally(() => setLoading(false))
        } else if (operator === 'create') {
            EnterpriseApi.addPost(data)
                .then((res) => {
                    setNotification({
                        open: true,
                        message: "Thêm thành công",
                        type: "success"
                    })
                    navigate("/dashboard/manage-post")
                })
                .catch((error) =>
                    setNotification({
                        open: true,
                        message: error,
                        type: "error"
                    }))
                .finally(() => setLoading(false))
        }
        setLoading(false);

    }
    const validateData = (data) => {
        const errors = {};

        if (!data.title || data.title.trim() === '') {
            errors.title = 'Tiêu đề không được để trống.';
        }

        if (!data.field || data.field.trim() === '') {
            errors.field = 'Lĩnh vực không được để trống.';
        }

        if (!data.position || data.position.trim() === '') {
            errors.position = 'Vị trí không được để trống.';
        }


        if (!data.quantity || data.quantity <= 0) {
            errors.quantity = 'Số lượng phải lớn hơn 0.';
        }

        if (!data.city || data.city.trim() === '') {
            errors.city = 'Tỉnh/Thành phố không được để trống.';
        }

        if (!data.district || data.district.trim() === '') {
            errors.district = 'Quận/huyện không được để trống.';
        }

        if (!data.detailAddress || data.detailAddress.trim() === '') {
            errors.detailAddress = 'Địa chỉ chi tiết không được để trống.';
        }

        if (!data.typeWorking || data.typeWorking.trim() === '') {
            errors.typeWorking = 'Loại công việc không được để trống.';
        }

        if (!data.level || data.level.trim() === '') {
            errors.level = 'Cấp độ không được để trống.';
        }

        if (!data.experience || data.experience.trim() === '') {
            errors.experience = 'Kinh nghiệm không được để trống.';
        }

        if (!data.timeWorking || data.timeWorking.trim() === '') {
            errors.timeWorking = 'Thời gian làm việc không được để trống.';
        }

        if (data.campaignId == null||data.campaignId.trim() === '') {
            errors.campaignId = 'Chiến dịch tuyển dụng không được để trống.';
        }

        if (!data.salaryRange || data.salaryRange.trim() === '') {
            errors.salaryRange = 'Khoảng lương không được để trống.';
        }

        if (!data.deadline || data.deadline.trim() === '') {
            errors.deadline = 'Khoảng lương không được để trống.';
        }



        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const handleChange = (e) => { 
        if (hasFillData) {
            const newValue = e.target.value;
            if (data[e.target.name] !== newValue) { // Chỉ cập nhật nếu giá trị khác
                console.log(data);
                setData({
                    ...data,
                    [e.target.name]: newValue
                });
                if (e.target.name === 'city') {
                    const selectedProvince = listCity.find(province => province.province_name === newValue);
                    if (selectedProvince) {
                        getDistrict(selectedProvince.province_id);
                    } else {
                        setListDistrict([]);
                    }
                }
            }
        }
    }
    
    const getDistrict = (provinceId) => {
        // Gọi API để lấy danh sách quận/huyện
        Province.getDistrictByProvince(provinceId)
            .then(response => {
                // Đảm bảo response là một mảng hoặc đặt là mảng rỗng nếu không có dữ liệu
                setListDistrict(response.results || []);
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách quận/huyện:", error);
                setListDistrict([]); // Xử lý khi gặp lỗi
            });
    };
    const getProvince = () => {
        return Province.getProvince().then(response => setListCity(response));
    };
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleConfirm = () => {
        handleResetStatus();
    };
    return (
        <Box sx={{ padding: '45px', backgroundColor: '#FFFFFF' }}>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ open: false })}
                message={notification.message}
                type={notification.type}
            />
            <Grid container spacing={2}>
                {/* Form chiếm 7/12 cột */}
                <Grid item xs={12} md={7}>
                    <Paper
                        elevation={0}
                        sx={{
                            padding: 4,
                            width: '100%',
                            border: 'none'
                        }}
                    >


                        <Grid container spacing={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Thông tin chung
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="title-label" style={{ fontWeight: 'bold' }}>
                                        Tiêu đề tin <span style={{ color: 'red' }}>*</span> {/* Ký hiệu bắt buộc */}
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        labelId="title-label"
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 50 }}
                                        value={data.title || ''}
                                        name="title"
                                        placeholder="Tiêu đề tin"
                                        required
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        error={Boolean(errors.title)}
                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <InputLabel id="campaign-label" style={{ fontWeight: 'bold' }}>
                                        Chiến dịch tuyển dụng <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.campaignId)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        select
                                        fullWidth
                                        labelId="campaign-label"
                                        name='campaignId'
                                        required
                                        onChange={(e) => {
                                            const selectedCampaign = listCampaign.find(campaign => campaign.name === e.target.value);
                                            setData({
                                                ...data,
                                                campaignId: selectedCampaign?.id || null // kiểm tra nếu không tìm thấy
                                            });
                                        }}
                                        value={
                                            data.campaignId
                                                ? listCampaign.find(campaign => campaign.id === data.campaignId)?.name || data.campaignName || "Không tìm thấy tên"
                                                : data.campaignName
                                        }
                                    >
                                        {listCampaign.map((campaign, index) => (
                                            <MenuItem key={index} value={campaign.name}>
                                                {campaign.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="position-label" style={{ fontWeight: 'bold' }}>
                                        Vị trí <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.position)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        labelId="position-label"
                                        select
                                        fullWidth
                                        required
                                        value={data.position}
                                        name="position"
                                        onChange={handleChange}
                                    >
                                        {listPosition.map((e) => {
                                            return <MenuItem key={e.index} value={e.name}>{e.name}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="field-label" style={{ fontWeight: 'bold' }}>
                                        Lĩnh vực <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.field)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        labelId="field-label"
                                        select
                                        fullWidth
                                        required
                                        value={data.field}
                                        name="field"
                                        onChange={handleChange}
                                    >
                                        {listField.map((e) => {
                                            return <MenuItem key={e.index} value={e.name}>{e.name}</MenuItem>
                                        })}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="deadline-label" style={{ fontWeight: 'bold' }}>
                                        Hạn nộp hồ sơ <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.deadline)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        fullWidth
                                        labelId="deadline-label"
                                        type="date"
                                        name="deadline"
                                        value={data.deadline}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="quantity-label" style={{ fontWeight: 'bold' }}>
                                        Số lượng <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.quantity)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        fullWidth
                                        labelId="quantity-label"
                                        type="number"
                                        name="quantity"
                                        value={data.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Khu vực làm việc
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="city-label" style={{ fontWeight: 'bold' }}>
                                        Chọn tỉnh/Thành phố <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.city)}
                                        InputProps={{ readOnly: operator === 'detail'||!listDistrict}}
                                        labelId="city-label"
                                        select
                                        fullWidth
                                        name="city"
                                        value={data.city}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    >
                                        {listCity.map((e) => (
                                            <MenuItem key={e.province_id} value={e.province_name}>
                                                {e.province_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel id="district-label" style={{ fontWeight: 'bold' }}>
                                        Chọn quận/huyện <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ readOnly: operator === 'detail'|| !data.city }}
                                        labelId="district-label"
                                        select
                                        fullWidth
                                        name="district"
                                        value={data.district}
                                        onChange={(event) => {
                                            handleChange(event);
                                        }}
                                    >
                                        {listDistrict.map((e) => (
                                            <MenuItem key={e.district_id} value={e.district_name}>
                                                {e.district_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel id="detail-address-label" style={{ fontWeight: 'bold' }}>
                                        Địa chỉ chi tiết <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        fullWidth
                                        labelId="detail-address-label"
                                        name="detailAddress"
                                        value={data.detailAddress}
                                        onChange={handleChange}
                                        placeholder='Địa chỉ chi tiết'
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Yêu cầu chung
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel id="type-working-label" style={{ fontWeight: 'bold' }}>
                                        Loại công việc <span style={{ color: 'red' }}>*</span> {/* Ký hiệu bắt buộc */}
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.typeWorking)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        select
                                        labelId="type-working-label"
                                        fullWidth
                                        value={data.typeWorking} // Giá trị hiện tại
                                        name="typeWorking"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Toàn thời gian">Toàn thời gian</MenuItem>
                                        <MenuItem value="Bán thời gian">Bán thời gian</MenuItem>
                                        <MenuItem value="Thực tập">Thực tập</MenuItem>
                                    </TextField>
                                </Grid>


                                <Grid item xs={12} md={6}>
                                    <InputLabel id="level-label" style={{ fontWeight: 'bold' }}>
                                        Cấp bậc <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.level)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        labelId="level-label"
                                        select
                                        fullWidth
                                        required
                                        value={data.level}
                                        name="level"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                                        <MenuItem value="Trưởng nhóm">Trưởng nhóm</MenuItem>
                                        <MenuItem value="Trưởng/ Phó phòng">Trưởng/ Phó phòng</MenuItem>
                                        <MenuItem value="Trưởng chi nhánh">Trưởng chi nhánh</MenuItem>
                                        <MenuItem value="Quản lý/ Giám sát">Quản lý/ Giám sát</MenuItem>
                                        <MenuItem value="Phó giám đốc">Phó giám đốc</MenuItem>
                                        <MenuItem value="Giám đốc">Giám đốc</MenuItem>
                                        <MenuItem value="Thực tập sinh">Thực tập sinh</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="experience-label" style={{ fontWeight: 'bold' }}>
                                        Kinh nghiệm <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.experience)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        labelId="experience-label"
                                        select
                                        fullWidth
                                        required
                                        value={data.experience}
                                        name="experience"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</MenuItem>
                                        <MenuItem value="Dưới 1 năm">Dưới 1 năm</MenuItem>
                                        <MenuItem value="1 năm">1 năm</MenuItem>
                                        <MenuItem value="2 năm">2 năm</MenuItem>
                                        <MenuItem value="3 năm">3 năm</MenuItem>
                                        <MenuItem value="4 năm">4 năm</MenuItem>
                                        <MenuItem value="5 năm">5 năm</MenuItem>
                                        <MenuItem value="Trên 5 năm">Trên 5 năm</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputLabel id="salary-range-label" style={{ fontWeight: 'bold' }}>
                                        Khoảng lương <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.salaryRange)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        fullWidth
                                        labelId="salary-range-label"
                                        name="salaryRange"
                                        value={data.salaryRange}  // Giá trị mặc định là "Thỏa thuận"
                                        onChange={handleChange}
                                        placeholder="Ví dụ: 10 - 20 triệu"
                                    />
                                </Grid>



                                <Grid item xs={12} >
                                    <InputLabel id="time-working-label" style={{ fontWeight: 'bold' }}>
                                        Thời gian làm việc <span style={{ color: 'red' }}>*</span>
                                    </InputLabel>
                                    <TextField
                                        error={Boolean(errors.timeWorking)}
                                        InputProps={{ readOnly: operator === 'detail' }}
                                        fullWidth
                                        labelId="time-working-label"
                                        value={data.timeWorking}
                                        onChange={handleChange}
                                        name="timeWorking"
                                        placeholder="Thời gian làm việc"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom>
                                        Thông tin chi tiết
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel variant="h6" style={{ fontWeight: 'bold' }}>
                                        Mô tả công việc
                                    </InputLabel>
                                    <ReactQuill
                                        readOnly={operator === 'detail'}
                                        theme="snow"
                                        placeholder="Mô tả công việc"
                                        style={{
                                            width: '100%',
                                            border: '1px solid #ccc', // Đường viền
                                            borderRadius: '5px', // Bo góc
                                        }}
                                        value={data.description}
                                        onChange={(value) => handleChange({ target: { name: 'description', value } })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel variant="h6" style={{ fontWeight: 'bold' }}>
                                        Yêu cầu ứng viên
                                    </InputLabel>
                                    <ReactQuill
                                        readOnly={operator === 'detail'} 
                                        theme="snow"
                                        placeholder="Yêu cầu ứng viên"
                                        style={{
                                            width: '100%',
                                            border: '1px solid #ccc', // Đường viền
                                            borderRadius: '5px', // Bo góc
                                        }}
                                        value={data.required}
                                        onChange={(value) => handleChange({ target: { name: 'required', value } })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputLabel variant="h6" style={{ fontWeight: 'bold' }}>
                                        Quyền lợi ứng viên
                                    </InputLabel>
                                    <ReactQuill
                                        readOnly={operator === 'detail'} 
                                        theme="snow"
                                        placeholder="Quyền lợi ứng viên"
                                        style={{
                                            width: '100%',
                                            marginTop: '15px',
                                            border: '1px solid #ccc', // Đường viền
                                            borderRadius: '5px', // Bo góc
                                        }}
                                        value={data.interest}
                                        onChange={(value) => handleChange({ target: { name: 'interest', value } })}
                                    />
                                </Grid>
                                
                            </Grid>

                            <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    {operator === 'update' ? (
                                        <Button variant="contained" color="primary" sx={{ flex: 2 }} onClick={handleSubmit}>
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Cập nhật'}
                                        </Button>
                                    ) : operator === 'create' ? (
                                        <Button variant="contained" color="primary" sx={{ flex: 2 }} onClick={handleSubmit}>
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng tin'}
                                        </Button>
                                    ) : null}
                                </Grid>
                                <Grid item>
                                    {(status !== 'NOT_APPROVED') && (operator !== 'create') && (
                                        <Button
                                            variant="contained"
                                            sx={{ flex: 1, backgroundColor: '#E10E0E', color: 'white', '&:hover': { backgroundColor: '#C00C0C' } }}
                                            onClick={() => {
                                                setMgsConfirm("Bạn có muốn hạ tin đăng không?");
                                                handleClickOpenConfirm();
                                            }}
                                        >
                                            Hạ tin
                                        </Button>
                                    )}

                                </Grid>

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        sx={{ flex: 1, backgroundColor: '#E10E0E', color: 'white', '&:hover': { backgroundColor: '#C00C0C' } }}
                                        onClick={() => navigate(-1)}
                                    >
                                        Hủy bỏ
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                            Quy định đăng tuyển
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <StarBorderIcon sx={{ fontSize: '1.5rem', color: 'gold' }} /> {/* Đặt màu vàng */}
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            Một chiến dịch chỉ có một bài đăng đang hiển thị
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <StarBorderIcon sx={{ fontSize: '1.5rem', color: 'gold' }} /> {/* Đặt màu vàng */}
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            Thông thường cần mất không quá 72h để nội dung tin tuyển dụng được kiểm duyệt trước khi hiển thị với ứng viên
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <StarBorderIcon sx={{ fontSize: '1.5rem', color: 'gold' }} /> {/* Đặt màu vàng */}
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            Nội dung bài đăng không được chứa các từ ngữ không phù hợp
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <PhoneOutlinedIcon sx={{ fontSize: '1.5rem', color: 'green' }} /> {/* Đặt màu xanh lá */}
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            (+84) 333 482 008
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="flex-start">
                                    <Grid item xs={11}>
                                        <Typography variant="body1">
                                            Nếu gặp bất kì vấn đề gì trong quá trình đăng tuyển, vui lòng liên hệ với chúng tôi để được hỗ trợ kịp thời
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={openConfirm}
                onClose={setOpenConfirm}
                title="Xác nhận"
                message={mgsConfirm}
                onConfirm={handleConfirm}
            />
        </Box>
    );
};

export default JobForm;
