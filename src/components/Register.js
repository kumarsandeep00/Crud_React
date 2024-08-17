import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
const Register = () => {
  const { udata, setUdata } = useContext(adddata);
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
  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, address, description } = inputval;

    const res = await fetch("http://localhost:8003/register", {
      method: "POST",
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
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      navigate("/");
      setUdata(data);

      console.log("data added");
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
            className="btn btn-primary"
            onClick={addinpdata}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;
