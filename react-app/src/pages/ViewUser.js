import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/ViewUser.css";
const ViewUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7777/get/${id}`)
      .then((res) => {
        console.log("Fetched user details:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, [id]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="view-outer-container">
      <div className="view-container">
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {user.Name}
        </p>
        <p>
          <strong>Email:</strong> {user.Email}
        </p>
        <p>
          <strong>Contact:</strong> {user.Contact}
        </p>
      </div>

      <Link to="/">
        <button className="back-btn">Go Back</button>
      </Link>
    </div>
  );
};

export default ViewUser;
