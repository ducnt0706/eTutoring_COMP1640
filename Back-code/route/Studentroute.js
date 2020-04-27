import React, { useContext } from 'react';
//TODO: Screens
import Navbar from '../nav/Navbar';
import Sidebar from '../nav/Sidebar';
import Homepagestu from '../screens/Homepagestu';
import Contactstu from '../screens/Contactstu';
import Message from '../screens/Message';
//TODO: To import router react
import {BrowserRouter, Switch,Route} from 'react-router-dom';
//TODO: to import Usercontext
import {UserContext} from '../providers/Userprovider';

const Studentroute=()=>  {
    const {user}= useContext(UserContext);
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div className="page-content d-flex align-items-stretch">
                        <Sidebar role="Student" name={user.displayName} photoUrl={user.photoURL} />
                        <Switch>
                            <Route exact path='/' component={Homepagestu} />
                            <Route path='/contact' component={Contactstu} />
                            <Route path='/message' component={Message} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    
}

export default Studentroute;