
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
import { useDispatch, useSelector } from 'react-redux';
import { addAUser } from '../../../redux/userReducerSlice';
import { addAJob } from '../../../redux/jobReducerSlice';
import { addATypeJob, getAllTypeJobs } from '../../../redux/typeJobReducerSlice';
const { TextArea } = Input;

  


function ModalAddTypeJob({visible,setVisible}) {

     const dispatch=useDispatch();

  const [createSkillTag, setCreateSkillTag]=useState([])
  const [inputSkillValue, setInputSkillValue] = useState('');

  const [createCertificationTag, setCreateCertificationTag]=useState([])
  const [inputCertificationValue, setInputCertificationValue] = useState('');

    const {typeJobs} = useSelector((state) => state?.manageTypeJob);
    const [typeJobData, setTypeJobData] = useState([]);


 
 

    useEffect(() => {
      setTypeJobData(typeJobs);
    }, [typeJobs]);


    useEffect(() => {

      dispatch(getAllTypeJobs())
     
     }, []);
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
      
      initialValues: {
        tenLoaiCongViec: "",
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


                 await dispatch(addATypeJob({formData:values}))
                 resetForm();
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

      // console.log('handleChangeDatePicker', moment('2024-04-30T00:00:00', 'DD/MM/YYYY'));
      // console.log('handleChangeDatePicker', moment(date.d).format('DD/MM/YYYY'));
      setFieldValue('birthday', dateString); // Update form value
    };

    

    // const handleChangeDatePicker = (value) => {
    //   // console.log('dateString', dateString);

    //   console.log("value_date", moment(value.selectedDate).format('DD/MM/YYYY'));
    // };

    const handleOnChangeCustom = (name) => {
      return (value) => {
        setFieldValue(name, value);
      };
    };

 const handleGenderOnChangeCustom=(name)=>{
  //  console.log('dddđ')
   return (event)=>{
    setFieldValue(name,event.target.value)
   }
 }

 const handleCloseSkill = (removedTag) => {
  const newTags = createSkillTag.filter((tag) => tag !== removedTag);
  setFieldValue('skill',newTags);
  setCreateSkillTag(newTags);
};





 const handleSkill = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
    if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
      setCreateSkillTag((prevTags) => {

        const newTags = [...prevTags, tagValue];
        setFieldValue('skill',newTags);
        // Log giá trị mới của createTag
        return newTags; // Trả về mảng mới
      });
      e.target.value = ''; // Đặt giá trị của input về rỗng
      setInputSkillValue('')
    }
  }
  if (e.type === 'blur') {
    const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
    if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
      setCreateSkillTag((prevTags) => {
        const newTags = [...prevTags, tagValue];
        setFieldValue('skill',newTags); // Log giá trị mới của createTag
        return newTags; // Trả về mảng mới
      });
      e.target.value = ''; // Đặt giá trị của input về rỗng
      setInputSkillValue('')
    }
  }
};



const handleCloseCertification = (removedTag) => {
  const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
  setFieldValue('certification',newTags);
  setCreateCertificationTag(newTags);
};


const handleCertification = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
    if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
      setCreateCertificationTag((prevTags) => {

        const newTags = [...prevTags, tagValue];
        setFieldValue('certification',newTags);
        // Log giá trị mới của createTag
        return newTags; // Trả về mảng mới
      });
      e.target.value = ''; // Đặt giá trị của input về rỗng
      setInputCertificationValue('')
    }
  }
  if (e.type === 'blur') {
    const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
    if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
      setCreateCertificationTag((prevTags) => {
        const newTags = [...prevTags, tagValue];
        setFieldValue('certification',newTags); // Log giá trị mới của createTag
        return newTags; // Trả về mảng mới
      });
      e.target.value = ''; // Đặt giá trị của input về rỗng
      setInputCertificationValue('')
    }
  }
};



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
        setVisible(false);
        setCreateSkillTag('')
        setInputSkillValue('')
        setCreateCertificationTag('')
        setInputCertificationValue('')
         
      }}
      onOk={() => { 
        setVisible(false);
        setInputSkillValue('')
      }}
    >
        <h1 className='text-2xl font-bold text-center pb-3'>Thêm Loại Công Việc Mới</h1>
        <Form
        onSubmitCapture={handleSubmit}
        
        layout="horizontal"
        
       
      >
      
        <Form.Item  label="Tên loại công việc">
        
          <Input  onChange={handleChange} onBlur={handleBlur} id='tenLoaiCongViec' value={values.tenLoaiCongViec} />
          
         
          {errors.tenLoaiCongViec && touched.tenLoaiCongViec ? (<div className='text-red-500 '>{errors.tenLoaiCongViec}</div>) : ''}

        </Form.Item>
     

        <Form.Item >
            <Button onClick={()=>  setVisible(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Thêm Loại Công Việc</button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default ModalAddTypeJob