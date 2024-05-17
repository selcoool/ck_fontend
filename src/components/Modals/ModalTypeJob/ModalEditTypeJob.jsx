
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
const { TextArea } = Input;


function ModalEditTypeJob({visible,setVisible,data}) {

    
    console.log('ModalEditTypeJob',data)
//     const [createSkillTag, setCreateSkillTag]=useState([])
//     const [inputSkillValue, setInputSkillValue] = useState('');
//     const [inputEditSkillValue, setInputEditSkillValue] = useState([]);


//     const [createCertificationTag, setCreateCertificationTag]=useState([])
//   const [inputCertificationValue, setInputCertificationValue] = useState('');
    // console.log('createSkillTag',createSkillTag)

    
  
  
    
 
    const dispatch=useDispatch();
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        enableReinitialize:true,
        initialValues: {
        id: data?.id,
        tenLoaiCongViec: data?.tenLoaiCongViec
        ,
       
       

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

                 console.log('onSubmitvaluesxxxxxxxxxx',values)
                  let formData = new FormData();
                  for (let key in values){
                    // console.log('values[key]',values[key])
                        formData.append(key,values[key]);
                    
                  }


                 await dispatch(editATypeJob({formData:values}))
                //  resetForm();
                   setVisible(false)
                //  setImageData();
                
               
                //   fileInputRef.current.value = null;
                

          
         } catch (error) {
              console.log('error',error)
         }
                  
      }
    });
  
    console.log('values', values)
    console.log('errors', errors)
    console.log('touched', touched);



    

 

  
 
      

    const handleChangeDatePicker = (date, dateString) => {

      // console.log('handleChangeDatePicker', moment('2024-04-30T00:00:00', 'DD/MM/YYYY'));
      // console.log('handleChangeDatePicker', moment(date.d).format('DD/MM/YYYY'));
      setFieldValue('birthday', dateString); // Update form value
    };

    

    // const handleChangeDatePicker = (value) => {
    //   // console.log('dateString', dateString);

    //   console.log("value_date", moment(value.selectedDate).format('DD/MM/YYYY'));
    // };

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

     
        <h1 className='text-2xl font-bold text-center pb-3'>Cập Nhật Loại Công Việc</h1>
        <Form
                      onSubmitCapture={handleSubmit}

                      layout="horizontal"


                    >
                   

                    
                   <Form.Item  label="Tên loại công việc">
        
        <Input  onChange={handleChange} onBlur={handleBlur} id='tenLoaiCongViec' value={values.tenLoaiCongViec} />
        
       
        {errors.tenLoaiCongViec && touched.tenLoaiCongViec ? (<div className='text-red-500 '>{errors.tenLoaiCongViec}</div>) : ''}
        
      </Form.Item>



                     

            

                      <Form.Item >
                        <button type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Chỉnh sửa loại công việc</button>
                      </Form.Item>
                    </Form>
    </Modal>
    </div>
  )
}

export default ModalEditTypeJob



