
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../../Axios';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../../Components/Toast';
import { useState } from 'react';

function AddUser() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Name is required')
      .test('is-not-blank', 'Name cannot be only spaces', value => value.trim() !== ''),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .trim()
      .required('Password is required')
      .test('is-not-blank', 'Password cannot be only spaces', value => value.trim() !== ''),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (userData) => {
    try {
      console.log('Hey we going to add new user in admin');
      const response = await axios.post('/admin/add-user', userData);
      if (response.data.success) {
        setShowToast(true);
        setToastMessage('Successfully added new user!');
        setStatus('success');
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else if (response.data.emailError) {
        setShowToast(true);
        setToastMessage(response.data.emailError);
        setStatus('error');
      }
    } catch (err) {
      console.log('error when admin adding new user', err);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <Link to='/admin'>
        <div className="flex justify-center">
          <img
            src="https://svgsilh.com/svg/2962084.svg"
            alt="Admin Logo"
            className="w-20 h-20 object-cover rounded-full shadow-lg"
          />
        </div>
        </Link>
          <h2 className="text-2xl font-bold mb-6 text-white">Add User</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-gray-300" htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label className="block text-gray-300" htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label className="block text-gray-300" htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <label className="block text-gray-300" htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {isSubmitting ? 'Adding...' : 'Add User'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Toast open={showToast} message={toastMessage} onClose={handleCloseToast} status={status} />
      </div>
    </>
  );
}

export default AddUser;
