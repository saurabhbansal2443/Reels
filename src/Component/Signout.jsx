import React , {useState} from "react";
import {auth ,db} from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from "react-router-dom";
import {setDoc,doc } from "firebase/firestore";




function Signout() {
    let [mail,setMail]=useState("");
    let [password,setPassword]=useState("");
    let [name,setName ]=useState("");
    let [error,setError]=useState("");
    let [loader,setLoader]=useState("SignUp");

    let mailHandler=function(e){
        setMail(e.target.value);
    }
    
    let passwordHandler=function(e){
        setPassword(e.target.value);
    }
    let nameHandler=function(e){
        setName(e.target.value);
    }

    let loginHandler= async function(e){
        setLoader("...loading")
         try{
       let userCred=await createUserWithEmailAndPassword(auth,mail,password);

       await setDoc(doc(db,"users",userCred.user.uid),{
          mail,
          name,
          reelsIds:[],
          profileIMG:"",
          userId:userCred.user.uid,
       });

         }catch(e){
            setError(e.message);

            setTimeout(()=>{
                setError("");
            },4000);

         }

         setLoader("SignUp");
    
    }

   

  return (
    <>
      <section
        className="vh-100 bg-image"
        style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-3">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          onChange={nameHandler}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          onChange={mailHandler}
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          onChange={passwordHandler}
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      

                     

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          onClick={loginHandler}
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          {loader}
                        </button>
                      </div>

                      <p>{error}</p>

                      <Link to="/login"><p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                       
                          Login here
                        
                      </p></Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signout;
