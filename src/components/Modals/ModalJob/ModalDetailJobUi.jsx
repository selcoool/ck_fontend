import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Form, Input, Button, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../../redux/jobReducerSlice';
import { addAComment, deleteAComment, getAllComments, getRelatedComments } from '../../../redux/commentReducerSlice';
import { useFormik } from 'formik';
import * as yup from "yup"
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import ModalEditComment from '../ModalComment.jsx/ModalEditComment';
const { TextArea } = Input;

function ModalDetailJobUi({ visible, setVisible, data }) {
  console.log("ModalDetailJobUi", data)

  const dispatch = useDispatch();
  const [modalEditComment, setModalEditComment] = useState(false);
  const [editCommentData, setEditCommentData] = useState();

  const { relatedComments } = useSelector((state) => state?.manageComment);
  const [commentData, setCommentData] = useState([]);

  const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      maCongViec: data?.id,
      maNguoiBinhLuan: localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER'))?.user?.id : 0,
      ngayBinhLuan: moment().format('DD/MM/YYYY'),
      noiDung: "",
      saoBinhLuan: 5


    },
    validationSchema: yup.object().shape({
      //     taiKhoan: yup.string().required("Vui lòng nhập tên tài khoản "),
      //     hoTen: yup.string().required("Vui lòng nhập họ và tên"),

      //     email: yup.string().required("Vui lòng nhập email"),
      //     soDt:yup.number().required("Vui lòng nhập số điện thoại"),

      //     matKhau:yup.string().required("Vui lòng nhập mật khẩu"),
      //    maNhom:yup.string().required("Vui lòng chọn mã nhóm"),
      //    maLoaiNguoiDung:yup.string().required("Vui lòng chọn mã loại người dùng"),

      //  File:yup.string().required("Vui lòng chọn file")



    }),
    onSubmit: async (values) => {
      try {

        console.log('onSubmitvaluesxxxxxxxxxx', values)



        let formData = new FormData();
        for (let key in values) {
          // console.log('values[key]',values[key])
          formData.append(key, values[key]);

        }


        await dispatch(addAComment({ formData: values }))

        //  getRelatedComments({jobId:data?.id})
        resetForm();
        //  setVisible(false)
        //  setImageData();


        //   fileInputRef.current.value = null;



      } catch (error) {
        console.log('error', error)
      }

    }
  });

  console.log('values', values)
  console.log('errors', errors)
  console.log('touched', touched);




  useEffect(() => {

    dispatch(getRelatedComments({ jobId: data?.id }))



  }, [data?.id]);


  const handleOnChangeCustom = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };



  const handleDeleteComment=(value)=>{
    // dispatch(deleteAMovie(value))

    console.log('xxxxxxxxxxxxx',value)

    Modal.confirm({
      title:"Bạn thật sự muốn xóa bình luận này ?",
      okText:"Đồng ý",
      okType:"danger",
      cancelText:"Hủy",
      onOk:()=>{
        dispatch(deleteAComment(value))
      }
    })
  }

  return (

    <div className='w-full h-full'>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}

        open={visible}
        style={{ top: 70 }}
        okText='Đóng'
        cancelText="Hủy"
        onCancel={() => {
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
              <img className='w-80 h-80 object-cover' src={data?.hinhAnh} alt={data?.hinhAnh}
                onError={(e) => { e.target.onError = null; e.target.src = 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg' }}
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
                <span className='font-bold' >Số sao công việc:</span><Rate value={data?.saoCongViec} disabled />

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

                      <div className='flex items-center gap-1'> <div><img className='w-10 h-10 rounded-full' src={comment.avatar ? comment.avatar : JSON.parse(localStorage.getItem('USER')).user.avatar} alt="" /></div>


                        <div className='flex flex-col'>
                          <div className='text-sm '> Ngày: {comment.ngayBinhLuan} </div>

                          <div className='flex items-center gap-1 cursor-pointer'>
                            <span className='text-lg' key={index} >{comment.tenNguoiBinhLuan}</span>
                            <MdDelete onClick={()=>handleDeleteComment(comment)}  className='text-red-500' />
                            <FaPencil onClick={()=>[setModalEditComment(!modalEditComment),setEditCommentData(comment)]}  className='text-cyan-500' />

                          </div>
                        </div>








                      </div>
                      <div className='flex items-center gap-1'> {comment.noiDung}</div>
                      <Rate className='text-sm'  value={comment.saoBinhLuan}  disabled/>

                    </div>

                  )
                })
              ) : (
                <span>Chưa có comment nào</span>
              )}

              {JSON.parse(localStorage.getItem('USER'))?.user.role === "USER" || JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN" ? (
                <>


                  <div>
                    <Form
                      onSubmitCapture={handleSubmit}

                      layout="horizontal"


                    >

                      <Form.Item >

                        <TextArea onChange={handleChange} onBlur={handleBlur} id='noiDung' value={values.noiDung} placeholder='Vui lòng gõ bình luận...' />

                        {errors.noiDung && touched.noiDung
                          ? (<div className='text-red-500 '>{errors.noiDung
                          }</div>) : ''}


                      </Form.Item>

                      <Form.Item label="Sao bình luận">
                        <Rate defaultValue={5} onChange={handleOnChangeCustom('saoBinhLuan')} id='saoBinhLuan' value={values.saoBinhLuan} />
                        {errors.saoBinhLuan && touched.saoBinhLuan ? (
                          <div className='text-red-500 '>{errors.saoBinhLuan}</div>
                        ) : ''}
                      </Form.Item>


                      <Form.Item >
                        <button type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Gửi bình luận</button>
                      </Form.Item>
                    </Form>
                  </div>

                </>
              ) : ''}


            </div>


          </div>




        </div>



        
      </Modal>

      <ModalEditComment  visible={modalEditComment} data={editCommentData}  setVisible={setModalEditComment}/>

     
    </div>
  )
}

export default ModalDetailJobUi