import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.css";
import axios from "../../../../Axios";
import { Suspense, useState } from "react";
import { setUserData } from "../../../redux/feature/UserSlice";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Toast from "../../../Components/Toast";

function Login() {
  const [showToast,setShowToast]=useState(false);
  const [toastMessage,setToastMessage] = useState('');
  const [status , setStatus]=useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setLoading] = useState('')
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (userData) => {
    try{
      const response = await axios.post('/login',userData);
      console.log(response);
      if(response.data.success){
        setLoading(true)
        const userDataResponse = await axios.get("/fetch-user-data");
        dispatch(setUserData(userDataResponse.data));
        navigate('/')
      }
      else if(response.data.emailError){
        setShowToast(true);
        setToastMessage(response.data.emailError)
        setStatus('error')
      }
      else if(response.data.passwordError){
        setShowToast(true);
        setToastMessage(response.data.passwordError)
        setStatus('error')
      }
    }
    catch(err){
      console.error(err)
    }
    finally {
      setLoading(false);
    }
  }
  const handleCloseToast = ()=>{
    setShowToast(false)
  }

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="flex justify-center items-center bg-slate-900 min-h-screen">
    {loading && <LoadingSpinner />}
      <div className="w-[412px] bg-white rounded-lg shadow-lg p-8">
        <Link to="/">
          <div className="flex justify-center mb-8">
            <img
              className="w-20 h-20"
              src="https://svgsilh.com/svg/2962084.svg"
              alt="Logo"
            />
          </div>
        </Link>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Sign in
            </button>
          </Form>
        </Formik>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        <Toast open={showToast} message={toastMessage} onClose={handleCloseToast} status={status} />
      </div>
    </div>
    </Suspense>
  );
}

export default Login;

