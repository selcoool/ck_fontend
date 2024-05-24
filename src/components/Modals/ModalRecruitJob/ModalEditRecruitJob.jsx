
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Tag,
  Rate,
} from 'antd';
import { useFormik } from 'formik';
import * as yup from "yup"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addAUser, editAUser, getAllUsers } from '../../../redux/userReducerSlice';
import { editAJob, getAllJobs } from '../../../redux/jobReducerSlice';
import { editAComment, editARelatedComment } from '../../../redux/commentReducerSlice';
import { deleteATypeJob, editATypeJob } from '../../../redux/typeJobReducerSlice';
import { editARecruitJob } from '../../../redux/recruitJobReducerSlice';
const { TextArea } = Input;


function ModalEditRecruitJob({visible,setVisible,data}) {

    

    
 
    const dispatch=useDispatch();
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        enableReinitialize:true,
        initialValues: {
        id: data?.id,
        maCongViec:data?.maCongViec,
        maNguoiThue:data?.maNguoiThue,
        ngayThue: data?.ngayThue,
        hoanThanh:data?.hoanThanh
       
       

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
      onSubmit: async(values) => {
         try {

  
                  let formData = new FormData();
                  for (let key in values){

                        formData.append(key,values[key]);
                    
                  }


                 await dispatch(editARecruitJob({formData:values}))
                //  resetForm();
                   setVisible(false)
                //  setImageData();
                
               
                //   fileInputRef.current.value = null;
                

          
         } catch (error) {
              // console.log('error',error)
         }
                  
      }
    });
  
    // console.log('values', values)
    // console.log('errors', errors)
    // console.log('touched', touched);



    

 

  
 
      

    const handleChangeDatePicker = (date, dateString) => {

  
      setFieldValue('birthday', dateString); // Update form value
    };

    


 const handleOnChangeCustom=(name)=>{
   return (value)=>{
    setFieldValue(name,value)
   }
 }

 const handleGenderOnChangeCustom=(name)=>{
  //  console.log('dddđ')
   return (event)=>{
    setFieldValue(name,event.target.value)
   }
 }




  return (
    <div className='w-full h-full'>
    <Modal
     cancelButtonProps={{ style: { display: 'none' } }}
     okButtonProps={{ style: { display: 'none' } }}
      open={visible}
      style={{top:20}}
      okText="Thêm"
      cancelText="Hủy"
      onCancel={()=>{
        setVisible(false)
        dispatch(getAllJobs())

        // setInputSkillValue('')
      }}
      onOk={() => { 
        setVisible(false)
        // setInputSkillValue('')
      }}
    >

     
        <h1 className='text-2xl font-bold text-center pb-3'>Cập Nhật Thuê Công Việc</h1>
        <Form
                      onSubmitCapture={handleSubmit}

                      layout="horizontal"


                    >


       


<Form.Item label="Trạng thái">
  <Select
    style={{width:180}}
    onBlur={handleBlur}
    value={values.hoanThanh}
    onChange={handleOnChangeCustom('hoanThanh')} id='hoanThanh'
  >
     <Select.Option value={true}  >Hoàn Thành</Select.Option>
    <Select.Option  value={false} >Chưa Hoàn Thành</Select.Option>
   
   
  </Select>
  {errors.role && touched.role ? (<div className='text-red-500 '>{errors.role}</div>) : ''}
</Form.Item>


<Form.Item >
                        <button type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Cập nhật thuê công việc</button>
                      </Form.Item>
                    </Form>
    </Modal>
    </div>
  )
}

export default ModalEditRecruitJob



