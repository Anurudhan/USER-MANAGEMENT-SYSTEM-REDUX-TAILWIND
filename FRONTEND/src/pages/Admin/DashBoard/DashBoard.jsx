import { useEffect, useState } from 'react';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import axios from '../../../../Axios';
import { baseURL } from '../../../constants/Constants.Js';
import AdminNavbar from '../../../Components/AdminNavbar';
import EditUserModal from '../../../Components/EditModal';
import Toast from '../../../Components/Toast';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '' });
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/fetch-user-data');
      const data = response.data.data;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleEditUser = (user) => {
    setEditUser({ id: user._id, name: user.name, email: user.email });
    setOpenModal(true);
  };

  const handleSaveEdit = async (values) => {
    try {
      const response = await axios.put('/admin/update-user', { id: editUser.id, name: values.name, email: values.email });
      if (response.data.success) {
        fetchUsers();
        setOpenModal(false);
        setToastMessage('User successfully updated!');
        setShowToast(true);
        setStatus('success');
      } else {
        console.error('Failed to update user:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const deleteUser = users.find((item) => item._id === id);
      const confirmDelete = window.confirm(`Are you sure you want to delete this user ${deleteUser.name}?`);
      if (!confirmDelete) return;
      setUsers(users.filter((cur) => cur._id !== id));
      setToastMessage('User successfully deleted!');
      setShowToast(true);
      setStatus('success');
      await axios.delete('/admin/delete-user', {
        data: { id },
      });
    } catch (err) {
      console.log('delete user error:', err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AdminNavbar />
      <Container className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4">Admin Dashboard</Typography>
          <TextField
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            className="bg-gray-800 text-white rounded"
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
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-400">
              <TableRow>
                <TableCell>
                  <Typography className="text-3xl text-gray-900">Serial Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-3xl text-gray-900">Username</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-3xl text-gray-900">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-3xl text-gray-900">Profile Photo</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-3xl text-gray-900">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={user._id} className="bg-gray-800 hover:bg-gray-600">
                  <TableCell>
                    <Typography className="text-gray-300 font-semibold">{indexOfFirstUser + index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-gray-300">{user.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-gray-300">{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <img src={`${baseURL}/${user.Profile}`} alt="Profile" className="w-12 h-12 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="contained"
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-600 text-white hover:bg-yellow-800"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-600 text-white hover:bg-red-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-between mt-4">
          <Button
            variant="contained"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-600 text-white hover:bg-gray-800"
          >
            Prev
          </Button>
          <Typography className="text-gray-300">Page {currentPage} of {totalPages}</Typography>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-600 text-white hover:bg-gray-800"
          >
            Next
          </Button>
        </div>
      </Container>
      <EditUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialValues={editUser}
        onSubmit={handleSaveEdit}
      />
      <Toast open={showToast} message={toastMessage} onClose={handleCloseToast} status={status} />
    </div>
  );
};

export default Dashboard;
