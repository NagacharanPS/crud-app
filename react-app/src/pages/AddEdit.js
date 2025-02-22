import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/AddEdit.css";

const AddEdit = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL

  // Fetch user data when in Edit mode
  useEffect(() => {
    if (id) {
      console.log("Fetching user data for ID:", id);
      axios
        .get(`http://localhost:7777/get/${id}`)
        .then((res) => {
          console.log("Fetched user data:", res.data);
          setData({
            name: res.data.Name, // ✅ Ensure correct mapping
            email: res.data.Email,
            contact: res.data.Contact,
          });
          console.log("Updated state:", data); // Debugging
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          toast.error("Failed to fetch user data");
        });
    }
  }, [id]); // ✅ Only run when `id` changes

  // Run only when id changes

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.contact) {
      toast.error("Please fill in all fields");
      return;
    }

    if (id) {
      // Update user
      axios
        .put(`http://localhost:7777/update/${id}`, data)
        .then(() => {
          toast.success("User Updated Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error updating user:", err);
          toast.error("User update failed, please try again");
        });
    } else {
      // Add new user
      axios
        .post("http://localhost:7777/post", data)
        .then(() => {
          toast.success("User Added Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error adding user:", err);
          toast.error("User creation failed, please try again");
        });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <strong>Name:</strong>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={data.name || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">
          <strong>Email:</strong>
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={data.email || ""}
          onChange={handleChange}
        />

        <label htmlFor="contact">
          <strong>Contact</strong>
        </label>
        <input
          type="text"
          placeholder="Mobile number"
          name="contact"
          value={data.contact || ""}
          onChange={handleChange}
        />

        <button className="save-btn" type="submit">
          {id ? "Update" : "Save"}
        </button>
      </form>
      <Link to="/">
        <button className="go-back">Go Back</button>
      </Link>
    </div>
  );
};

export default AddEdit;
