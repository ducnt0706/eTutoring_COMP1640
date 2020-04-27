import React, { Component } from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';// import bootstrap library
import 'font-awesome/css/font-awesome.min.css';// import fontawesome icons library
import './js/front.js';
import './css/Homepage.css';
import './css/fontastic.css';
//TODO: To import router react
import {BrowserRouter, Switch,Route} from 'react-router-dom';
//TODO: to import firebase
import { fireauth } from './firebaseconfig';
//TODO: To import component
import Navbar from './nav/Navbar';
import Sidebar from './nav/Sidebar';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import Contact from './screens/Contact';
import Message from './screens/Message';

//REGION: App context
const AppContext = React.createContext();
class AppProvider extends Component {
  state = {
    
  }
render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}


//REGION: App component
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      profile:{
        displayName:null,
        email:null,
        photoURL:null,
      }
    };
  }

  authListener = () => {
    fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user:user,
          profile:{
            displayName:user.displayName,
            email:user.email,
            photoURL:user.photoURL
          }
        });
        //console.log(user.displayName);
      } else {
        this.setState({user:null});
        //console.log(user);
      }
    })
  }

  componentDidMount = () => {
    this.authListener();
  }

  render() { 
    if(this.state.user){
      return ( 
            <BrowserRouter>
              <div>
                <Navbar/>
                <div className="page-content d-flex align-items-stretch">
                  <Sidebar role="Tutor" name={this.state.user.displayName} photoUrl={this.state.user.photoURL}/>
                    <Switch>
                      <Route exact path='/' component={Homepage}/>
                      <Route path='/contact' component={Contact}/>
                      <Route path='/message' component={Message}/>
                    </Switch>
                </div>
              </div>
            </BrowserRouter>
      );
    }else{
      return (
        <div>
          <Login/>
        </div>
      );
    }
  }
}

export default App;
//Note: 2 way to create function in class
  //c1: is assgin it like a variable updateMessage =()=>{};
  //c2: use this.updateMessage=this.updateMessage.bind(this);
//Note: The componentDidMount() method is called after the component is rendered.
//For use: to update state

//Note: pass props for router: render={props=><Homepage {...props} profile={profile}/> }