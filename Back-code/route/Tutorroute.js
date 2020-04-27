import React, { useContext } from 'react';
//TODO: Screens
import Navbar from '../nav/Navbar';
import Sidebar from '../nav/Sidebar';
import Homepage from '../screens/Homepage';
import Contact from '../screens/Contact';
import Message from '../screens/Message';
//TODO: To import router react
import {BrowserRouter, Switch,Route} from 'react-router-dom';
//TODO: to import Usercontext
import {UserContext} from '../providers/Userprovider';

const Tutorroute=()=>  {
    const {user}= useContext(UserContext);
        return (
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div className="page-content d-flex align-items-stretch">
                        <Sidebar role="Tutor" name={user.displayName} photoUrl={user.photoURL} />
                        <Switch>
                            <Route exact path='/' component={Homepage} />
                            <Route path='/contact' component={Contact} />
                            <Route path='/message' component={Message} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    
}

export default Tutorroute;