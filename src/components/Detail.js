import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams, Link, useNavigate } from "react-router-dom";

const Detail = () => {
  const [getuserdata, setUserData] = useState([]);
  const navigate = useNavigate();
  console.log(getuserdata);

  const { id } = useParams(" ");
  console.log(id);
  const getdata = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
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
      navigate("/");
    }
  };
  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Sandeep Kumar</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <Link to={`/edit/${getuserdata._id}`}>
              {" "}
              <button className="btn btn-warning mx-2">
                <EditIcon />
              </button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                {" "}
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                {" "}
                Age: <span>{getuserdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon /> Email: <span>{getuserdata.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon /> Occuption: <span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-4">
                <PhoneAndroidIcon />
                Mobile:<span>+91 {getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location:<span>{getuserdata.address}</span>
              </p>
              <p className="mt-3">
                Description:<span>{getuserdata.description}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
