import React, {useEffect, useState} from 'react';
import {
    Box, Typography, TextField, FormGroup,
    FormControlLabel, Radio, RadioGroup,
    Select, MenuItem, Button
} from '@mui/material';
import AuthApi from "../../api/AuthApi";

export default function Criteria() {
    const [location, setLocation] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [jobType, setJobType] = useState(''); // Loại công việc
    const [experience, setExperience] = useState(''); // Kinh nghiệm
    const [fieldSelect,setFieldSelect] = useState(null)
    const [positionSelect,setPositionSelect] = useState(null)

    const [field,setField] = useState([])
    const [position,setPosition] = useState([])

    useEffect(() => {
        AuthApi.getAllField().then((e)=>{
            setField(e)
        })
        AuthApi.getAllPosition().then((e)=>{
            setPosition(e)
        })
    }, []);

    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleCompanySizeChange = (event) => setCompanySize(event.target.value);
    const handleJobTypeChange = (event) => setJobType(event.target.value);
    const handleExperienceChange = (event) => setExperience(event.target.value);

    const handleSubmit = () => {
        const formData = {
            location,
            companySize,
            jobType,
            experience,
            fieldSelect,
            positionSelect
        };
        console.log('Thông tin form:', formData);
    };

    return (
        <div>
            <Box sx={{ bgcolor: '#e8edf2', padding: '20px 0' }}>
                <Typography variant="h5" sx={{ textAlign: 'center', bgcolor: '#ffffff' }}>
                    Tiêu chí tìm việc
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: '#ffffff',
                    maxWidth: 600,
                    margin: 'auto',
                    padding: 4,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                }}
            >
                {/* Dropdown cho lĩnh vực */}
                <TextField
                    select
                    label="Lĩnh vực"
                    variant="outlined"
                    onChange={(e) =>  setFieldSelect(e.target.value)}
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
                    label="Vị trí"
                    variant="outlined"
                    onChange={(e)=>setPositionSelect(e.target.value)}
                >
                    {position.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Loại công việc */}
                <Typography variant="subtitle1">Loại công việc</Typography>
                <RadioGroup value={jobType} onChange={handleJobTypeChange}>
                    <FormControlLabel value="Toàn thời gian" control={<Radio />} label="Toàn thời gian" />
                    <FormControlLabel value="Bán thời gian" control={<Radio />} label="Bán thời gian" />
                    <FormControlLabel value="Thực tập" control={<Radio />} label="Thực tập" />
                </RadioGroup>

                {/* Kinh nghiệm */}
                <Typography variant="subtitle1">Kinh nghiệm</Typography>
                <RadioGroup row value={experience} onChange={handleExperienceChange}>
                    <FormControlLabel value="Chưa có kinh nghiệm" control={<Radio />} label="Chưa có kinh nghiệm" />
                    <FormControlLabel value="Dưới 1 năm" control={<Radio />} label="Dưới 1 năm" />
                    <FormControlLabel value="1 năm" control={<Radio />} label="1 năm" />
                    <FormControlLabel value="2 năm" control={<Radio />} label="2 năm" />
                    <FormControlLabel value="3 năm" control={<Radio />} label="3 năm" />
                    <FormControlLabel value="4 năm" control={<Radio />} label="4 năm" />
                    <FormControlLabel value="5 năm" control={<Radio />} label="5 năm" />
                    <FormControlLabel value="5 năm trở lên" control={<Radio />} label="5 năm trở lên" />
                </RadioGroup>

                <TextField
                    select
                    label="Chọn địa điểm"
                    variant="outlined"
                    onChange={(e)=>setPositionSelect(e.target.value)}
                >
                    {position.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </TextField>
                {/* Quy mô công ty */}
                <TextField
                    label="Cấp bậc"

                    select value={companySize} onChange={handleCompanySizeChange} displayEmpty fullWidth >
                    <MenuItem value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</MenuItem>
                    <MenuItem value="Dưới 1 năm">Dưới 1 năm</MenuItem>
                    <MenuItem value="1 năm">1 năm</MenuItem>
                    <MenuItem value="2 năm">2 năm</MenuItem>
                    <MenuItem value="3 năm">3 năm</MenuItem>
                    <MenuItem value="4 năm">4 năm</MenuItem>
                    <MenuItem value="5 năm"> 5 năm</MenuItem>
                    <MenuItem value="Trên 5 năm">Trên 5 năm</MenuItem>
                </TextField>

                {/* Nút lưu */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ alignSelf: 'center' }}
                    onClick={handleSubmit}
                >
                    Lưu
                </Button>
            </Box>
        </div>
    );
}
