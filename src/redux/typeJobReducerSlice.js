import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import { ToastContainer, toast } from 'react-toastify';


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
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
      // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
      const users = await http.post(`/api/loai-cong-viec`, user.formData);
      // Trả về dữ liệu từ response
      // dispatch(getAllJobs())
      console.log('RRRRRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',users)
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
       
      console.log('pppppppppppppppppcccc',user.id)
      const users = await http.delete(`/api/loai-cong-viec/${user.id}`)
      // dispatch(getAllJobs())
        console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',users)
      return user.id;

    //   console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',users)


    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editATypeJob = createAsyncThunk(
  'typeJobs/editATypeJob',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      // console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user.formData.id)
      const users = await http.put(`/api/loai-cong-viec/${user.formData.id}`,user.formData)
      // console.log('RRRRRxxxxxxxxxxxxxeditAUser',users)
      // console.log('dddyyyyyyy',users)
      // dispatch(getAllJobs())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



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



// export const searchUsers = createAsyncThunk(
//   'users/searchUsers',
//   async (user, {dispatch,rejectWithValue}) => {
//     try {

//       console.log('dddaaaaaaaaaaaaaaaaaaaaaaaaa',await user)
//       const users = await http.get(`/api/users/search/${user.searchUser}`)

//       // console.log('dddyyyyyyy',users)

//       // dispatch(getAllUsers())
//       return users.data.content;



//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );


// export const signUpUser = createAsyncThunk(
//   'users/signUpUser',
//   async (user, thunkAPI) => {
//     try {
//       // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
//       // Gửi request POST đến endpoint `/QuanLyNguoiDung/ThemNguoiDung` với formData của user
//       const users = await http.post(`/QuanLyNguoiDung/DangKy`, user.formData);
//       // Trả về dữ liệu từ response
//       // console.log('RRRRRxxxxxxxxxxx signUpUser',users)
//       return users.data.content;
//     } catch (error) {
//       // Trả về một giá trị bị reject nếu có lỗi xảy ra
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );



// export const signInUser = createAsyncThunk(
//   'users/signInUser',
//   async (user, thunkAPI) => {
    
//     try {

//       // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
//       const users = await http.post(`/QuanLyNguoiDung/DangNhap`,user.formData)

//       // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxTTTT',users.data.content)
//       return users.data.content;



//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );


// let user ='';
// if(localStorage.getItem('USER')){
//   user =JSON.parse(localStorage.getItem('USER'))
// }
// console.log('lllllllllllllllllllllllll',JSON.parse(localStorage.getItem('USER')).accessToken)




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
      // console.log('action.payloadccccccccccc',action.payload)
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
      // state.movies = state.movies.filter(movie => movie.maPhim !== action.payload);
      state.typeJobs = state.typeJobs.map(typeJob =>
        typeJob.id === action.payload.id ? action.payload : typeJob
        );
        toast.success('Bạn đã chỉnh sửa thành công !')
      // console.log("oiiiiiiiiii",action.payload)
    });
    builder.addCase(editATypeJob.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại !')
    });


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
export const {  } = typeJobSlice.actions

export default typeJobSlice.reducer