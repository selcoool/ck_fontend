import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import { toast } from 'react-toastify';


export const getAllTypeJobs = createAsyncThunk(
  'typeJobs/getAllTypeJobs',
  async (user, thunkAPI) => {
    try {

     
      let users = await http.get(`/api/loai-cong-viec`);
      
    
      return users.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export const addATypeJob = createAsyncThunk(
  'typeJobs/addATypeJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {
   
      // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
      const users = await http.post(`/api/loai-cong-viec`, user.formData);
      // Trả về dữ liệu từ response
      // dispatch(getAllJobs())
      return users.data.content;
    } catch (error) {
      // Trả về một giá trị bị reject nếu có lỗi xảy ra
      return rejectWithValue({ error: error.message });
    }
  }
);




export const deleteATypeJob = createAsyncThunk(
  'typeJobs/deleteATypeJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {   
      await http.delete(`/api/loai-cong-viec/${user.id}`)
      return user.id;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editATypeJob = createAsyncThunk(
  'typeJobs/editATypeJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      const users = await http.put(`/api/loai-cong-viec/${user.formData.id}`,user.formData)
 
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);




const initialState = {
  typeJobs:[],
  status:''
}

export const typeJobSlice = createSlice({
  name: 'typeJobs',
  initialState,
  reducers: {
    // signOutUser: (state, action) => {
    //   state.signIn='';
    //   localStorage.removeItem('USER');
    //   toast.success('Bạn đã đăng xuất thành công !')

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTypeJobs.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllTypeJobs.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.typeJobs = action.payload;
    });
    builder.addCase(getAllTypeJobs.rejected, (state, action) => {
      state.status = 'rejected';
    });


    builder.addCase(addATypeJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addATypeJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.typeJobs.push(action.payload);
      toast.success('Bạn đã thêm công việc thành công !')

    });
    builder.addCase(addATypeJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã thêm công việc không thành công ! !')
    });


    builder.addCase(deleteATypeJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteATypeJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.typeJobs = state.typeJobs.filter(typeJob => typeJob.id !== action.payload);
      toast.success('Bạn đã xóa thành công !')
     
    });
    builder.addCase(deleteATypeJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn xóa thất bại !')
    });


    builder.addCase(editATypeJob.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editATypeJob.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.typeJobs = state.typeJobs.map(typeJob =>
        typeJob.id === action.payload.id ? action.payload : typeJob
        );
        toast.success('Bạn đã chỉnh sửa thành công !')
   
    });
    builder.addCase(editATypeJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại !')
    });


  

  },
})


// export const {  } = typeJobSlice.actions

export default typeJobSlice.reducer