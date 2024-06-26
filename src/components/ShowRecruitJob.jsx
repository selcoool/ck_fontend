import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { Button, Modal } from 'antd';
import { deleteARecruitJob, getAllRecruitJobs } from '../redux/recruitJobReducerSlice';
import ModalEditRecruitJob from './Modals/ModalRecruitJob/ModalEditRecruitJob';
import ModalDetailRecruitJob from './Modals/ModalRecruitJob/ModalDetailRecruitJob';
import Footer from './Footer';


function ShowRecruitJob() {
    const dispatch=useDispatch();

    const {recruitJobs} = useSelector((state) => state?.manageRecruitJob);
      
    const [recruitJobData, setRecruitJobData] = useState([]);
    
    const [editRecruitJobData, setEditRecruitJobData] = useState();
    const [detailRecruitJobData, setDetailRecruitJobData] = useState();
     const [modalEditRecruitJob, setModalEditRecruitJob] = useState(false);
     const [modalDetailRecruitJob, setModalDetailRecruitJob] = useState(false);

    useEffect(() => {
        const userId = JSON.parse(localStorage?.getItem('USER'))?.user.id;
        const filteredJobs = recruitJobs.filter((recruitJob) => recruitJob.maNguoiThue === userId);
        setRecruitJobData(filteredJobs);
      }, [recruitJobs, JSON.parse(localStorage?.getItem('USER'))?.user.id]);
      
      // Effect to fetch all recruit jobs
      useEffect(() => {
        dispatch(getAllRecruitJobs());
      }, []);

      const handleDeleteRecruitJob=(value)=>{
  
  
  
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
    <div className='bg-orange-100 w-full h-full md:min-h-screen'>
    <div className='px-4 bg-orange-100'>


      
<div className='flex justify-center items-start md:justify-start flex-col md:flex-row py-3 gap-1'>

 

<div className='flex gap-1 '>

<Button  size="large" className='bg-white' >Số công việc thuê ({recruitJobData ?recruitJobData.length:0})</Button> 

</div>

</div>

        
    <div className='bg-orange-100  w-full flex flex-col   h-full lg:max-h-[650px] overflow-y-auto no-scrollbar'>
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 '>

    {recruitJobData.length > 0 && Array.isArray(recruitJobData) ? (
    [...recruitJobData]?.reverse().map((recruitJob) => (
        <div key={recruitJob?.id} className=' overflow-hidden cursor-pointer group'>
            
            <div className='flex gap-1   flex-col p-3 bg-background_02 bg-cover  transition-all duration-100 '>
                <div className='bg-gray-800/60 flex flex-col'>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.maNguoiThue}</h1>
                </div>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.maCongViec}</h1>
                </div>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.ngayThue}</h1>
                </div>
               
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob.hoanThanh ? (<div className='text-green-500'>Đã hoàn thành</div>) : (<div className='text-red-500'>Chưa hoàn thành</div>)}</h1>
                </div>
                

              <div className=' flex justify-center items-center'>
                   <div  className='p-2 bg-sky-500 rounded-l-full'><FaEdit onClick={()=>[setModalEditRecruitJob(!modalEditRecruitJob),setEditRecruitJobData(recruitJob)]}/></div>

                   <div  className='p-2 bg-orange-500'><IoIosInformationCircleOutline onClick={()=>[setModalDetailRecruitJob(!modalDetailRecruitJob),setDetailRecruitJobData(recruitJob)]}/></div>
                   <div  className='p-2 bg-red-500 rounded-r-full'><MdDelete onClick={()=>handleDeleteRecruitJob(recruitJob)}/></div>

              </div>
              </div>
             
            </div>
        </div>
    ))
 ) : (

  <div className='flex justify-center items-start w-full h-screen '>
  
    <div >Không tìm thấy việc đã thuê</div>
  </div>
  
  )}



 
    </div>






    </div>


    </div>
    <ModalDetailRecruitJob visible={modalDetailRecruitJob} data={detailRecruitJobData}  setVisible={setModalDetailRecruitJob}/>
    <ModalEditRecruitJob visible={modalEditRecruitJob} data={editRecruitJobData}  setVisible={setModalEditRecruitJob}/>


  </div>
  )
}

export default ShowRecruitJob
