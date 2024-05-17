
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
const { TextArea } = Input;


function ModalEditJob({visible,setVisible,data}) {


    
 
    const dispatch=useDispatch();
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        enableReinitialize:true,
        initialValues: {
        id: data?.id,
        tenCongViec: data?.tenCongViec,
        danhGia: data?.danhGia,
        giaTien: data?.giaTien,
        nguoiTao: data?.nguoiTao,
        hinhAnh: data?.hinhAnh,
        moTa: data?.moTa,
        maChiTietLoaiCongViec: data?.maChiTietLoaiCongViec,
        moTaNgan: data?.moTaNgan,
        saoCongViec: data?.saoCongViec
       

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


                 await dispatch(editAJob({formData:values}))
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



     const [createSkillTag, setCreateSkillTag] = useState(data?.skill || []);
  const [inputSkillValue, setInputSkillValue] = useState('');
  const [createCertificationTag, setCreateCertificationTag] = useState(data?.certification || []);
  const [inputCertificationValue, setInputCertificationValue] = useState('');


 

  useEffect(() => {
    setCreateSkillTag(data?.skill || []);
    setCreateCertificationTag(data?.certification || []);
  }, [data]);

  const handleCloseSkill = (removedTag) => {
        const newTags = createSkillTag.filter((tag) => tag !== removedTag);
        console.log("newTags", newTags);
        setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
        setCreateSkillTag(newTags); // Cập nhật state createSkillTag
      };

 
      
      const handleSkill = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const tagValue = e.target.value.trim();
          if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
            const newTags = [...createSkillTag, tagValue];
            console.log('Enter key pressed', newTags);
            setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
            setCreateSkillTag(newTags); // Cập nhật state createSkillTag
            e.target.value = '';
            setInputSkillValue('');
          }
        }
        if (e.type === 'blur') {
          const tagValue = e.target.value.trim();
          if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
            const newTags = [...createSkillTag, tagValue];
            console.log('Mouse left input', newTags);
            setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
            setCreateSkillTag(newTags); // Cập nhật state createSkillTag
            e.target.value = '';
            setInputSkillValue('');
          }
        }
      };

//   const handleCloseCertification = (removedTag) => {
//     const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
//     setCreateCertificationTag(newTags);
//   };

    const handleCloseCertification = (removedTag) => {
        const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
        console.log("newTags", newTags);
        setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
        setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
      };
      
      const handleCertification = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const tagValue = e.target.value.trim();
          if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
            const newTags = [...createCertificationTag, tagValue];
            console.log('Enter key pressed', newTags);
            setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
            setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
            e.target.value = '';
            setInputCertificationValue('');
          }
        }
        if (e.type === 'blur') {
          const tagValue = e.target.value.trim();
          if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
            const newTags = [...createCertificationTag, tagValue];
            console.log('Mouse left input', newTags);
            setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
            setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
            e.target.value = '';
            setInputCertificationValue('');
          }
        }
      };



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
        <h1 className='text-2xl font-bold text-center pb-3'>Cập Nhật Công Việc</h1>
        <Form
        onSubmitCapture={handleSubmit}
        
        layout="horizontal"
        
       
      >
      
        <Form.Item  label="Tên công việc">
        
          <Input  onChange={handleChange} onBlur={handleBlur} id='tenCongViec' value={values.tenCongViec} />
          
         
          {errors.tenCongViec && touched.tenCongViec ? (<div className='text-red-500 '>{errors.tenCongViec}</div>) : ''}
          
        </Form.Item>
        <Form.Item label="Giá tiền">
          <Input onChange={handleChange} onBlur={handleBlur} id='giaTien' value={values.giaTien} />
          {errors.giaTien && touched.giaTien ? (<div className='text-red-500 '>{errors.giaTien}</div>) : ''}
        </Form.Item>
       



        <Form.Item label="Mô tả">
          <TextArea onChange={handleChange} onBlur={handleBlur} id='moTa' value={values.moTa} />
          {errors.moTa && touched.moTa ? (<div className='text-red-500 '>{errors.moTa}</div>) : ''}
        </Form.Item>

        <Form.Item label="Mô tả ngắn">
          <TextArea onChange={handleChange} onBlur={handleBlur} id='moTaNgan' value={values.moTaNgan} />
          {errors.moTaNgan && touched.moTaNgan ? (<div className='text-red-500 '>{errors.moTaNgan}</div>) : ''}
        </Form.Item>


        <Form.Item label="Mã chi tiết loại công việc">
          <Input onChange={handleChange} onBlur={handleBlur} id='moTaNgan' value={values.maChiTietLoaiCongViec} />
          {errors.maChiTietLoaiCongViec && touched.maChiTietLoaiCongViec ? (<div className='text-red-500 '>{errors.maChiTietLoaiCongViec}</div>) : ''}
        </Form.Item>





          
        <Form.Item label="Sao công việc">
        <Rate defaultValue={5}  onChange={handleOnChangeCustom('saoCongViec')}  id='saoCongViec' value={values.saoCongViec} defaultValue={5} />
  {errors.saoCongViec && touched.saoCongViec ? (
    <div className='text-red-500 '>{errors.saoCongViec}</div>
  ) : ''}
</Form.Item>











        <Form.Item >
            <Button onClick={()=>  setVisible(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Cập Nhật Công Việc</button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default ModalEditJob



