import { Snackbar, SnackbarContent } from '@mui/material';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Toast = ({ open, message, status, onClose }) => {
  const getStatusStyles = () => {
    if (status === 'success') {
      return {
        backgroundColor: '#4CAF50', 
        icon: <FaCheckCircle style={{ marginRight: '8px' }} />,
      };
    } else if (status === 'error') {
      return {
        backgroundColor: '#F44336', 
        icon: <FaTimesCircle style={{ marginRight: '8px' }} />,
      };
    }
   
    return {
      backgroundColor: '#4CAF50',
      icon: <FaCheckCircle style={{ marginRight: '8px' }} />,
    };
  };

  const { backgroundColor, icon } = getStatusStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={3000} 
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor }}
        message={
          <div className="flex items-center">
            {icon}
            {message}
          </div>
        }
      />
    </Snackbar>
  );
};

export default Toast;
