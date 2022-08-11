import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect ,useState }  from "react";

import { auth } from "../Firebase";

export let AuthContext=React.createContext();

export function AuthContextProvider({children}){
    let [cuser,setUser]=useState("");
    let [loader,setLoader]=useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }else{
                setUser("");
            }
            setLoader(false);
        })
    },[])

  let value=cuser;


    return(
        <>
            <AuthContext.Provider value={value}>
        {loader===false && children}
          {loader===true && <h1>...loading</h1>}
        </AuthContext.Provider>
       
        </>
    )
}

