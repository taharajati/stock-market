import React, { useState, useEffect } from "react";

const LIST_OF_TITLES = [
  { value: "manager", label: "Manager" },
  { value: "audit_chief", label: "Audit Chief" },
  { value: "expert", label: "Expert" },
  { value: "branch_manager", label: "Branch Manager" },
  { value: "user_admin", label: "User Admin" }
];

function UserList() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken"); // Retrieve token from storage
    if (storedToken) {
      setToken(storedToken); // Set token state if it exists in storage
      fetchUsers(storedToken); // Call fetchUsers with the stored token
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('http://api.optionscreener.ir/api/auth/get_user', {
        headers: {
          Authorization: `Bearer ${token}` // Send token in Authorization header
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Invalid data format received:', data);
        }
      } else {
        console.error('Failed to fetch users:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Implement delete user functionality
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[652px] mt-24 mx-auto px-5 max-md:mt-10 max-md:max-w-full">
      <div className="justify-center items-center self-start px-16 py-3 bg-emerald-300 rounded-2xl max-md:px-5">
        لیست کاربران
      </div>
      <div className="self-end ">افراد</div>
      <div className="mt-2 max-w-full h-0.5 bg-black border border-black border-solid w-full" />
      <div className="bg-zinc-300 mt-3 max-w-full h-[226px] w-full rounded-xl p-4">
        <ul className="overflow-y-auto max-h-full">
          {users.map((user) => (
            <li key={user._id} className="flex items-center justify-between border-b border-gray-200 py-2">
              <div>{user.username} - {user.title}</div>
              <button className="text-red-500" onClick={() => handleDeleteUser(user._id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AddUserForm />
    </div>
  );
}

function AddUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://188.121.99.245/api/auth_user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          title,
          first_name: firstName,
          last_name: lastName
        })
      });

      if (response.ok) {
        // Reload the user list
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">اضافه کردن کاربران</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        >
          <option value="">Select Title</option>
          {LIST_OF_TITLES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
          اضافه کردن کاربر
        </button>
        <br/>
        <br/>
        <br/>
        
      </form>
    </div>
  );
}

export default UserList;
