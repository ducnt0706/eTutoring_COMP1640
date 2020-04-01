import React from 'react';
import firebase from './firebaseSDK';

// TODO: Import components to render:
import Login from './components/Login';

class App extends React.Component{

    render(){
        return <Login/>
    }
}

export default App;