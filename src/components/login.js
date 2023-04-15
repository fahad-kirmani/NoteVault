import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [credentials, setcredentials] = useState({email:"", password:""})
  let navigate = useNavigate()
  const Handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notevault-real.onrender.com//user/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password}),
      });
      let json = await response.json();
      console.log(json.authToken);
      if (json.success)
      {
        localStorage.setItem('token' , json.authToken);
        navigate("/");
        props.showmsg(" Successfully logged in ", "success");
      }
      else{
        props.showmsg(" Invalid Credentials ", "danger");
      }
  };
  const handlechange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <form className="section text-center" onSubmit={Handlesubmit}>
                          <h4 className="mb-4 pb-3" style={{ color: "#c4c3ca" }}>
                            Log In
                          </h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="email"
                              autoComplete="on"
                              onChange={handlechange}
                              value={credentials.email}
                            />
                            <i className="input-icon uil uil-at fa-solid fa-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="password"
                              autoComplete="on"
                              onChange={handlechange}
                              value={credentials.password}
                            />
                            <i className="input-icon uil uil-lock-alt fa-solid fa-lock"></i>
                          </div>
                          <button type="submit" className="btn mt-4">
                            submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
