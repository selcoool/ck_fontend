import { Button, Modal, Select, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import {deleteAUser } from '../redux/apiUser';
import { Rate } from 'antd'

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
import { deleteAComment, getAllComments } from '../redux/commentReducerSlice';
import ModalDetailComment from './Modals/ModalComment/ModalDetailComment';
import ModalEditComment from './Modals/ModalComment/ModalEditComment';
// import ModalEditMovie from './ModalEditMovie';
// import ModalEditUser from './ModalEditUser';

function ManageComment() {


  const { comments } = useSelector((state) => state?.manageComment);

  const [editCommentData, setEditCommentData] = useState();
  const [detailCommentData, setDetailCommentData] = useState();
  const [commentData, setCommentData] = useState([]);



  const [modalAddComment, setModalAddComment] = useState(false);
  const [modalEditComment, setModalEditComment] = useState(false);

  const [modalDetailComment, setModalDetailComment] = useState(false);


  useEffect(() => {
    setCommentData(comments);
  }, [comments]);

  const onSearchComment = (value) => {
    setCommentData(comments.filter(comment => comment.noiDung.toLowerCase().includes(value.toLowerCase())));

  };



  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAllComments())



  }, []);




  const handleDeleteComment = (value) => {
    

    Modal.confirm({
      title: "Bạn thật sự muốn xóa bình luận này ?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(deleteAComment(value))
      }
    })
  }


  return (
    <div className='w-full h-full'>
      <div className='flex flex-col'>






        <div className='flex justify-center items-center md:justify-start md:w-96 p-3'>
          <Search
            placeholder="Nhập thông tin bình luận "
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={onSearchComment}
          />

        </div>

        <div className='flex justify-center items-center pt-3 '>
          <Title className='flex text-center text-sm md:text-2xl'>QUẢN LÝ BÌNH LUẬN</Title>

        </div>

        <div className='px-3 pb-3 flex  gap-1 '>
          <Button size="large" className='bg-white' >Số bình luận ({comments ? comments.length : 0})</Button>
        </div>


        <div className='px-3 '>
          <Table
            rowKey={'id'}
            scroll={{ x: 700, y: 550 }}
            dataSource={commentData}
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                defaultSortOrder: 'ascend',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => {
                  if (a > b) {
                    return 1;
                  }
                  return -1;
                },

                render: (text) => <span>{text}</span>,
                width: 60,
              },
              {
                title: 'Mã công việc',
                dataIndex: 'maCongViec',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                defaultSortOrder: 'ascend',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => {
                  let nameA = a.maCongViec.toLowerCase().trim();
                  let nameB = b.maCongViec.toLowerCase().trim();
                  if (nameA > nameB) {
                    return 1;
                  }
                  return -1;
                },

                render: (text) => <span>{text}</span>,
                width: 100,
              },
              {
                title: 'Mã người bình luận',
                dataIndex: 'maNguoiBinhLuan',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                render: (text, moTaData) => (

                  <span>{text}</span>

                ),
                width: 100,
              },
              {
                title: 'Ngày bình luận',
                dataIndex: 'ngayBinhLuan',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                render: (text, giaTienData) => (

                  <span>{text}</span>


                ),
                width: 90,

              },

              {
                title: 'Sao bình luận',
                dataIndex: 'saoBinhLuan',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                render: (text, saoBinhLuanData) => (


                  <Rate value={saoBinhLuanData.saoBinhLuan} disabled />

                ),
                width: 200,

              },
              {
                title: 'Nội dung',
                dataIndex: 'noiDung',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                render: (text, film) => (

                  <span>{text}</span>

                ),

                width: 120,
              },

              {
                title: 'Xem Chi Tiết',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                dataIndex: 'taiKhoan',
                render: (text, account) => (

                  <Button onClick={() => [setModalDetailComment(!modalDetailComment), setDetailCommentData(account)]} className='bg-blue-400'>Chi tiết</Button>


                ),
                width: 130,

              },




              {
                title: 'Điều Chỉnh',
                ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
                dataIndex: 'tenCongViec',
                render: (text, tenCongViecData) => (


                  JSON.parse(localStorage.getItem('USER'))?.user.role === "USER" || JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN" ? (

                    JSON.parse(localStorage.getItem('USER'))?.user.id === tenCongViecData?.nguoiTao || JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN" ? (

                      <div className='flex gap-2'>

                        <MdDelete onClick={() => handleDeleteComment(tenCongViecData)} className='text-2xl text-red-600 cursor-pointer' />
                        <FaEdit onClick={() => [setModalEditComment(!modalEditComment), setEditCommentData(tenCongViecData)]} className='text-2xl text-yellow-500 cursor-pointer' />
                      </div>


                    ) : ('Chỉ người thêm mới điều chỉnh được')



                  ) : ('Chỉ đăng nhập mới điều chỉnh được')




                ),
                width: 130,

              },
            ]}
            pagination={false}
          />
          <ModalDetailComment visible={modalDetailComment} data={detailCommentData} setVisible={setModalDetailComment} />
          <ModalEditComment visible={modalEditComment} data={editCommentData} setVisible={setModalEditComment} />

        </div>

      </div>


    </div>
  )
}

export default ManageComment