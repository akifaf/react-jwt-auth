import "./AdminPanel.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../components/Layout";

function AdminPanel() {
  const [userList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { user_id } = useParams();
  const history = useNavigate();
  const tokens = JSON.parse(localStorage.getItem('authTokens'));
  const accessToken = tokens.access;

  useEffect(() => {
    async function getUserList() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/class-userlist/", { 
            headers: {
              "Content-Type": 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }
    getUserList();
  }, [editingUser, accessToken]);

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/user-delete/${id}/`)
          .then(() => {
            setUserList(userList.filter(user => user.id !== id));
          })
          .catch(error => {
            console.error("Error deleting user:", error);
          });
      }
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const userUpdateForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/user-update/${editingUser.id}/`, {
        first_name: editingUser.first_name,
        username: editingUser.email,
        last_name: editingUser.last_name,
        email: editingUser.email,
      });
      if (response.status === 200) {
        Swal.fire("Success!", "User updated successfully.", "success");
        handleCloseModal();
      } else {
        console.error('Failed to update user:', response.data);
        Swal.fire("Error!", "Failed to update user.", "error");
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      Swal.fire("Error!", "Failed to update user.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="">
          <div className="sidebar-header">
            <h3>Admin Panel</h3>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Link to="adduser">Add User</Link>
            </li>
          </ul>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary me-2 btn-sm m-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                </div>
                <div className="modal-body">
                  <form className="add-user-form" onSubmit={userUpdateForm}>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          className="form-control"
                          id="first_name"
                          placeholder="Enter first name"
                          value={editingUser.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          className="form-control"
                          id="last_name"
                          placeholder="Enter last name"
                          value={editingUser.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Enter email"
                          value={editingUser.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AdminPanel;
