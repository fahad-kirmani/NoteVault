import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

const [credentials, setcredentials] = useState({name:"", email:"", password:"",conpass:"",})
let navigate = useNavigate()
const Handlesubmit = async (e) => {
    e.preventDefault();
    if(credentials.conpass!==credentials.password)
      {
        navigate("/signup")
        props.showmsg(" Password should be same ", "danger");
        return
      }
    const response = await fetch(`https://notevault-real.onrender.com/user/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: credentials.name, email:credentials.email, password:credentials.password}),
      });
      let json = await response.json();
      
      if (json.success)
      {
        localStorage.setItem('token' , json.authToken);
        navigate("/");
        props.showmsg(" Created new account ", "success");
      }
      else{
        props.showmsg(" Error: Invalid credentials ", "danger");
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
											<h4 className="mb-4 pb-3" style={{color:"#c4c3ca"}}>Sign Up</h4>
											<div className="form-group">
												<input type="email" name="email" className="form-style my-1" placeholder="Your Email" id="email" autoComplete="off" value={credentials.email} onChange={handlechange}/>
												<input type="text" name="name" className="form-style my-1" placeholder="Your Name" id="name" autoComplete="off" value={credentials.name} onChange={handlechange}/>
												<i className="input-icon uil uil-at fa-solid fa-at"></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="password" className="form-style my-1" placeholder="Your Password" id="password" autoComplete="off" value={credentials.password} onChange={handlechange}/>
												<input type="password" name="conpass" className="form-style my-1" placeholder="Confirm Your Password" id="conpass" autoComplete="off" value={credentials.conpass} onChange={handlechange}/>
												<i className="input-icon uil uil-lock-alt fa-solid fa-lock"></i>
											</div>
											<button type="submit" className="btn mt-4">submit</button>
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
  )
}

export default Signup
