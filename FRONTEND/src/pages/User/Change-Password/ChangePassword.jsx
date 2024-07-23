import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoArrowBack } from "react-icons/io5";
import { baseURL } from "../../../constants/Constants.Js";
import { useNavigate } from "react-router-dom";
import axios from "../../../../Axios";
import * as Yup from "yup";
import Toast from "../../../Components/Toast";
import { setUserData } from "../../../redux/feature/UserSlice";
import { useState } from "react";

const ChangePassword = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await axios.post("/change-password", values);
      if (response.data.success) {
        setShowToast(true);
        setStatus('success');
        setToastMessage('Successfully updated your profile!');
        const userDataResponse = await axios.get("/fetch-user-data");
        dispatch(setUserData(userDataResponse.data));
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setShowToast(true);
        setStatus('error');
        setToastMessage(response.data.error);
      }
    } catch (error) {
      console.log("Change password error:", error);
      setShowToast(true);
      setStatus('error');
      setToastMessage("Error changing password. Please try again.");
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };


  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "Passwords do not match")
      .required("Required")
  });

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96 text-white relative">
        <IoArrowBack
          className="text-lg cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-32 h-32 rounded-full mb-4"
            src={baseURL + `/${userData.Profile}`}
            alt="Profile"
          />
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <Formik
            initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 w-full">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Current Password
                  </label>
                  <Field
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none bg-gray-600 text-white sm:text-sm"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-400"
                  >
                    New Password
                  </label>
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none bg-gray-600 text-white sm:text-sm"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Confirm Password
                  </label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none bg-gray-600 text-white sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Toast open={showToast} message={toastMessage} onClose={handleCloseToast} status={status} />
      </div>
    </div>
  );
};

export default ChangePassword;

