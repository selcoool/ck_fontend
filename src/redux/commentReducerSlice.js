import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import { ToastContainer, toast } from 'react-toastify';


export const getRelatedComments = createAsyncThunk(
  'comments/getRelatedComments',
  async (user, thunkAPI) => {
    try {

     console.log('yyyyyyyyyyyy',user)
      let users = await http.get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${user.jobId}`);
      console.log('yyyyyyyyyyyy_user',users)
      
    
      return users.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export const addAComment = createAsyncThunk(
  'comments/addAComment',
  async (user, {dispatch,rejectWithValue}) => {
    try {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
      // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
      const users = await http.post(`/api/binh-luan`, user.formData);
      // Trả về dữ liệu từ response
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxusers',users)
      // dispatch(getRelatedComments())
      
      return users.data.content;
    } catch (error) {
      // Trả về một giá trị bị reject nếu có lỗi xảy ra
      return rejectWithValue({ error: error.message });
    }
  }
);




// export const deleteAJob = createAsyncThunk(
//   'users/deleteAJob',
//   async (user, {dispatch,rejectWithValue}) => {
//     try {
       
//       console.log('pppppppppppppppppcccc',user.id)
//       const users = await http.delete(`/api/cong-viec/${user.id}`)
//       dispatch(getAllJobs())
//         console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',users)
//       return user.id;

//     //   console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',users)


//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );



// export const editAJob = createAsyncThunk(
//   'jobs/editAJob',
//   async (user, {dispatch,rejectWithValue}) => {
//     try {

//       // console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user.formData.id)
//       const users = await http.put(`/api/cong-viec/${user.formData.id}`,user.formData)
//       // console.log('RRRRRxxxxxxxxxxxxxeditAUser',users)
//       // console.log('dddyyyyyyy',users)
//       dispatch(getAllJobs())
//       return users.data.content;



//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );



// export const editImageJob = createAsyncThunk(
//   'jobs/editImageJob',
//   async (user, {dispatch,rejectWithValue}) => {
//     try {
   
//       // console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user.formData)
//       const users = await http.post(`/api/cong-viec/upload-hinh-cong-viec/${user.id}`,user.formData)

//       // console.log('Avatar1',users)

//       dispatch(getAllJobs())
//       return users.data.content;



//     } catch (error) {
//       return rejectWithValue({ error});
//       // return rejectWithValue({ error: error.message });
//     }
//   }
// );






const initialState = {
  comments:'',
  relatedComments:'',
  status:''
}

export const userSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // signOutUser: (state, action) => {
    //   state.signIn='';
    //   localStorage.removeItem('USER');
    //   toast.success('Bạn đã đăng xuất thành công !')

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getRelatedComments.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getRelatedComments.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.relatedComments = action.payload;
    });
    builder.addCase(getRelatedComments.rejected, (state, action) => {
      state.status = 'rejected';
    });


    builder.addCase(addAComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addAComment.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.relatedComments.push(action.payload);
      toast.success('Bạn đã thêm công việc thành công !')

    });
    builder.addCase(addAComment.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã thêm công việc không thành công ! !')
    });


    // builder.addCase(deleteAJob.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(deleteAJob.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   state.jobs = state.jobs.filter(job => job.id !== action.payload);
    //   toast.success('Bạn đã xóa thành công !')
    //   // console.log('action.payloadccccccccccc',action.payload)
    // });
    // builder.addCase(deleteAJob.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   toast.error('Bạn xóa thất bại !')
    // });


    // builder.addCase(editAJob.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(editAJob.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
    //   state.jobs = state.jobs.map(job =>
    //     job.id === action.payload.id ? action.payload : job
    //     );
    //     toast.success('Bạn đã chỉnh sửa thành công !')
    //   // console.log("oiiiiiiiiii",action.payload)
    // });
    // builder.addCase(editAJob.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   toast.error('Bạn chỉnh sửa thất bại !')
    // });


    // builder.addCase(editImageJob.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(editImageJob.fulfilled, (state, action) => {


    //   state.status = 'fulfilled';
    //   // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
    //   state.jobs = state.jobs.map(job =>
    //     job.id === action.payload.id ? action.payload : job
    //     );
     
    
     
    // });
    // builder.addCase(editImageJob.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   toast.error('Bạn đã cập nhật ảnh công việc thất bại ! !')
    // });


    
    // builder.addCase(searchUsers.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(searchUsers.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   state.users = action.payload;
    // });
    // builder.addCase(searchUsers.rejected, (state, action) => {
    //   state.status = 'rejected';
    // });




    // builder.addCase(signUpUser.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(signUpUser.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   state.signUp=action.payload
    //   toast.success('Bạn đã đăng ký thành công !')
    // });
    // builder.addCase(signUpUser.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   toast.error('Bạn đăng ký không thành công !')
    // });


    // builder.addCase(signInUser.pending, (state) => {
    //   state.status = 'pending';
    // });
    // builder.addCase(signInUser.fulfilled, (state, action) => {
    //   state.status = 'fulfilled';
    //   state.signIn=action.payload;
    //   localStorage.setItem('USER',JSON.stringify(action.payload))
    //   toast.success('Bạn đã đăng nhập thành công !')
    //   // console.log('fulfilled tttttttttttttttttttttt',JSON.stringify(action.payload))
    // });
    // builder.addCase(signInUser.rejected, (state, action) => {
    //   state.status = 'rejected';
    //   toast.error('Bạn đã đăng nhập không thành công !')
    // });



  


  },
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions

export default userSlice.reducer