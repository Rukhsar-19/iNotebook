import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login =  (props) => {
    const [credentials,setCredentials]=useState({email:"",password:""})
    // usehistrory hook used
    const navigate = useNavigate();
    
    const handleSubmit=async (e)=>{
     e.preventDefault();
   // fetchapi say endpoint hit kary
    const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
        // 'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4NjZiY2UxYzAyZmUxZTJhMWVlNzI5In0sImlhdCI6MTczNzAzNDcwMX0.rV1wasTXfTzGUS8g8Kqa68MTBV6gWtq80Z_caB0N6mk"
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
        
     
    });
    const json=await response.json();
    console.log(json);
    if(json){
     
     localStorage.setItem('token',json.authtoken);
     props.showAlert("Login  successfully","success");
     navigate("/");
    }
    else{
       props.showAlert("invalid credentials","danger");
     }
    };

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
         }
       

  return (
    <div className="mt-3">
      <h2>Log in continue to iNotebook</h2>
        <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email </label>
    <input type="email" className="form-control" id="email"  value={credentials.email} onChange={onChange}name="email"  aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={credentials.password} onChange={onChange} name="password" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
      
    </div>
  )

}
export default Login;
