import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setUserData, updateUserData } from "../../../redux/feature/UserSlice";
import { baseURL } from "../../../constants/Constants.Js";
import "./Profile.css";
import { useRef, useState } from "react";
import UserNavbar from "../../../Components/UserNavbar";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from '../../../../Axios'

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  console.log(userData)
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);


  const onSubmit = (values) => {
    const updatedValues = {
      ...values,
      image: selectedImage ? URL.createObjectURL(selectedImage) : values.image,
    };
    dispatch(updateUserData(updatedValues));
    setIsEditing(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    try{
      const formData = new FormData();
      formData.append('profile', file);
      const response = await axios.post('/upload-profile-photo',formData,{
        headers : {
          "Content-Type": "multipart/form-data",
        },
      })
      if(response.data.success){
        setSelectedImage(true)
        setTimeout(() => {
          setSelectedImage(false)
        },3000);
        const userDataResponse = await axios.get("/fetch-user-data");
        console.log("userDataResponse:", userDataResponse);
        dispatch(setUserData(userDataResponse.data))
      }
    }
    catch(err){
      console.log('image upload error',err);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex justify-center items-center bg-slate-900 min-h-screen">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96 text-white relative">
          <IoArrowBack
            className="text-lg"
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                navigate("/");
              }
            }}
          />
          <div className="flex flex-col items-center mb-8">
            <img
              className="w-32 h-32 rounded-full mb-4"
              src={baseURL + `/${userData.Profile}`}
              alt="Profile"
            />
            {!isEditing ? (
              <>
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      id="image"
                      name="Profile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      className=" mt-2 text-sm text-blue-400 hover:underline"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Change profile pic
                    </button>
                  </div>
                </div>

                <h2 className="text-lg font-bold mb-2">{userData.name}</h2>
                <p className="text-sm text-gray-400 mb-2">{userData.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <Formik
                initialValues={userData}
                onSubmit={onSubmit}
                validate={validate}
              >
                <Form className="space-y-4 w-full">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Username
                    </label>
                    <Field
                      id="username"
                      name="name"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none bg-gray-600 text-white sm:text-sm"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none bg-gray-600 text-white sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                  >
                    Save
                  </button>
                </Form>
              </Formik>
            )}
            {isEditing && (
              <Link
                to="/change-password"
                className="mt-2 text-sm text-blue-400 hover:underline"
              >
                Change Password
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
