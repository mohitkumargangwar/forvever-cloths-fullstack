import { useEffect, useState } from "react";
import { FiUsers, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../../redux/slice/adminUserSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUser);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
  });

  const [editUser, setEditUser] = useState(null); // for editing user

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  // Status Classes
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Role Classes (Only Admin & Customer)
  const getRoleClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Add New User
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields including password");
      return;
    }

    dispatch(createAdminUser(newUser)).unwrap()
      .then(() => {
        setNewUser({ name: "", email: "", role: "customer", password: "" });
      })
      .catch((err) => {
        alert(err?.message || "Failed to create user");
      });
  };

  // Delete User
  const handleDeleteUser = (id) => {
    dispatch(deleteAdminUser(id));
  };

  // Save Edited User
  const handleSaveEdit = () => {
    if (!editUser) return;
    const { _id, name, email, role } = editUser;
    dispatch(updateAdminUser({ id: _id, updates: { name, email, role } }))
      .unwrap()
      .then(() => setEditUser(null))
      .catch((err) => alert(err?.message || "Failed to update user"));
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  const getAvatar = (name = "User") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <FiUsers className="mr-3" />
            User Management
          </h1>
          <p className="text-gray-500 mt-1">Manage all the users from here.</p>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-600 mb-4">Loading users...</p>}
      {error && <p className="text-sm text-red-600 mb-4">Error: {error}</p>}

      {/* Add User Form */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <FiPlus className="mr-2" /> Add New User
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* User Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        {!loading && users.length === 0 && (
          <p className="text-sm text-gray-600">No users found.</p>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={getAvatar(user.name)} alt={user.name} loading="lazy" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status || "Active")}`}>
                    {user.status || "Active"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Cards for Mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img src={getAvatar(user.name)} alt={user.name} className="h-12 w-12 rounded-full" loading="lazy" />
              <div className="ml-3">
                <h3 className="text-sm font-medium">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getRoleClass(user.role)}`}>
                  {user.role}
                </span>
                <div className="text-[11px] text-gray-500">Joined: {formatDate(user.createdAt)}</div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${getStatusClass(user.status || "Active")}`}>
                  {user.status || "Active"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditUser(user)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="text-red-600 hover:text-red-900"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              className="border px-3 py-2 rounded w-full mb-3"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              className="border px-3 py-2 rounded w-full mb-3"
            />
            <select
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              className="border px-3 py-2 rounded w-full mb-3"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
