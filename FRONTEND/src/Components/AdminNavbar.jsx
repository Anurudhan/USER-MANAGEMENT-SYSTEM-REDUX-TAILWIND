import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";
import { clearAdminData } from "../redux/feature/AdminSlice";


const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout =  () => {
        axios.get("/admin/logout").then(()=>{
            dispatch(clearAdminData());
            navigate('/admin')
        }).catch((error) => {
          console.error("Logout error:", error);
        });
    }
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-xl font-bold ms-8">Apple</span>
        <img src="https://svgsilh.com/svg/2962084.svg" alt="Logo" className="h-8 w-8 mr-2" />
      </div>
      <div className="flex items-center">
       
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
          onClick={()=>navigate('/admin/adduser')}
        >
          Add User
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout} 
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
