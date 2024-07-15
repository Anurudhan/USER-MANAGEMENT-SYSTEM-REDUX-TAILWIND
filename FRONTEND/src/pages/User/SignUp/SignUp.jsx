import  { useState, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import axios from "../../../../Axios";
import { setUserData } from "../../../redux/feature/UserSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";



const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .test('no-only-spaces', 'Username cannot contain only spaces', (value) => {
      return value && value.trim().length > 0;
    })
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^(\S+@\S+\.\S+)?$/, 'Email cannot contain spaces')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/^\S*$/, 'Password cannot contain spaces')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .matches(/^\S*$/, 'Password confirmation cannot contain spaces')
    .required('Confirm Password is required'),
});

function Signup() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/signup', userData);
      if (response.data.success) {
        const userDataResponse = await axios.get('/fetch-user-data');
        dispatch(setUserData(userDataResponse.data));
        navigate("/");
      }
    } catch (err) {
      setError('Error occurring while submitting: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
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
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Field
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="passwordConfirmation" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 disabled:bg-blue-300"
              >
                Sign up
              </button>
            </Form>
          </Formik>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Signup;