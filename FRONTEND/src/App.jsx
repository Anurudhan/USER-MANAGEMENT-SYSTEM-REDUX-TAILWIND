

import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home/Home'
import AdminLogin from './pages/Admin/Login/AdminLogin'
import Login from './pages/User/Login/Login'
import SignUp from './pages/User/SignUp/SignUp'
import Profile from './pages/User/Profile/Profile'
import { useSelector } from 'react-redux'
import DashBoard from './pages/Admin/DashBoard/DashBoard'
import AddUser from './pages/Admin/addUser/AddUser'
import ChangePassword from './pages/User/Change-Password/ChangePassword'

function App() {
  const adminData = useSelector((state) => state.admin.adminData);
  const userData = useSelector((state)=>state.user.userData)

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path ='/login' element={!userData?<Login />:<Navigate to='/'/>} />
          <Route path='/signup' element={!userData?<SignUp />:<Navigate to='/'/>} />
          <Route path='/profile' element={userData?<Profile />:<Navigate to='/'/>} />
          <Route path='/change-password' element = {userData?<ChangePassword />:<Navigate to='/'/>} />
          <Route path='/admin' element={adminData?<DashBoard />:<AdminLogin />} />
          <Route path='/admin/adduser' element={adminData?<AddUser />:<Navigate to='/admin'/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
