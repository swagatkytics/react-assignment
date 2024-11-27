import React, { useState } from "react";

function App() {
    const [data, setData] = useState([
        { id: 1, name: "John Doe", email: "john.doe@test.com", mobile: "1234567890", address: "123 Elm Street, NY", age: 28 },
        { id: 2, name: "Jane Smith", email: "jane.smith@test.com", mobile: "9876543210", address: "456 Oak Street, CA", age: 32 },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        let tempErrors = {};

        if (!editData.name) tempErrors.name = "Name is required.";
        if (!editData.email) tempErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(editData.email)) tempErrors.email = "Invalid email format.";

        if (!editData.mobile) tempErrors.mobile = "Mobile number is required.";
        else if (!/^\d{10}$/.test(editData.mobile)) tempErrors.mobile = "Mobile number must be 10 digits.";

        if (!editData.address) tempErrors.address = "Address is required.";
        if (!editData.age) tempErrors.age = "Age is required.";
        else if (editData.age <= 0) tempErrors.age = "Age must be a positive number.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field
    };

    const handleAdd = () => {
        setEditData({ id: null, name: "", email: "", mobile: "", address: "", age: "" });
        setErrors({});
        setIsOpen(true);
    };

    const handleSave = () => {
        if (validateFields()) {
            if (editData.id === null) {
                setData((prev) => [...prev, { ...editData, id: Date.now() }]);
            } else {
                setData((prev) => prev.map((row) => (row.id === editData.id ? editData : row)));
            }
            setIsOpen(false);
            setEditData(null);
        }
    };

    const handleEdit = (row) => {
        setEditData(row);
        setErrors({});
        setIsOpen(true);
    };

    const handleDelete = (id) => {
        setData((prev) => prev.filter((row) => row.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Details</h1>
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            >
                + Add User
            </button>

            <div className="overflow-x-auto mt-6">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Name</th>
                            <th className="border border-gray-200 px-4 py-2">Email</th>
                            <th className="border border-gray-200 px-4 py-2">Mobile</th>
                            <th className="border border-gray-200 px-4 py-2">Address</th>
                            <th className="border border-gray-200 px-4 py-2">Age</th>
                            <th className="border border-gray-200 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{row.name}</td>
                                <td className="border border-gray-200 px-4 py-2">{row.email}</td>
                                <td className="border border-gray-200 px-4 py-2">{row.mobile}</td>
                                <td className="border border-gray-200 px-4 py-2">{row.address}</td>
                                <td className="border border-gray-200 px-4 py-2">{row.age}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(row)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">{editData?.id ? "Edit User" : "Add User"}</h2>
                        <div className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={editData?.name || ""}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={editData?.email || ""}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={editData?.mobile || ""}
                                    onChange={handleChange}
                                    placeholder="Mobile"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    value={editData?.address || ""}
                                    onChange={handleChange}
                                    placeholder="Address"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="age"
                                    value={editData?.age || ""}
                                    onChange={handleChange}
                                    placeholder="Age"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
