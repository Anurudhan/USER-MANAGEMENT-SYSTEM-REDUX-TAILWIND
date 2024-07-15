
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "../../../../Axios";
import { Suspense, useState } from 'react';
import { setAdminData } from '../../../redux/feature/AdminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../Components/LoadingSpinner';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test('no-empty-spaces', 'Email cannot contain only spaces', 
      value => value && value.trim().length > 0),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    
});

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (adminData) => {
    try{
      const response = await axios.post('/admin/login',adminData);
      console.log(response);
      if(response.data.success){
        setLoading(true)
        const adminDataResponse = await axios.get("/admin/fetch-admin-data");
        dispatch(setAdminData(adminDataResponse.data));
        navigate('/admin')
      }

    }
    catch(err){
      console.error(err)
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    {loading && <LoadingSpinner />}
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center">
          <img
            src="https://svgsilh.com/svg/2962084.svg"
            alt="Admin Logo"
            className="w-20 h-20 object-cover rounded-full shadow-lg"
          />
        </div>
        <h2 className="text-center mt-4 text-2xl font-semibold text-gray-700">Admin Sign-In</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-6 text-sm">
          <a href="#" className="text-blue-500 hover:text-blue-600">Forgot password?</a>
        </div>
      </div>
    </div>
    </Suspense>
  );
}

export default AdminLogin;