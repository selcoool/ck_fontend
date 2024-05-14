import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Form, Input, Button, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../../redux/jobReducerSlice';
import { getAllComments, getRelatedComments } from '../../../redux/commentReducerSlice';

function ModalDetailJobUi({visible,setVisible,data}) {
  console.log("ModalDetailJobUi",data)

  const dispatch=useDispatch();


  const {relatedComments} = useSelector((state) => state?.manageComment);
const [commentData, setCommentData] = useState([]);

console.log("commentData9999999999999",relatedComments)
// useEffect(() => {
//     if (comments && Array.isArray(comments)) {
//       const comment_user = comments.filter((comment) => comment.maNguoiBinhLuan === data?.maCongViec);
//       setCommentData(comment_user);
//     }
//   }, [comments, data?.maCongViec]);

  
  useEffect(() => {

   dispatch(getRelatedComments({jobId:data?.id}))

   
   
  }, [data?.id]);

  return (
   
    <div className='w-full h-full'>
    <Modal
     cancelButtonProps={{ style: { display: 'none' } }}
 
      open={visible}
      style={{top: 70 }}
      okText='Đóng'
      cancelText="Hủy"
      onCancel={()=>{
        setVisible(false)
        dispatch(getAllJobs())
      }}
      onOk={() => {
        setVisible(false)
      }}
    >
        <h1 className='text-2xl  font-bold text-center pb-3'><span className='text-red-500'>{data?.tenCongViec}</span></h1>
        <div className='flex flex-col'>

      
        <div className='flex gap-2'>
          <div className='w-1/2 flex justify-center items-center'>
            <img  className='w-80 h-80 object-cover' src={data?.hinhAnh} alt={data?.hinhAnh}
             onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}}
            ></img>

          </div>
          <div className='w-1/2 pb-2'>
            <div >
           <span className='font-bold'>Tên công việc [{data?.
maChiTietLoaiCongViec}]:</span> {data?.tenCongViec}
         
            </div>
            <div >
           <span className='font-bold'>Giá tiền:</span>  {data?.giaTien}
            
            </div>
            <div>
           <span className='font-bold' >Đánh giá:</span>  {data?.danhGia}
        
            </div>
            <div>
           <span className='font-bold' >Số sao công việc:</span><Rate value={data?.saoCongViec}  disabled/>
            
            </div>
      
         
          

  

          </div>

        </div>

        <div className='w-full h-full'>
        <h1 className='font-bold py-3'>Bình luận</h1>

       <div className='flex flex-col gap-2'>


      

        {relatedComments?.length > 0 && Array.isArray(relatedComments) ? (
               relatedComments.map((comment, index) => {
                    return (
                        <div className='flex flex-col'>
                      
                        <div className='flex items-center gap-1'> <div><img className='w-10 h-10 rounded-full' src={comment.avatar} alt="" /></div> 
                        
                        
                        <div className='flex flex-col'>
                        <div className='text-sm '> Ngày: {comment.ngayBinhLuan} </div>
                        <span className='text-lg' key={index} >{comment.tenNguoiBinhLuan}</span>
                            
                        </div>
                        
                        
                        </div>
                        <div className='flex items-center gap-1'> {comment.noiDung}</div>
                        
                        </div>
                       
                    )
                })
                ) : (
                <span>Chưa có comment nào</span>
                )}


     </div>


        </div>




        </div>

    

     
    </Modal>
    </div>
  )
}

export default ModalDetailJobUi