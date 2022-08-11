import React, { useState, useContext, useEffect } from "react";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
const CommentBox = (props) => {
  let [currUserComment, setCurrUserComment] = useState("");
  let user = useContext(AuthContext);
  let [comment, setComment] = useState([]);
  let [change, setChange] = useState(true);


//   function for updating the comments on the post 

  async function updatesComments() {
    let commentIDS = props.data.comments;
    let arr = [];

    for (let i = 0; i < commentIDS.length; i++) {
      let commentRef = doc(db, "comments", commentIDS[i]);
      const commentSnap = await getDoc(commentRef);
      arr.push(commentSnap.data());
    }
    console.log(arr);
    setComment(arr);
  }

  useEffect(() => {
    updatesComments();
  }, [change]);

  let addComment = async () => {
    let commentsId = user.uid + "$" + Date.now();
    await setDoc(doc(db, "comments", commentsId), {
      mail: user.email,

      comments: currUserComment,
    });
    setCurrUserComment("");

    let postCommentArr = props.data.comments;
    postCommentArr.push(commentsId);

    const postsRef = doc(db, "posts", props.data.id);
    await updateDoc(postsRef, {
      comments: postCommentArr,
    });
    setChange(!change);
  };

  return (
    <div>
      <div
        className=" d-flex justify-content-center"
        style={{ width: "20rem" }}
      >
        <div className="col-md-8 col-lg-6">
          <div
            className="card shadow-0 border"
            style={{ backgroundColor: "#f0f2f5", width: "20rem" }}
          >
            <div className="card-body" style={{ width: "20rem" }}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  className="form-control"
                  placeholder="Type comment..."
                  value={currUserComment}
                  onChange={(e) => {
                    setCurrUserComment(e.currentTarget.value);
                    console.log(currUserComment);
                  }}
                />

                <button
                  type="button"
                  className="btn btn-primary my-2"
                  onClick={addComment}
                >
                  Comment
                </button>
              </div>

              {
                comment.map((cm)=>{
                    return(


                        <div className="card mb-4">
                <div className="card-body">
                  <p>{cm.comments}</p>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      {/* <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                        alt="avatar"
                        width="25"
                        height="25"
                      /> */}
                      <p className="small mb-0 ms-2">{cm.mail}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <i
                        className="far fa-thumbs-up mx-2 fa-xs text-black"
                        style={{ marginTop: "-0.16rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

                    )
                }) 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
