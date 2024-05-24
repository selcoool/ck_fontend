
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  
  Rate,
} from 'antd';
import { useFormik } from 'formik';
import * as yup from "yup"
import { useDispatch } from 'react-redux';

import { getAllJobs } from '../../../redux/jobReducerSlice';
import { editAComment} from '../../../redux/commentReducerSlice';
const { TextArea } = Input;


function ModalEditComment({ visible, setVisible, data }) {

  const dispatch = useDispatch();


  const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data?.id,
      maCongViec: data?.maCongViec,
      maNguoiBinhLuan: data?.maNguoiBinhLuan,
      ngayBinhLuan: data?.ngayBinhLuan,
      noiDung: data?.noiDung,
      saoBinhLuan: data?.saoBinhLuan


    },
    validationSchema: yup.object().shape({
      noiDung: yup.string().required("Vui lòng nhập nội dung bình luận"),



    }),
    onSubmit: async (values) => {
      try {


        let formData = new FormData();
        for (let key in values) {

          formData.append(key, values[key]);

        }


        await dispatch(editAComment({ formData: values }))

        setVisible(false)




      } catch (error) {
  
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




  const handleOnChangeCustom = (name) => {
    return (value) => {
      setFieldValue(name, value)
    }
  }





  return (
    <div className='w-full h-full'>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        open={visible}
        style={{ top: 20 }}
        okText="Thêm"
        cancelText="Hủy"
        onCancel={() => {
          setVisible(false)
          dispatch(getAllJobs())

          // setInputSkillValue('')
        }}
        onOk={() => {
          setVisible(false)
          // setInputSkillValue('')
        }}
      >


        <h1 className='text-2xl font-bold text-center pb-3'>Cập Nhật Bình Luận</h1>
        <Form
          onSubmitCapture={handleSubmit}

          layout="horizontal"


        >




          <Form.Item >
            <TextArea onChange={handleChange} onBlur={handleBlur} id='noiDung' value={values.noiDung} placeholder='Vui lòng gõ bình luận...' />
            {errors.noiDung && touched.noiDung ? (<div className='text-red-500 '>{errors.noiDung}</div>) : ''}
          </Form.Item>

          {/* <Form.Item label="Sao bình luận">
                        <Rate defaultValue={5} onChange={handleOnChangeCustom('saoBinhLuan')} id='saoBinhLuan' value={values.saoBinhLuan} />
                        {errors.saoBinhLuan && touched.saoBinhLuan ? (
                          <div className='text-red-500 '>{errors.saoBinhLuan}</div>
                        ) : ''}
                      </Form.Item> */}


          <Form.Item label="Sao bình luận">
            <Rate defaultValue={5} onChange={handleOnChangeCustom('saoBinhLuan')} id='saoBinhLuan' value={values.saoBinhLuan} defaultValue={5} />
            {errors.saoBinhLuan && touched.saoBinhLuan ? (
              <div className='text-red-500 '>{errors.saoBinhLuan}</div>
            ) : ''}
          </Form.Item>

          <Form.Item >
            <button type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Chỉnh sửa bình luận</button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalEditComment



