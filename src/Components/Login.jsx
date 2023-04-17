import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Config } from "./Config";
import Loading from "./Loading";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please enter the email id";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Please enter the password";
      } else if (values.password.length < 8) {
        errors.password = "must be 8 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const user = await axios.post(`${Config.api}/admin/login`, values);
        localStorage.setItem("myreact", user.data.token);
        if (user.data.message === "Success") {
          setLoading(false);
          navigate("/addproduct");
          alert("Successfully Logged in");
        } else {
          alert("Incorrect email/password");
        }
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <div className="card-login o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-lg-7 d-none d-lg-block">
              <img
                className="bg-login-image"
                src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.jpg?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM="
                alt="login"
              />
            </div>
            <div className="col-lg-5">
              <div className="p-5">
                <div className="text-center">
                  <div> {isLoading ? <Loading /> : ""}</div>
                  <h1 className="h4 text-gray-900 mb-4">Admin Login!!</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <input
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`form-control form-control-user ${
                        formik.touched.email && formik.errors.email
                          ? "error-box"
                          : ""
                      } ${
                        formik.touched.email && !formik.errors.email
                          ? "success-box"
                          : null
                      }`}
                      type="email"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.email}
                      </span>
                    ) : null}
                  </div>
                  <br />
                  <div className="form-group ">
                    <div className="col-lg-5">
                      <input
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`form-control form-control-user ${
                          formik.touched.password && formik.errors.password
                            ? "error-box"
                            : ""
                        } ${
                          formik.touched.password && !formik.errors.password
                            ? "success-box"
                            : null
                        }`}
                        type="password"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <button type={"submit"} className="btn btn-primary btn-md">
                    Login
                  </button>
                </form>

                <h1 className="h4 text-gray-900 mb-4">Email:kumar@gmail.com</h1>
                <h1 className="h4 text-gray-900 mb-4">password:kumar@123</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
