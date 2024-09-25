import React, {useEffect, useState} from 'react';
import {
    Box, TextField, Select, MenuItem, Typography, Button, Grid, Paper, CircularProgress
} from '@mui/material';
import Province from "../../api/Province";
import Notification from "../notification/Notification";
import EnterpriseApi from "../../api/EnterpriseApi";
import {useLocation} from "react-router-dom";


const JobForm = () => {
    const [listCity,setListCity] = useState([])
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '',type:'' });
    const [listCampaign,setListCampaign] = useState([])
    const [listPosition,setListPosition] = useState([])
    const [listField,setListField] =useState([])
    const [pageNumber,setPagenumber] = useState(1)
    const location = useLocation();
    const [data,setData] = useState({
        title:"",
        field:"",
        position:"",
        deadline:null,
        quantity:0,
        city:"",
        district:"",
        typeWorking:"",
        level:"",
        experience:"",
        gender:"",
        timeWorking:"",
        description:"",
        required:"",
        interest:"",
        requiredSkill:"",
        skillShouldHave:"",
        campaignId:"",
        salaryRange:""
    })

    useEffect(()=>{
       EnterpriseApi.getAllPosition().then((e)=>{
           setListPosition(e)
       })
       EnterpriseApi.getAllField().then((e)=>{
           setListField(e)
       })
    },[])


    useEffect(()=>{
        EnterpriseApi.getListCampaign(pageNumber).then((e)=>setListCampaign(e.content))
    },[pageNumber])
    const handleSubmit = ()=>{
        setLoading(true)
        EnterpriseApi.addPost(data)
            .then(()=>{
                setNotification({
                    open: true,
                    message: "Thêm thành công",
                    type: "success"
                })
                setData({
                    title:"",
                    campaign:"",
                    field:"",
                    position: "",
                    deadline:null,
                    quantity:0,
                    city:"",
                    district:"",
                    typeWorking:"",
                    level:"",
                    experience:"",
                    gender:"",
                    timeWorking:"",
                    description:"",
                    required:"",
                    interest:"",
                    requiredSkill:"",
                    skillShouldHave:"",
                    campaignId:"",
                    salaryRange:""
                })
            })
            .catch(()=>
                setNotification({
                    open: true,
                    message: "Thêm không thành công",
                    type: "error"
                }))
            .finally(()=>setLoading(false))

    }

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const getProvince = () => {

        return Province.getProvince().then(response => setListCity(response.results));
    };
    return (
        <Box sx={{ padding: 2 }}>
             <Notification
                open={notification.open}
                onClose={()=>setNotification({open: false})}
                message={notification.message}
                type={notification.type}
            />
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Thông tin chung
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tiêu đề tin"
                            onChange={handleChange}
                            inputProps={{ maxLength: 50 }}
                            value={data.title}
                            name="title"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Chiến dịch tuyển dụng"
                            select
                            fullWidth
                            required
                            onChange={(e) => {
                                const selectedCampaign = listCampaign.find(campaign => campaign.name === e.target.value);
                                setData({
                                    ...data,
                                    campaignId: selectedCampaign?.id || null // kiểm tra nếu không tìm thấy
                                });
                            }}
                            value={data.campaignId ? listCampaign.find(campaign => campaign.id === data.campaignId)?.name : ''}
                        >
                            {listCampaign.map((campaign, index) => (
                                <MenuItem key={index} value={campaign.name}>
                                    {campaign.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Vị trí"
                            select
                            fullWidth
                            required
                            value={data.position}
                            name ="position"
                            onChange={handleChange}
                        >
                            {listPosition.map((e)=>{
                                return <MenuItem key={e.index} value={e.name}>{e.name}</MenuItem>
                            })}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Lĩnh vực"
                            select
                            fullWidth
                            required
                            value={data.field}
                            name ="field"
                            onChange={handleChange}
                        >
                            {listField.map((e)=>{
                                return <MenuItem key={e.index} value={e.name}>{e.name}</MenuItem>
                            })}
                        </TextField>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Hạn nộp hồ sơ"
                            type="date"
                            name="deadline"
                            value={data.deadline}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Số lượng" type="number" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Chọn tỉnh/Thành phố"
                            select
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            onClick={getProvince} // Gọi API khi click vào Select
                        >
                            {listCity.map((e) => (
                                <MenuItem  key={e.province_id} value={e.province_name} >
                                    {e.province_name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Typography variant="h6" gutterBottom sx={{width:'100%'}}>
                        Yêu cầu chung
                    </Typography>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Loại công việc"
                            select
                            fullWidth
                            required
                            value={data.typeWorking}
                            name ="typeWorking"
                            onChange={handleChange}
                        >
                            <MenuItem value="Toàn thời gian">Toàn thời gian</MenuItem>
                            <MenuItem value="Bán thời gian">Bán thời gian</MenuItem>
                            <MenuItem value="Thực tập">Thực tập</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Cấp bậc"
                            select
                            fullWidth
                            required
                            value={data.level}
                            name ="level"
                            onChange={handleChange}
                        >
                            <MenuItem value="Nhân viên">   Nhân viên</MenuItem>
                            <MenuItem value="Trưởng nhóm"> Trưởng nhóm</MenuItem>
                            <MenuItem value="Trưởng/ Phó phòng"> Trưởng/ Phó phòng</MenuItem>
                            <MenuItem value="Trưởng chi nhánh"> Trưởng chi nhánh</MenuItem>
                            <MenuItem value="Quản lý/ Giám sát"> Quản lý/ Giám sát</MenuItem>
                            <MenuItem value="Phó giám đốc"> Phó giám đốc</MenuItem>
                            <MenuItem value="Giám đốc"> Giám đốc</MenuItem>
                            <MenuItem value="Thực tập sinh"> Thực tập sinh</MenuItem>

                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Kinh nghiệm"
                            select
                            fullWidth
                            required
                            value={data.experience}
                            name ="experience"
                            onChange={handleChange}
                        >
                            <MenuItem value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</MenuItem>
                            <MenuItem value="Dưới 1 năm">Dưới 1 năm</MenuItem>
                            <MenuItem value="1 năm">1 năm</MenuItem>
                            <MenuItem value="2 năm">2 năm</MenuItem>
                            <MenuItem value="3 năm">3 năm</MenuItem>
                            <MenuItem value="4 năm">4 năm</MenuItem>
                            <MenuItem value="5 năm"> 5 năm</MenuItem>
                            <MenuItem value="Trên 5 năm">Trên 5 năm</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Khoảng lương"
                            name="salaryRange"
                            value={data.salaryRange || "Thỏa thuận"}  // Giá trị mặc định là "Thỏa thuận"
                            onChange={handleChange}
                            placeholder="Ví dụ: 10 triệu - 20 triệu"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Giới tính"
                            select
                            value={data.gender}
                            fullWidth
                            required
                            name ="gender"
                            onChange={handleChange}
                        >
                            <MenuItem value="Nam">Nam</MenuItem>
                            <MenuItem value="Nữ">Nữ</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={data.timeWorking}
                            onChange={handleChange}
                            label="Thời gian làm việc"
                            name="timeWorking"
                        />
                    </Grid>

                    <Typography variant="h6" gutterBottom>
                        Thông tin chi tiết
                    </Typography>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mô tả công việc"
                            multiline
                            value={data.description}
                            onChange={handleChange}
                            name="description"
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Yêu cầu ứng viên"
                            multiline
                            value={data.required}
                            name="required"
                            onChange={handleChange}
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Quyền lợi ứng viên"
                            multiline
                            value={data.interest}
                            name="interest"
                            onChange={handleChange}
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kỹ năng cần có"
                            name="requiredSkill"
                            multiline
                            value={data.requiredSkill}
                            onChange={handleChange}
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kỹ năng nên có"
                            multiline
                            value={data.skillShouldHave}
                            onChange={handleChange}
                            name="skillShouldHave"
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" sx={{float:'right'}} onClick={handleSubmit}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng tin'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default JobForm;
