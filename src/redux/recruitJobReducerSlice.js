import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import { toast } from 'react-toastify';


export const getAllRecruitJobs = createAsyncThunk(
  'recruitJobs/getAllRecruitJobs',
  async (user, thunkAPI) => {
    try {

     
      let users = await http.get(`/api/thue-cong-viec`);
      
    
      return users.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export const addARecruitJob = createAsyncThunk(
  'recruitJobs/addARecruitJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {
  
      // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
      const users = await http.post(`/api/thue-cong-viec`, user.formData);
      // Trả về dữ liệu từ response
      // dispatch(getAllJobs())
   
      return users.data.content;
    } catch (error) {
      // Trả về một giá trị bị reject nếu có lỗi xảy ra
      return rejectWithValue({ error: error.message });
    }
  }
);




export const deleteARecruitJob = createAsyncThunk(
  'recruitJobs/deleteARecruitJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {
       

      await http.delete(`/api/thue-cong-viec/${user.id}`)
      // dispatch(getAllJobs())

      return user.id;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editARecruitJob = createAsyncThunk(
  'recruitJobs/editARecruitJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      // console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user.formData.id)
      const users = await http.put(`/api/thue-cong-viec/${user.formData.id}`,user.formData)
    //   console.log('RRRRRxxxxxxxxxxxxxeditAUser',users)
      // console.log('dddyyyyyyy',users)
      // dispatch(getAllJobs())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);







const initialState = {
  recruitJobs:[],

  status:''
}

export const recruitJobSlice = createSlice({
  name: 'recruitJobs',
  initialState,
  reducers: {
    // signOutUser: (state, action) => {
    //   state.signIn='';
    //   localStorage.removeItem('USER');
    //   toast.success('Bạn đã đăng xuất thành công !')

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRecruitJobs.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllRecruitJobs.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.recruitJobs = action.payload;
    });
    builder.addCase(getAllRecruitJobs.rejected, (state, action) => {
      state.status = 'rejected';
    });


    builder.addCase(addARecruitJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addARecruitJob.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      state.recruitJobs.push(action.payload);
      toast.success('Bạn đã thuê công việc thành công !')

    });
    builder.addCase(addARecruitJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã thêm công việc không thành công ! !')
    });


    builder.addCase(deleteARecruitJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteARecruitJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.recruitJobs = state.recruitJobs.filter(typeJob => typeJob.id !== action.payload);
      toast.success('Bạn đã xóa thành công !')
      // console.log('action.payloadccccccccccc',action.payload)
    });
    builder.addCase(deleteARecruitJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn xóa thất bại !')
    });


    builder.addCase(editARecruitJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editARecruitJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
      state.recruitJobs = state.recruitJobs.map(recruitJob =>
        recruitJob.id === action.payload.id ? action.payload : recruitJob
        );
        toast.success('Bạn đã chỉnh sửa thành công !')
      // console.log("oiiiiiiiiii",action.payload)
    });
    builder.addCase(editARecruitJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại !')
    });


   


  


  },
})

// Action creators are generated for each case reducer function
// export const {  } = recruitJobSlice.actions

export default recruitJobSlice.reducer