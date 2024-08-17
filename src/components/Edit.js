import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
function Edit() {
  // const [getuserdata,setUserData] = useState([]);
  // console.log(getuserdata);
  const { updata, setUPdata } = useContext(updatedata);

  const navigate = useNavigate();
  const [inputval, setInputVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });
  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

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
      setInputVal(data);
      console.log("get data ");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, description } = inputval;
    const res2 = await fetch(`http://localhost:8003/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      }),
    });
    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      // alert("data added");
      navigate("/");
      setUPdata(data2);
    }
  };
  return (
    <div className="container">
      <form className="mt-5">
        <div className="row">
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Name : </label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              name="name"
              value={inputval.name}
              onChange={setData}
            />
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Email : </label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={inputval.email}
              name="email"
              onChange={setData}
            />
          </div>

          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Age :</label>
            <input
              type="number"
              className="form-control"
              placeholder="age"
              value={inputval.age}
              name="age"
              onChange={setData}
            />
          </div>

          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Mobile :</label>
            <input
              type="number"
              className="form-control"
              value={inputval.mobile}
              placeholder="mobile no"
              name="mobile"
              onChange={setData}
            />
          </div>

          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Work :</label>
            <input
              type="text"
              value={inputval.work}
              className="form-control"
              placeholder="word"
              name="work"
              onChange={setData}
            />
          </div>

          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label>Address :</label>
            <input
              type="text"
              className="form-control"
              value={inputval.address}
              placeholder="address"
              name="address"
              onChange={setData}
            />
          </div>

          <div className="form-group mb-3 col-sm-12 col-12">
            <label>Description :</label>
            <textarea
              rows="5"
              cols="30"
              placeholder="description"
              className="form-control"
              name="description"
              value={inputval.description}
              onChange={setData}
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={updateuser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
