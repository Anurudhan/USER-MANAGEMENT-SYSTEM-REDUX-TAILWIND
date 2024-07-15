import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';

const EditUserModal = ({ open, onClose, initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  return (
    <Modal
      open={open}
      onClose={onClose} // Ensure this function correctly handles modal closure
      aria-labelledby="edit-user-modal"
      aria-describedby="edit-user-modal-description"
    >
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-800 rounded"
        sx={{ width: 400, p: 4 }}
      >
        <Typography id="edit-user-modal" variant="h6" component="h2" className='text-white justify-center text-center'>
          Edit User
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Field
                  as={TextField}
                  label="Username"
                  name="name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  className="bg-gray-700"
                  InputProps={{
                    style: {
                      color: 'white'
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white'
                    }
                  }}
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  className="bg-gray-700"
                  InputProps={{
                    style: {
                      color: 'white'
                    }
                  }}
                  InputLabelProps={{
                    style: {
                      color: 'white'
                    }
                  }}
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={onClose} className="bg-gray-600 text-white hover:bg-gray-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-800">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
