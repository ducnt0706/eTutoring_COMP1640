import React, {useContext } from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';// import bootstrap library
import 'font-awesome/css/font-awesome.min.css';// import fontawesome icons library
import './js/front.js';
import './css/Homepage.css';
import './css/fontastic.css';
//TODO: To import component
import Login from './screens/Login';
import Tutorroute from './route/Tutorroute';
import Studentroute from './route/Studentroute';
//TODO: to import Usercontext
import {UserContext} from './providers/Userprovider'

//REGION: App component
const Application = ()=> {
    const {user,loaded}= useContext(UserContext);

    if(!loaded) return null;

    if(user!=null){
      if(user.email=="ducntgch17377@fpt.edu.vn"){
        return <Tutorroute/>
      }else if(user.email=="ducnt0706@gmail.com"){
        return <Studentroute/>
      }else{
        return <Login/>
      }
      
    }else{
      return (
        <div>
          <Login/>
        </div>
      );
    }
}

export default Application;
