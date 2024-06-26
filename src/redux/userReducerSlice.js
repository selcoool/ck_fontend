import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { http } from "../services/config_service"

import { toast } from 'react-toastify';




export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (user, thunkAPI) => {
    try {

      let users;
      if (typeof user?.searchUser === 'undefined' || user?.searchUser.trim() === '') {
        users = await http.get(`/api/users`);
    } else {
          users = await http.get(`/api/users/search/${user?.searchUser}`)
      
    }
      return users.data.content;


      // let users = await http.get(`/api/users`);
      
    
      // return users.data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export const addAUser = createAsyncThunk(
  'users/addAUser',
  async (user, {dispatch,rejectWithValue}) => {
    try {
    
      const users = await http.post(`/api/users`, user.formData);
      // Trả về dữ liệu từ response
      dispatch(getAllUsers())
    
      return users.data.content;
    } catch (error) {
     
      return rejectWithValue({ error: error.message });
    }
  }
);




export const deleteAUser = createAsyncThunk(
  'users/deleteAUser',
  async (user, {dispatch,rejectWithValue}) => {
    try {
       

     

    
      await http.delete(`/api/users?id=${user.id}`)
      dispatch(getAllUsers())
   
      return user.id;

   

    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);



export const editAUser = createAsyncThunk(
  'users/editAUsers',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      
      const users = await http.put(`/api/users/${user.formData.id}`,user.formData)

 

      dispatch(getAllUsers())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);




export const editAUserAfterLogin = createAsyncThunk(
  'users/editAUserAfterLogin',
  async (user, {dispatch,rejectWithValue}) => {
    try {

      
      const users = await http.put(`/api/users/${user.formData.id}`,user.formData)
    
     

      dispatch(getAllUsers())
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);






export const editAvatarUser = createAsyncThunk(
  'users/editAvatarUser',
  async (user, {dispatch,rejectWithValue}) => {
    try {
   
   
      const users = await http.post(`/api/users/upload-avatar`,user.formData)

   

      dispatch(getAllUsers())
      return users.data.content;



    } catch (error) {
   
    }
  }
);


export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async (user, {dispatch,rejectWithValue}) => {
    try {
   
      const users = await http.post(`/api/auth/signup`, user.formData);
      // dispatch(getAllUsers())
      return users.data.content;
    } catch (error) {
      // Trả về một giá trị bị reject nếu có lỗi xảy ra
      return rejectWithValue({ error: error.message });
    }
  }
);



export const signInUser = createAsyncThunk(
  'users/signInUser',
  async (user, {dispatch,rejectWithValue}) => {
    
    try {

      const users = await http.post(`/api/auth/signin`,user.formData)
      // dispatch(getAllUsers())
      // dispatch(getAllComments())
      // dispatch(getAllJobs())
     
      return users.data.content;



    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);







const initialState = {
  users:'',
  status:'',
  signIn:''
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signOutUser: (state, action) => {
      state.signIn='';
      localStorage?.removeItem('USER');
      toast.success('Bạn đã đăng xuất thành công !')

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = 'rejected';
    });


    builder.addCase(addAUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addAUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.users.push(action.payload);
      toast.success('Bạn đã thêm người dùng thành công !')

    });
    builder.addCase(addAUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn thêm người dùng không thành công !')
    });


    builder.addCase(deleteAUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteAUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.users = state.users.filter(user => user.id !== action.payload);
      toast.success('Bạn đã xóa thành công !')
    });
    builder.addCase(deleteAUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn xóa thất bại !')
    });


    builder.addCase(editAUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editAUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.users = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
        );

        toast.success('Bạn đã chỉnh sửa thành công !')

    });
    builder.addCase(editAUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại !')
    });




    builder.addCase(editAUserAfterLogin.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editAUserAfterLogin.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.users = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
        );
        if(localStorage?.getItem('USER')){
        state.signIn='';
        localStorage.removeItem('USER');
        }
       
        toast.success('Bạn đã chỉnh sửa thành công 1 !')
   
    });
    builder.addCase(editAUserAfterLogin.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn chỉnh sửa thất bại !')
    });


   



    
    builder.addCase(editAvatarUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editAvatarUser.fulfilled, (state, action) => {


        // let token ='';
        if(localStorage?.getItem('USER')){
           let oldToken =JSON.parse(localStorage?.getItem('USER'))?.token

           let newUseData={
              token:oldToken,
              user:action.payload
           }

            state.status = 'fulfilled';
            localStorage.setItem('USER',JSON.stringify(newUseData))
        toast.success('Bạn đã cập nhật ảnh đại diện thành công !')
       
        }
     
    
     
    });
    builder.addCase(editAvatarUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã cập nhật ảnh đại diện thất bại ! !')
    });




    builder.addCase(signUpUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.signUp=action.payload
      toast.success('Bạn đã đăng ký thành công !')
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đăng ký không thành công !')
    });


    builder.addCase(signInUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.signIn=action.payload;
      localStorage.setItem('USER',JSON.stringify(action.payload))
   
      toast.success('Bạn đã đăng nhập thành công !')
      setTimeout(() => {
        window.location.reload();
      }, 2000);
     
   
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = 'rejected';
      toast.error('Bạn đã đăng nhập không thành công !')
    });





  


  },
})

// Action creators are generated for each case reducer function
export const { signOutUser } = userSlice.actions

export default userSlice.reducer