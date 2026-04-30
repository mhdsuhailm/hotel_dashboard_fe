import { useEffect, useState } from "react";
import axios from "axios";
import UserDetailsModal from "./UserModal";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // STATUS STYLE (same theme logic)
  const getStatusStyle = (isActive) => {
    return isActive
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";
  };

  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-xl p-4">
      
      {/* TITLE */}
      <h2 className="text-white text-sm mb-4">
        Users
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">

          {/* HEADER */}
          <thead className="text-xs text-gray-400 border-b border-[#241E1E]">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              {/* <th className="pb-3">Email</th> */}
              <th className="pb-3">Address</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#1E1919] hover:bg-[#1E1919] transition cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                {/* NAME */}
                <td className="py-3 text-blue-400 hover:underline">
                  {user.display_name}
                </td>

                {/* PHONE */}
                <td>{user.phone_number}</td>

                {/* EMAIL */}
                {/* <td className="max-w-[200px] truncate">
                  {user.email}
                </td> */}
                {/* ADDRESS */}
                <td className="max-w-[200px] truncate">
                  {user.latest_address || "N/A"}
                </td>

                {/* TYPE */}
                <td className="capitalize">{user.user_type}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusStyle(
                      user.is_active
                    )}`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* MODAL */}
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            refreshUsers={fetchUsers}
          />
        )}
      </div>
    </div>
  );
};

export default UserTable;