import React, { useState ,useContext} from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import {setDoc,doc } from "firebase/firestore";
import {db} from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
// import { updateDoc } from "firebase/firestore";




const Upload = () => {
  // let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [prog,setProg]=useState(100);
  let user=useContext(AuthContext);
  

  let handleChange = async (file) => {
    if (file === null) {
      setError("Please Uplaod a video");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else if (file.size / (1024 * 1024) > 100) {
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
            setProg(progress);
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

                 console.log(user);
            await setDoc(doc(db,"posts",user.uid + `${file.name}`),{
           
              mail:user.email,
              url:downloadURL,
              comments:[],
              likes:[],
              
           });

          //  const washingtonRef = doc(db, "users", user.uid);
           
          //  await updateDoc(washingtonRef, {
          //   reelsIds: [...reelsIds,downloadURL]
          //  });






          });
        }
      );
    }
  };

  return (
    <div className="d-flex justify-content-center" >
      {error != null ? (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      ) : (
        <div className="d-flex justify-content-center">

        <label className="custom-file-upload btn btn-outline-danger my-2">
          <input style={{display:"none"}}
            type="file"
          
            onChange={(e) => handleChange(e.target.files[0])}
            id="forInput"
            accept="video"
          ></input>
          Upload Video
      </label>


        </div>
      )}

     {prog===100?<></>:<div className="text-center my-3">
  <div className="spinner-border text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
     }
      
    </div>
  );
};

export default Upload;
