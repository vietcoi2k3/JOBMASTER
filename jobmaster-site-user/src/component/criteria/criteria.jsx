import React, {useEffect, useState} from 'react';
import {
    Box, Typography, TextField, FormGroup,
    FormControlLabel, Radio, RadioGroup,
    Select, MenuItem, Button
} from '@mui/material';
import AuthApi from "../../api/AuthApi";
import Consumer from "../../api/Consumer";
import Notification from "../notification/Notification";

export default function Criteria() {
    const [location, setLocation] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [jobType, setJobType] = useState(''); // Loại công việc
    const [experience, setExperience] = useState(''); // Kinh nghiệm
    const [fieldSelect,setFieldSelect] = useState('')
    const [positionSelect,setPositionSelect] = useState('')
    const [notification, setNotification] = useState({ open: false, message: '', type: '' });
    const [field,setField] = useState([])
    const [position,setPosition] = useState([])
    const [city,setCity] = useState([])
    useEffect(() => {
        AuthApi.getAllField().then((e)=>{
            setField(e)
        })
        AuthApi.getAllPosition().then((e)=>{
            setPosition(e)
        })
        AuthApi.getAllCity().then((e)=>{
            setCity(e)
        })
        Consumer.getCriteria().then((e)=>{
            console.log(e)
            setLocation(e.city)
            setFieldSelect(e.field)
            setPositionSelect(e.position)
            setCompanySize(e.scales)
            setJobType(e.typeWorking)
            setExperience(e.experience)
        })
    }, []);

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };


    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleCompanySizeChange = (event) => setCompanySize(event.target.value);
    const handleJobTypeChange = (event) => setJobType(event.target.value);
    const handleExperienceChange = (event) => setExperience(event.target.value);

    const handleSubmit = () => {
        const formData = {
            city: location,
            scales: companySize,
            typeWorking :jobType,
            experience: experience,
            field: fieldSelect,
            position: positionSelect
        };
        Consumer.addCriteria(formData).then(() => {
            // Hiển thị thông báo thành công khi thêm thành công
            setNotification({
                open: true,
                message: 'Thêm thành công!',
                type: 'success',
            });
        }).catch(() => {
            // Hiển thị thông báo lỗi khi có lỗi xảy ra
            setNotification({
                open: true,
                message: 'Có lỗi xảy ra. Vui lòng thử lại!',
                type: 'error',
            });
        });
    };

    return  (
        <div className='p-20'>
            <Notification
                open={notification.open}
                onClose={handleCloseNotification}
                message={notification.message}
                type={notification.type}
            />
            {/* Header section */}
            <Box sx={{ bgcolor: '#e8edf2'}}>

            </Box>

            {/* Form container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    bgcolor: '#fff',
                    maxWidth: 700,
                    margin: 'auto',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Dropdown cho lĩnh vực */}
                <TextField
                    select
                    label="Lĩnh vực"
                    variant="outlined"
                    value={fieldSelect}
                    fullWidth
                    onChange={(e) => setFieldSelect(e.target.value)}
                >
                    {field.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Dropdown cho vị trí */}
                <TextField
                    select
                    label={"Chon vị trí"}
                    value={positionSelect}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPositionSelect(e.target.value)}
                >
                    {position.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Loại công việc */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Loại công việc
                </Typography>
                <RadioGroup value={jobType} onChange={handleJobTypeChange}>
                    <FormControlLabel value="Toàn thời gian" control={<Radio />} label="Toàn thời gian" />
                    <FormControlLabel value="Bán thời gian" control={<Radio />} label="Bán thời gian" />
                    <FormControlLabel value="Thực tập" control={<Radio />} label="Thực tập" />
                </RadioGroup>

                {/* Kinh nghiệm */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Kinh nghiệm
                </Typography>
                <RadioGroup row value={experience} onChange={handleExperienceChange}>
                    {["Chưa có kinh nghiệm", "Dưới 1 năm", "1 năm", "2 năm", "3 năm", "4 năm", "5 năm", "5 năm trở lên"].map((exp) => (
                        <FormControlLabel key={exp} value={exp} control={<Radio />} label={exp} />
                    ))}
                </RadioGroup>

                {/* Chọn địa điểm */}
                <TextField
                    select
                    label={location !== '' ? "Chọn địa điểm" :"Chọn địa điểm"}
                    value={location}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setLocation(e.target.value)}
                >
                    {city.map((item) => (
                        <MenuItem key={item.id} value={item.province_name}>
                            {item.province_name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Cấp bậc */}
                <TextField
                    label="Cấp bậc"
                    select
                    value={companySize}
                    onChange={handleCompanySizeChange}
                    fullWidth
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

                {/* Nút lưu */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ alignSelf: 'center', mt: 2, px: 4, py: 1 }}
                    onClick={handleSubmit}
                >
                    Lưu
                </Button>
            </Box>
        </div>
    );
}
