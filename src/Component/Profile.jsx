import { db } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { updateDoc } from "firebase/firestore";

function Profile() {
  let cuser = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(null);
  let [error, setError] = useState(null);
  let [change, setChange] = useState(true);

  async function changePhoto() {
    if (cuser) {
      const docRef = doc(db, "users", cuser.uid);
      const userobj = await getDoc(docRef);

      setUser(userobj.data());
      console.log(userobj.data());

      setLoading(false);
    }
  }

  useEffect(
    function fn() {
      changePhoto();
    },
    [change]
  );

  let handleChange = async (file) => {
    if (file === null) {
      setError("Please Uplaod a photo");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else if (file.size / (1024 * 1024) > 10) {
      setError("File Size is too Big");

      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      console.log(file);

      // uploading video as all paramater are okay set

      const storageRef = ref(storage, `${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            const washingtonRef = doc(db, "users", cuser.uid);

            await updateDoc(washingtonRef, {
              profileIMG: downloadURL,
            });
            setChange(!change);
          });
        }
      );
    }
  };

  return (
    <>
      {error != null ? (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      ) : (
        <></>
      )}
      {loading === true ? (
        <h1>loading</h1>
      ) : (
        <>
          <Navbar></Navbar>
          <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-9 col-xl-7">
                  <div className="card">
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={
                            user.profileIMG === ""
                              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              : user.profileIMG
                          }
                          alt="Generic placeholder "
                          className="img-fluid img-thumbnail mt-4 mb-2"
                          style={{ width: "150px", zIndex: "1" }}
                        />

                        <label
                          className="custom-file-upload btn btn-outline-dark "
                          data-mdb-ripple-color="dark"
                          style={{ zIndex: "1" }}
                        >
                          <input
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => handleChange(e.target.files[0])}
                            id="forInput"
                            accept="video"
                          ></input>
                          Update Photo
                        </label>
                      </div>
                      <div className="ms-3" style={{ marginTop: "130px" }}>
                        <h5>{user.name}</h5>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          {/* <p className="mb-1 h5">{user.reelsIds.length}</p>
                          <p className="small text-muted mb-0">Videos</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1 my-5">Mail</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="font-italic mb-1">{user.mail}</p>
                        </div>
                      </div>
                      {/* <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Video</p>
                       
                      </div>
                      <div className="row g-2 d-flex flex-wrap">

                      
                      <MyVideo></MyVideo>
                      <MyVideo></MyVideo>
                      <MyVideo></MyVideo>
                      <MyVideo></MyVideo>
                      <MyVideo></MyVideo>
                      <MyVideo></MyVideo> */}

                      {/* <div className="col mb-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                            alt="i 1"
                            className="w-100 rounded-3"
                          />
                        </div>
                        <div className="col mb-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                            alt="i 1"
                            className="w-100 rounded-3"
                          />
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt="i 1"
                            className="w-100 rounded-3"
                          />
                        </div>
                        <div className="col">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt="i 1"
                            className="w-100 rounded-3"
                          /> */}
                      {/* </div> */}
                      {/* {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Profile;
