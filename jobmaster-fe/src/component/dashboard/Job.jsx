
import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Switch ,Pagination} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import RecruitmentPopup from "../share/RecruitmentPopup ";
import EnterpriseApi from "../../api/EnterpriseApi";
import EventNoteIcon from '@mui/icons-material/EventNote';
import {useNavigate} from "react-router-dom";

const   Job = () => {
    const [data,setData] =useState([])
    const [reload, setReload] = useState(false); // Trạng thái để reload component
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber]=useState(1)
    const navigate = useNavigate()
    const handleReload = () => {
        getList()
        setReload(!reload); // Thay đổi trạng thái để trigger re-render
    };
    useEffect(()=>{
        getList()
    },[pageNumber])


    const getList=()=>{
        EnterpriseApi.getListCampaign(pageNumber)
            .then((e)=>{
                setData(e.content)
                setTotalPage(e.totalPages)
            })
            .catch()
            .finally()
    }
  return (
      <div className="w-full">
        <TextField
            label="Nhập tên chiến dịch"
            variant="outlined"
            fullWidth
            margin="normal"
            sx ={{backgroundColor:'#ffffff'}}
        />
      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:'bold'}}>Chiến dịch tuyển dụng</TableCell>
              <TableCell  sx={{fontWeight:'bold'}}>Vị trí</TableCell>
              <TableCell  sx={{fontWeight:'bold'}}>Tin tuyển dụng</TableCell>
              <TableCell  sx={{fontWeight:'bold'}}>Số lượng CV</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((campaign,index) => (
                <TableRow key={index}>
                  <TableCell  sx={{fontWeight:'bold',}}>{campaign.name}</TableCell>
                  <TableCell>{campaign.position}</TableCell>
                  <TableCell>
                    {campaign.field}<br />
                  </TableCell>
                  <TableCell >{campaign.quantity}</TableCell>
                  <TableCell>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <Switch checked={true} />
                      <IconButton  disabled={!(campaign.postId===null)} onClick={()=>{let id = campaign.id;
                          navigate("/dashboard/job-form",{state:{id}})}}>
                          <EventNoteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <RecruitmentPopup  onSuccess={handleReload}/>

      </TableContainer>
          <Pagination
              onChange={(event,page)=>{
                  setPageNumber(page)
              }}
              page={pageNumber}
              count={totalPage}
              color="primary"

              sx={{
                  width: '100%',
                  backgroundColor:'#ffff',
                  marginTop:1,
                  '& .MuiPagination-ul': {
                      // Tùy chỉnh cho danh sách phần tử phân trang
                      justifyContent:'center'
                  },
                  '&.Mui-selected:disabled': {
                      backgroundColor: '#e0e0e0', // Màu nền khi nút phân trang đang được chọn và bị vô hiệu hóa
                      color: '#b0b0b0', // Màu chữ khi nút bị vô hiệu hóa
                      cursor: 'default', // Con trỏ chuột khi hover vào nút bị vô hiệu hóa
                  }
              }}
          />
      </div>
  );
}

export default Job