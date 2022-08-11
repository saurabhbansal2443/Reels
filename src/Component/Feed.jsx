import Navbar2 from "./Navbar2";
import Upload from "./Upload"
import Video from "./Video";
import {useState,useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Firebase"

function Feed(){

    let[post,setPost]=useState([]);
    let[chnageFeed,setChangeFeed]=useState(true);
  

    useEffect( async () => {
        let arr=[];
       
        
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
         
          console.log(doc.id, " => ", doc.data());
          arr.push({id:doc.id , ...doc.data()})
        })
    
        setPost(arr);
       
    
    
    }, [])
    



    return(
        <>
        <>
       <Navbar2></Navbar2>
       <Upload></Upload>
       </>

       {post.map((posts)=>{
       
        return <Video key={posts.id}  data={posts}></Video>

       })}
      </>
    );
}


export default Feed;