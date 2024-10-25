import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, CircularProgress } from '@mui/material';
import enterpriseApi from "../../api/EnterpriseApi";
import Notification from "../notification/Notification";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Để có style mặc định
import EnterpriseApi from "../../api/EnterpriseApi";
const InfoCompany = () => {
    const [loading, setLoading] = useState(false);
    const [listField, setListField] = useState([]);
    const [notification, setNotification] = React.useState({
        open: false,
        message: '',
        type: 'success'
    });
    const [companyInfo, setCompanyInfo] = useState({
        logo: '',
        companyName: '',
        tax: '',
        fieldOfActivity: '',
        address: '',
        phoneNumber: '',
        emailCompany: '',
        linkWebSite: '',
        scale: '',
        description: '',
    });

    useEffect(() => {
        enterpriseApi.getEnterprise().then((e) => {
            setCompanyInfo({
                logo: e.logo,
                companyName: e.companyName,
                tax: e.tax,
                fieldOfActivity: e.fieldOfActivity,
                address: e.address,
                phoneNumber: e.phoneNumber,
                emailCompany: e.emailCompany,
                linkWebSite: e.linkWebSite,
                scale: e.scale,
                description: e.description,
            })
        })
            .catch((e) => {
                console.log(e)
            })

        EnterpriseApi.getAllField().then((e) => {
            setListField(e)
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(companyInfo)
    };

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        EnterpriseApi.uploadFile(file).then((e) => {
            setCompanyInfo(
                {
                    ...companyInfo,
                    logo: e.url
                }
            )
        })
    };

    const handleSubmit = () => {
        setLoading(true)
        enterpriseApi.updateEnterprise(companyInfo).then((e) => {
            setCompanyInfo({
                logo: e.logo,
                companyName: e.companyName,
                tax: e.tax,
                fieldOfActivity: e.fieldOfActivity,
                address: e.address,
                phoneNumber: e.phoneNumber,
                emailCompany: e.emailCompany,
                linkWebSite: e.linkWebSite,
                scale: e.scale,
                description: e.description,
            })
            setNotification({
                open: true,
                message: "Cập nhật thông tin thành công",
                type: 'success'
            });
        })
            .catch((e) => {
                console.log(e);
                setNotification({
                    open: true,
                    message: e,
                    type: 'error'
                });
            })
            .finally(() => setLoading(false))
    };

    return (
        <div className="p-8 w-full mx-auto bg-white rounded-lg shadow-md">
            <Typography variant="h6" gutterBottom className="text-center">
                Cập nhật thông tin công ty
            </Typography>

            <div className="grid grid-cols-2 gap-4">
                {/* Logo */}
                <div className="flex flex-col items-center col-span-2">
                    <img
                        src={companyInfo.logo || 'https://via.placeholder.com/100'} // Placeholder image or company logo
                        alt="Logo"
                        className="w-20 h-20 object-cover rounded-full mb-4"
                    />
                    <Button variant="outlined" component="label">
                        Đổi logo
                        <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                    </Button>
                </div>

                {/* Company Name */}
                <TextField
                    label="Tên công ty"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />

                {/* Tax Code */}
                <TextField
                    label="Mã số thuế"
                    name="tax"
                    value={companyInfo.tax}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />

                {/* Business Field */}
                <TextField
                    label="Lĩnh vực hoạt động"
                    name="fieldOfActivity"
                    select
                    value={companyInfo.fieldOfActivity}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                >
                    {listField.map((e) => {
                        return <MenuItem key={e.index} value={e.name}>{e.name}</MenuItem>
                    })}
                </TextField>


                {/* Address */}
                <TextField
                    label="Địa chỉ"
                    name="address"
                    value={companyInfo.address}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />


                {/* Phone */}
                <TextField
                    label="Điện thoại"
                    name="phoneNumber"
                    value={companyInfo.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />

                <TextField
                    label="Email"
                    name="emailCompany"
                    value={companyInfo.emailCompany}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />
                {/* Website */}
                <TextField
                    label="Website"
                    name="linkWebSite"
                    value={companyInfo.linkWebSite}
                    onChange={handleChange}
                    fullWidth
                    className="col-span-1"
                />




                {/* Company Size */}
                <FormControl fullWidth className="col-span-1">
                    <InputLabel>Quy mô công ty</InputLabel>
                    <Select
                        label="Quy mô công ty"
                        name="scale"
                        value={companyInfo.scale}
                        onChange={handleChange}
                    >
                        <MenuItem value="1 - 24 nhân viên">1 - 24 nhân viên</MenuItem>
                        <MenuItem value="25 - 99 nhân viên">25 - 99 nhân viên</MenuItem>
                        <MenuItem value="100 - 499 nhân viên">100 - 499 nhân viên</MenuItem>
                        <MenuItem value="500+ nhân viên">500+ nhân viên</MenuItem>
                    </Select>
                </FormControl>

            </div>

            <ReactQuill
                theme="snow"
                style={{ width: '100%', marginTop: '15px' }}  // Đặt chiều rộng 100%
                value={companyInfo.description}
                onChange={(value) => handleChange({ target: { name: 'description', value } })}
            />
            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} color={"inherit"} /> : "Cập nhật thông tin"}
                </Button>
            </div>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
        </div>
    );
};

export default InfoCompany;
