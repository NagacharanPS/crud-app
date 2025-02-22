import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/Home.css";
import react from "react";
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7777/get/")
      .then((res) => {
        console.log("Data fetched from server:", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  const deleteUser = (Id) => {
    if (!Id) {
      console.error("Error: ID is undefined.");
      toast.error("Invalid ID, cannot delete user.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:7777/delete/${Id}`)
        .then((res) => {
          toast.success("User deleted successfully");
          setData(data.filter((item) => item.Id !== Id));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          toast.error("Failed to delete user");
        });
    }
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>
      <Link to="/addUser">
        <button className="add-user-btn">Add User</button>
      </Link>
      {data.length > 0 ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="typing-header">No.</span>
                </th>
                <th>
                  <span className="typing-header">Name</span>
                </th>
                <th>
                  {" "}
                  <span className="typing-header">Email</span>
                </th>
                <th>
                  {" "}
                  <span className="typing-header">Contact</span>
                </th>
                <th>
                  {" "}
                  <span className="typing-header">Action</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.Id}>
                  {" "}
                  {/* Use Id with uppercase */}
                  <th scope="row">{index + 1}</th>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{item.Contact}</td>
                  <td>
                    <Link to={`/update/${item.Id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(item.Id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.Id}`}>
                      <button className="view-btn">View</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Home;
