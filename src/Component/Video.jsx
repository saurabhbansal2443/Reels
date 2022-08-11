import React ,{useState}from "react";
import CommentBox from "./CommentBox";

const Video = (props) => {
  let [playing,setPlaying]=useState(true);
  let [commentBox,setCommentBox]=useState(false);

  
  let handleplay=((e)=>{
    if(playing){
        e.currentTarget.pause();
        setPlaying(false);
    }else{
        e.currentTarget.play();
        setPlaying(true);  
    }

  } )

  let handleComments=((e)=>{
    if(commentBox===false){
      setCommentBox(true);

    }else{
      setCommentBox(false);
    }
  })

  return (
    <div  className="d-flex justify-content-center my-2 " >
      <div className="card" style={{ width: "20rem" }}>
        <video  style={{ height: "35rem"}} onClick={(e)=>handleplay(e)}
        
          src={props.data.url}
          className="card-img-top"
         loop 
        />
        <div className="card-body d-flex justify-content-between">
          {/* <span className="material-symbols-outlined mx-5">favorite</span> */}

         
          <span className="material-symbols-outlined " style={{backgroundColor:commentBox===true?"red":"white"}} onClick={handleComments}>comment</span>
          
        </div>
        {commentBox===true?<CommentBox key={props.id} data={props.data}></CommentBox>:<></>}
      </div>
    </div>
  );
};

export default Video;
