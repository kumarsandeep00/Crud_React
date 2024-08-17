import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { adddata, deldata, updatedata } from "./context/ContextProvider";

const Home = () => {
  const [getuserdata, setUserData] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLdata } = useContext(deldata);

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8003/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      setUserData(data);
      console.log("get data ");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  // delete user
  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteData = await res2.json();
    console.log(deleteData);
    if (res2.status === 422 || !deleteData) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLdata(deleteData);
      getdata();
    }
  };
  return (
    <>
      <div className="container mt-2">
        {updata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{updata.name}</strong> updated successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {udata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{udata.name}</strong> added successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        ) : (
          " "
        )}

        {dltdata ? (
          <>
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{dltdata.name}</strong> deleted successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </>
        ) : (
          " "
        )}
      </div>

      <div className="mt-5">
        <div className="container">
          <div className="add_btn  mb-2">
            <Link className="btn btn-primary" to="/register">
              Add Data
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((value, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.work}</td>
                      <td>{value.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <Link to={`view/${value._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </Link>
                        <Link to={`edit/${value._id}`}>
                          <button className="btn btn-warning">
                            <EditIcon />
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(value._id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Home;
