import {  Button, Modal, Select, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import {deleteAUser } from '../redux/apiUser';
import {  Rate } from 'antd'

import { deleteAJob, getAllJobs } from '../redux/jobReducerSlice';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";

import ModalDetailUser from './Modals/ModalUser/ModalDetailUser';
import ModalAddUser from './Modals/ModalUser/ModalAddUser';
import ModalEditUser from './Modals/ModalUser/ModalEditUser';
import ModalAddJob from './Modals/ModalJob/ModalAddJob';
import ModalDetailJob from './Modals/ModalJob/ModalDetailJob';
import ModalEditJob from './Modals/ModalJob/ModalEditJob';
import ModalEditImageJob from './Modals/ModalJob/ModalEditImageJob';
import { SiMalt } from 'react-icons/si';
import { deleteATypeJob, getAllTypeJobs } from '../redux/typeJobReducerSlice';
import ModalEditTypeJob from './Modals/ModalTypeJob/ModalEditTypeJob';
import ModalAddTypeJob from './Modals/ModalTypeJob/ModalAddTypeJob';
import { deleteARecruitJob, getAllRecruitJobs } from '../redux/recruitJobReducerSlice';
import ModalEditRecruitJob from './Modals/ModalRecruitJob/ModalEditRecruitJob';


function ManageRecruitJob() {

 
    const {recruitJobs} = useSelector((state) => state?.manageRecruitJob);

  
    const [editRecruitJobData, setEditRecruitJobData] = useState();
    const [detailRecruitJobData, setDetailRecruitJobData] = useState();
    const [recruitJobData, setRecruitJobData] = useState([]);



    const [modalAddRecruitJob, setModalAddRecruitJob] = useState(false);
    const [modalEditRecruitJob, setModalEditRecruitJob] = useState(false);

    const [modalDetailRecruitJob, setModalDetailRecruitJob] = useState(false);


  

   
    
  
    useEffect(() => {
      setRecruitJobData(recruitJobs);
    }, [recruitJobs]);
    
   
  
    const dispatch=useDispatch();
  
    useEffect(() => {

     dispatch(getAllRecruitJobs())

     
     
    }, []);


    // const handleChangeSelect = (value) => {
    //   // console.log(`selected ${value}`);
    //   setGroup(value)
    // };


    const handleDeleteRecruitJob=(value)=>{
      // dispatch(deleteAMovie(value))

      console.log('xxxxxxxxxxxxx',value)

      Modal.confirm({
        title:"Bạn thật sự muốn xóa thuê công việc này ?",
        okText:"Đồng ý",
        okType:"danger",
        cancelText:"Hủy",
        onOk:()=>{
          dispatch(deleteARecruitJob(value))
        }
      })
    }

   
  return (
    <div className='w-full h-full'>
    <div className='flex flex-col'>

   




{/* <div className='flex justify-center items-center md:justify-start md:w-96 p-3'>
    <Search
   placeholder="Nhập thông tin công việc "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchRecruitJob}
 />

</div> */}

<div className='flex justify-center items-center pt-3 '>
   <Title className='flex text-center text-sm md:text-2xl'>QUẢN LÝ THUÊ CÔNG VIỆC</Title>

</div>

<div className='px-3 pb-3 flex  gap-1 '>
<Button  size="large" className='bg-white' >Số thuê công việc ({recruitJobs ?recruitJobs.length:0})</Button>
{JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
      <> 
  {/* <Button size="large"  onClick={()=>setModalAddRecruitJob(!modalAddRecruitJob)} className='bg-green-500'>Thêm Loại Công Việc</Button> */}
  {/* <ModalAddTypeJob visible={modalAddRecruitJob} setVisible={setModalAddRecruitJob}/> */}
  </>
):''}
</div>
    

  <div className='px-3 '>
  <Table
  rowKey={'id'}
scroll={{ x: 700, y: 550 }}
dataSource={recruitJobData}
columns={[
  {
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      if(a > b ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:60,
  },
  {
    title: 'Mã Công Việc',
    dataIndex: 'maCongViec',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      let nameA=a.maCongViec.toLowerCase().trim();
      let nameB=b.maCongViec.toLowerCase().trim();
      if(nameA > nameB ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:100,
  },

  {
    title: 'Mã Người Thuê',
    dataIndex: 'maNguoiThue',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      let nameA=a.maNguoiThue.toLowerCase().trim();
      let nameB=b.maNguoiThue.toLowerCase().trim();
      if(nameA > nameB ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:100,
  },


  {
    title: 'Hoàn Thành',
    dataIndex: 'hoanThanh',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
   
    render: (text) => <div>{text ? (<span className="text-green-400">Hoàn Thành</span>) : (<span className="text-red-500">Chưa Hoàn Thành</span>)}</div>,
    width:100,
  },
  
  
 

 {
   title: 'Điều Chỉnh',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   dataIndex: 'maNguoiThue',
   render: (text,maNguoiThueData) => (


    JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (

        JSON.parse(localStorage.getItem('USER'))?.user.id === maNguoiThueData?.nguoiTao ||  JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN"  ? (

          <div className='flex gap-2  '>
     
          <MdDelete onClick={()=>handleDeleteRecruitJob(maNguoiThueData)} className='text-2xl text-red-600 cursor-pointer'/>
          <FaEdit onClick={()=>[setModalEditRecruitJob(!modalEditRecruitJob),setEditRecruitJobData(maNguoiThueData)]} className='text-2xl text-yellow-500 cursor-pointer'/>
        
          </div>


        ) :('Chỉ người thêm mới điều chỉnh được')
      

      
    ):('Chỉ đăng nhập mới điều chỉnh được')
  
     
       
     
   ),
   width:80,

 },
]}
pagination={false}
/>
<ModalEditRecruitJob visible={modalEditRecruitJob} data={editRecruitJobData}  setVisible={setModalEditRecruitJob}/>
  </div>

  </div>

 
 </div>
  )
}

export default ManageRecruitJob