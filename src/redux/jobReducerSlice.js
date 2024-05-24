import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import {  toast } from 'react-toastify';



export const getAllJobs = createAsyncThunk(
  'jobs/getAllJobs',
  async (user, thunkAPI) => {
    try {

     
      let users = await http.get(`/api/cong-viec`);
      
    
      return users.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export const addAJob = createAsyncThunk(
  'jobs/addAJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {
      // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
      const users = await http.post(`/api/cong-viec`, user.formData);
      // Trả về dữ liệu từ response
      dispatch(getAllJobs())
  
      return users.data.content;
    } catch (error) {
      // Trả về một giá trị bị reject nếu có lỗi xảy ra
      return rejectWithValue({ error: error.message });
    }
  }
);




export const deleteAJob = createAsyncThunk(
  'users/deleteAJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {

     await http.delete(`/api/cong-viec/${user.id}`)
      dispatch(getAllJobs())
  
      return user.id;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editAJob = createAsyncThunk(
  'jobs/editAJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      // console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user.formData.id)
      const users = await http.put(`/api/cong-viec/${user.formData.id}`,user.formData)
      // console.log('RRRRRxxxxxxxxxxxxxeditAUser',users)
      // console.log('dddyyyyyyy',users)
      dispatch(getAllJobs())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editImageJob = createAsyncThunk(
  'jobs/editImageJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {
   
     
      const users = await http.post(`/api/cong-viec/upload-hinh-cong-viec/${user.id}`,user.formData)



      dispatch(getAllJobs())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error});

    }
  }
);








const initialState = {
  jobs:[],
  status:''
}

export const userSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // signOutUser: (state, action) => {
    //   state.signIn='';
    //   localStorage.removeItem('USER');
    //   toast.success('Bạn đã đăng xuất thành công !')

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.jobs = action.payload;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.status = 'rejected';
    });


    builder.addCase(addAJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addAJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.jobs.push(action.payload);
      toast.success('Bạn đã thêm công việc thành công !')

    });
    builder.addCase(addAJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã thêm công việc không thành công ! !')
    });


    builder.addCase(deleteAJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteAJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      toast.success('Bạn đã xóa thành công,do có thể bạn không phải người tạo, admin cũng không thể xóa !')
      // console.log('action.payloadccccccccccc',action.payload)
    });
    builder.addCase(deleteAJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn xóa thất bại !')
    });


    builder.addCase(editAJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editAJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
      state.jobs = state.jobs.map(job =>
        job.id === action.payload.id ? action.payload : job
        );
        toast.success('Bạn đã chỉnh sửa thành công !')
      // console.log("oiiiiiiiiii",action.payload)
    });
    builder.addCase(editAJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại,do có thể bạn không phải người tạo, admin cũng không thể chỉnh sửa!')
    });


    builder.addCase(editImageJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editImageJob.fulfilled, (state, action) => {


      state.status = 'fulfilled';
      // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
      state.jobs = state.jobs.map(job =>
        job.id === action.payload.id ? action.payload : job
        );
     
    
     
    });
    builder.addCase(editImageJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã cập nhật ảnh công việc thất bại,do có thể bạn không phải người tạo, admin cũng không thể chỉnh sửa ! !')
      
    });


  },
})

// Action creators are generated for each case reducer function
// export const {  } = userSlice.actions

export default userSlice.reducer