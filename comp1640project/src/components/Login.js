import React from 'react';
import firebase from '../firebaseSDK';
import '../css/login.css';

class Login extends React.Component{

    signInWithGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
        });
    }

    render(){
        return (
            <div>
                <button id="sign-in" onClick={this.signInWithGoogle}>Login with Google</button>
            </div>
        )
    }
}

export default Login;