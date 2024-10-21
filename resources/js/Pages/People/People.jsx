import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const People = () => {
    const [people, setPeople] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        surname: "",
        id_number: "",
        mobile: "",
        email: "",
        birth_date: "",
        language: "",
        interests: [],
    });

    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            const response = await axios.get("/api/get-people-records");
            setPeople(response.data.record || []);
        } catch (error) {
            console.error("Error fetching people:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "interests" ? value.split(", ") : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = formData.id
            ? `/api/update-people-record`
            : `/api/store-people`;

        try {
            await axios.post(apiUrl, formData);
            await fetchPeople();
            resetForm();
            toast.success(
                formData.id
                    ? "Person updated successfully!"
                    : "Person created successfully!"
            );
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };

    const handleEdit = (person) => {
        setFormData(person);
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.get(`/api/delete-people-record/${id}`);
            setPeople((prev) => prev.filter((person) => person.id !== id));
            toast.success("Person deleted successfully!");
        } catch (error) {
            console.error("Error deleting person:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };

    const resetForm = () => {
        setFormOpen(false);
        setFormData({
            id: null,
            name: "",
            surname: "",
            id_number: "",
            mobile: "",
            email: "",
            birth_date: "",
            language: "",
            interests: [],
        });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                People Management
            </h2>
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setFormOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-lg transition duration-300"
                >
                    + Add Person
                </button>
            </div>

            {formOpen && (
                <div className="flex justify-center">
                    <form
                        onSubmit={handleFormSubmit}
                        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
                    >
                        {[
                            "name",
                            "surname",
                            "id_number",
                            "mobile",
                            "email",
                            "language",
                        ].map((field) => (
                            <input
                                key={field}
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                placeholder={field
                                    .replace("_", " ")
                                    .toUpperCase()}
                                required
                                className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                        <input
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="interests"
                            value={formData.interests.join(", ")}
                            onChange={handleInputChange}
                            placeholder="Interests (comma separated)"
                            className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                            >
                                {formData.id
                                    ? "Update Person"
                                    : "Create Person"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <table className="min-w-full mt-6 bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        {[
                            "Name",
                            "Surname",
                            "African Number",
                            "Mobile",
                            "Email",
                            "Birth Date",
                            "Language",
                            "Interests",
                            "Actions",
                        ].map((heading) => (
                            <th
                                key={heading}
                                className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {people && people.length > 0 ? (
                        people.map((person) => (
                            <tr key={person.id} className="border-b">
                                {Object.keys(formData)
                                    .filter(
                                        (field) => field !== "id"
                                        //  &&
                                        // field !== "id_number"
                                    ) // Exclude fields
                                    .map((field) => (
                                        <td
                                            key={`${field}-${person.id}`}
                                            className="px-6 py-4 text-sm"
                                        >
                                            {Array.isArray(person[field])
                                                ? person[field].join(", ")
                                                : person[field]}
                                        </td>
                                    ))}
                                <td className=" py-4 flex space-x-2 mr-3">
                                    <button
                                        onClick={() => handleEdit(person)}
                                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1.5 rounded shadow-md transition duration-300"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.232 5.232l3.536 3.536m-2.036-7.036a2.828 2.828 0 114 4l-10 10a4 4 0 01-1.414.586l-4.242.707a1 1 0 01-1.212-1.212l.707-4.242a4 4 0 01.586-1.414l10-10z"
                                            ></path>
                                        </svg>
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(person.id)}
                                        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1.5 rounded shadow-md transition duration-300"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1zm-4 5h10"
                                            ></path>
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={Object.keys(formData).length - 1} // Adjust column span to match new layout
                                className="text-center text-gray-500 py-6"
                            >
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default People;
