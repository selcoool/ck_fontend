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


function ManageJob() {

    const {jobs} = useSelector((state) => state?.manageJob);
    const [editJobData, setEditJobData] = useState();
    const [detailJobData, setDetailJobData] = useState();
    const [jobData, setJobData] = useState([]);
    const [editImageData, setEditImageData] = useState();


    const [modalAddJob, setModalAddJob] = useState(false);
    const [modalEditJob, setModalEditJob] = useState(false);

    const [modalDetailJob, setModalDetailJob] = useState(false);

    const [openMenuImage,setOpenMenuImage]=useState(false)
  
  
    useEffect(() => {
      setJobData(jobs);
    }, [jobs]);
    
    const onSearchJob = (value) => {
      setJobData(jobs.filter(job => job.tenCongViec.toLowerCase().includes(value.toLowerCase())));

    };
  
   
  
    const dispatch=useDispatch();
  
    useEffect(() => {

     dispatch(getAllJobs())

     
     
    }, []);



    const handleDeleteJob=(value)=>{


      Modal.confirm({
        title:"Bạn thật sự muốn xóa công việc này ?",
        okText:"Đồng ý",
        okType:"danger",
        cancelText:"Hủy",
        onOk:()=>{
          dispatch(deleteAJob(value))
        }
      })
    }

   
  return (
    <div className='w-full h-full'>
    <div className='flex flex-col'>

   




<div className='flex justify-center items-center md:justify-start md:w-96 p-3'>
    <Search
   placeholder="Nhập thông tin công việc "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchJob}
 />

</div>

<div className='flex justify-center items-center pt-3 '>
   <Title className='flex text-center text-sm md:text-2xl'>QUẢN LÝ CÔNG VIỆC</Title>

</div>

<div className='px-3 pb-3 flex  gap-1 '>
<Button  size="large" className='bg-white' >Số công việc ({jobs ?jobs.length:0})</Button>
{JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
      <> 
  <Button size="large"  onClick={()=>setModalAddJob(!modalAddJob)} className='bg-green-500'>Thêm Công Việc</Button>
  <ModalAddJob visible={modalAddJob} setVisible={setModalAddJob}/>
  </>
):''}
</div>
    

  <div className='px-3 '>
  <Table
  rowKey={'id'}
scroll={{ x: 700, y: 550 }}
dataSource={jobData}
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
    title: 'Tên công việc',
    dataIndex: 'tenCongViec',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      let nameA=a.name.toLowerCase().trim();
      let nameB=b.name.toLowerCase().trim();
      if(nameA > nameB ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:100,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'hinhAnh',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    render: (text, hinhAnhData) => (
     
     
      <img src={hinhAnhData.hinhAnh} alt={hinhAnhData.tenCongViec} className='w-[100px] h-[100px] object-cover' onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}} />
    ),
    width:110,
  },
  {
   title: 'Mô tả',
   dataIndex: 'moTa',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, moTaData) => (
     
     <span>{text}</span>
    
   ),
   width:100,
 },
 {
   title: 'Giá tiền',
   dataIndex: 'giaTien',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, giaTienData) => (
 
        <span>{text}</span>

   ),
   width:90,

 },

 {
  title: 'Sao công việc',
  dataIndex: 'saoCongViec',
  ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
  render: (text, saoCongViecData) => (
    
    
    <Rate  value={saoCongViecData.saoCongViec}  disabled/>
   
  ),
  width:200,

},
 {
   title: 'Người tạo',
   dataIndex: 'nguoiTao',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, film) => (

     <span>{text}</span>
   
   ),
 
   width:60,
 },

 {
    title: 'Xem Chi Tiết',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    dataIndex: 'taiKhoan',
    render: (text,account) => (
   
        <Button onClick={()=>[setModalDetailJob(!modalDetailJob),setDetailJobData(account) ]} className='bg-blue-400'>Chi tiết</Button>
        
      
    ),
    width:130,
 
  },

  


 {
   title: 'Điều Chỉnh',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   dataIndex: 'tenCongViec',
   render: (text,tenCongViecData) => (


    JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (

        JSON.parse(localStorage.getItem('USER'))?.user.id === tenCongViecData?.nguoiTao ||  JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN"  ? (

          <div className='flex gap-2'>
     
          <MdDelete onClick={()=>handleDeleteJob(tenCongViecData)} className='text-2xl text-red-600 cursor-pointer'/>
          <FaEdit onClick={()=>[setModalEditJob(!modalEditJob),setEditJobData(tenCongViecData)]} className='text-2xl text-yellow-500 cursor-pointer'/>
         <FaRegImage onClick={()=>[setOpenMenuImage(!openMenuImage),setEditImageData(tenCongViecData)]} className='text-2xl text-emerald-300 cursor-pointer' />
          </div>


        ) :('Chỉ người thêm mới điều chỉnh được')
      

      
    ):('Chỉ đăng nhập mới điều chỉnh được')
  
     
       
     
   ),
   width:130,

 },
]}
pagination={false}
/>
<ModalDetailJob visible={modalDetailJob} data={detailJobData} setVisible={setModalDetailJob}/>
<ModalEditJob visible={modalEditJob} data={editJobData}  setVisible={setModalEditJob}/>
<ModalEditImageJob  isOpen={openMenuImage} setIsOpen={setOpenMenuImage} data={editImageData} />
  </div>

  </div>

 
 </div>
  )
}

export default ManageJob

