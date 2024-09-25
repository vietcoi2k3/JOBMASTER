import React, {useEffect, useState} from "react";
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
    TextField, Button
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import EnterpriseApi from "../../api/EnterpriseApi";

const jobPosts = [
    { id: "#1693750", campaign: "Tuyển dụng tháng 5", position: "Tester", viewCount: 5, status: "Dừng hiển thị", isVisible: true },
    { id: "#1693749", campaign: "Tuyển dụng tháng 4", position: "Business Analyst", viewCount: 4, status: "Dừng hiển thị", isVisible: true },
    { id: "#1693748", campaign: "Tuyển dụng tháng 4", position: "Business Analyst", viewCount: 2, status: "Dừng hiển thị", isVisible: true },
    { id: "#1693740", campaign: "Tuyển dụng tháng 4", position: "Business Analyst", viewCount: 6, status: "Dừng hiển thị", isVisible: false },
];

export default function ManagePost() {

    const [post,setPost] = useState([])
    const [index,setIndex] =useState(1)
    useEffect(() => {
        EnterpriseApi.getListPost(index)
            .then((e)=>
            {
                setPost(e.data)
            })
            .catch()
            .finally()
    }, []);

    const navigate = useNavigate()
    return (
        <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-xl font-semibold">Tin đăng tuyển</h1>
                <button className="bg-primary text-accent py-2 px-4 rounded border-sidebar">+ Thêm tin tuyển dụng</button>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <TextField
                    label="Nhập tên chiến dịch"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx ={{backgroundColor:'#ffffff'}}
                />
            </div>

            <TableContainer sx={{backgroundColor:"#ffffff"}} className="border-s-accent rounded ">
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell  sx={{fontWeight:'bold'}}>Tin tuyển dụng</TableCell>

                            <TableCell  sx={{fontWeight:'bold'}}>Vị trí</TableCell>
                            <TableCell  sx={{fontWeight:'bold'}}>Chiến dịch tuyển dụng</TableCell>
                            <TableCell  sx={{fontWeight:'bold'}}>Số lượng CV</TableCell>
                            <TableCell  sx={{fontWeight:'bold'}}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {post.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    <div className="">{post.title}</div>
                                    {/*<div className="text-error">{post.status}</div>*/}
                                </TableCell>
                                <TableCell>{post.position}</TableCell>

                                <TableCell>
                                    {/*<div className="text-blue-500">{post.id}</div>*/}
                                    <div>{post.nameCam}</div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={()=>[
                                        navigate("/dashboard/view-cv")
                                    ]}>
                                        Xem {post.viewCount} CV
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Xem tin">
                                        <IconButton>
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Chỉnh sửa">
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Switch checked={post.isVisible} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
