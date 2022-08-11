import React , {useState} from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase";
import {Link} from "react-router-dom";

function Login(props){

    let [mail,setMail]=useState("");
    let [password,setPassword]=useState("");
    let [error,setError]=useState("");
    let [loader,setLoader]=useState("Login");

    let mailHandler=function(e){
        setMail(e.target.value);
    }
    
    let passwordHandler=function(e){
        setPassword(e.target.value);
    }

    let loginHandler= async function(){
       
      
       try{
        setLoader("Loading...")
       let userCred= await signInWithEmailAndPassword(auth, mail, password);
        setMail(userCred.user);
        console.log(userCred.user);
       }catch(e){
        setError(e.message);

        setTimeout(()=>{
            setError("")
        },2000)
       }
       setLoader("Login");

       

    }

    return(
        <>
            <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-2 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase"> world of Reels</h2>
              <p className="text-white-50 mb-5">Please enter your Email and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="email" onChange={mailHandler} value={mail} id="typeEmailX" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="typeEmailX">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" onChange={passwordHandler} value={password} id="typePasswordX" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="typePasswordX">Password</label>
              </div>
                {/* // forget password */}
              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">{error}</a></p>

              <button className="btn btn-outline-light btn-lg px-5" onClick={loginHandler} type="submit">{loader}</button>

              <div className="d-flex justify-content-center text-center mt-4 pt-1">
                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
              </div>

            </div>

            <div>
             <Link to="/Signout"> <p className="mb-0">Don't have an account? Sign-up </p></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default Login;