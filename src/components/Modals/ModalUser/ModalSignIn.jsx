
import React, { useRef, useState } from 'react';
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
} from 'antd';
import { useFormik } from 'formik';
import * as yup from "yup"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../../redux/userReducerSlice';
const { TextArea } = Input;
 



function ModalSignIn({ isOpen, setIsOpen}) {
    const [createSkillTag, setCreateSkillTag]=useState([])
    const [inputSkillValue, setInputSkillValue] = useState('');
  
    const [createCertificationTag, setCreateCertificationTag]=useState([])
    const [inputCertificationValue, setInputCertificationValue] = useState('');
      // console.log('modalCreateMovie',visible)
   
      const dispatch=useDispatch();
    
  
      const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        
        initialValues: {
        
          email: "",
          password: "",
  
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
  
  
                   await dispatch(signInUser({formData:values}))
                   resetForm();
                   setIsOpen(false)
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
  
  
    return (
      <div className='w-full h-full'>
      <Modal
       cancelButtonProps={{ style: { display: 'none' } }}
       okButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
        style={{top:'20%'}}
        okText="Thêm"
        cancelText="Hủy"
        onCancel={()=>{
            setIsOpen(false);
       
           
        }}
        onOk={() => { 
            setIsOpen(false);
  
        }}
      >
          <h1 className='text-2xl font-bold text-center pb-3'>Đăng Nhập Tài Khoản Người</h1>
          <Form
          onSubmitCapture={handleSubmit}
          
          layout="horizontal"
          
         
        >
        
          <Form.Item label="Email">
            <Input onChange={handleChange} onBlur={handleBlur} id='email' value={values.email} />
            {errors.email && touched.email ? (<div className='text-red-500 '>{errors.email}</div>) : ''}
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input type='password' onChange={handleChange} onBlur={handleBlur} id='password' value={values.password} />
            {errors.password && touched.password ? (<div className='text-red-500 '>{errors.password}</div>) : ''}
          </Form.Item>
  
          
          <Form.Item >
            <div className='flex justify-end gap-2'>
            <Button onClick={()=>  setIsOpen(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Đăng Nhập</button>
            </div>
             
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
}

export default ModalSignIn;