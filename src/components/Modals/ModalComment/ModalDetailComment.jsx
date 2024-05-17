import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Form, Input, Button, Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllJobs } from '../../../redux/jobReducerSlice';

function ModalDetailComment({ visible, setVisible, data }) {
    const dispatch = useDispatch();

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
                <h1 className='text-2xl  font-bold text-center pb-3'><span className='text-red-500'>{data?.maNguoiBinhLuan}</span>-[{data?.id}]</h1>
                <div className='flex flex-col gap-2'>

                    <div className='w-1/2  pb-2'>
                        <div >
                            <span className='font-bold'>Mã công việc: </span>{data?.
                                maCongViec}

                        </div>
                        <div >
                            <span className='font-bold'>Người bình luận: </span>{data?.
                                maNguoiBinhLuan}

                        </div>
                        <div >
                            <span className='font-bold'>Ngày bình luận: </span>  {data?.ngayBinhLuan}

                        </div>
                        <div>
                            <span className='font-bold' >Nội dung: </span>  {data?.noiDung}

                        </div>
                        <div className='flex items-center'>
                            <span className='font-bold' >Sao bình luận: </span><Rate value={data?.saoBinhLuan} disabled />

                        </div>






                    </div>

                </div>




            </Modal>
        </div>
    )
}

export default ModalDetailComment