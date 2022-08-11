
import './App.css';
import Feed from "./Component/Feed"
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import Signout from "./Component/Signout";
import PageNotFound from "./Component/PageNotFound";
import { useContext } from 'react';


import {Switch,Route, Redirect} from "react-router-dom";
import { AuthContext ,AuthContextProvider} from './Context/AuthContext';
 
// import { signInAnonymously } from 'firebase/auth';


function App() {
  
  
  
  return (
    <>
    <AuthContextProvider >
    <Switch>
       <PrivateRouteTofeed path="/login" comp={Login}></PrivateRouteTofeed>  
       <RouteToLogin path="/feed" comp={Feed}></RouteToLogin>
    {/* <Route path="/feed" >
       <Feed></Feed>
    </Route> */}
    {/* <Route path="/login">
      <Login  ></Login>
    </Route> */}
    <RouteToLogin path="/profile" comp={Profile}></RouteToLogin>
    {/* <Route path="/Profile">
      <Profile></Profile>
    </Route> */}
    <PrivateRouteTofeed path="/Signout" comp={Signout}></PrivateRouteTofeed>
    {/* <Route path="/Signout">
      <Signout></Signout>
    </Route> */}
    <Route>
      <PageNotFound></PageNotFound>
    </Route>
    </Switch>
    </AuthContextProvider>
    </>
  );
}


function PrivateRouteTofeed(props){
  let Component=props.comp;
   
  let user=useContext(AuthContext);

  console.log(user.uid);


  return (
    <Route {...props}
     render={(props)=>{return user==""?<Component {...props}></Component>:<Redirect  {...props}  to="/Feed" ></Redirect>  }} >
      
    </Route>

  )

}

function RouteToLogin(props){
  let Component=props.comp;

  let user=useContext(AuthContext);

  return(
    <Route {...props}
    render={(props)=>{return user==""?<Redirect  to="/Login"></Redirect>:<Component ></Component>}}
    ></Route>
  )


}







export default App;
