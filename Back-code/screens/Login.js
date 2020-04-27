import React, { Component } from 'react';
import '../css/Login.css';
import img from '../img/hero-img.png';
//TODO: to import firebase
import { signInWithGoogle } from '../firebaseconfig';

class Login extends Component {
    render() {
        return (
            <div id='login-page'>
                <div id="header" className="header header-hide">
                    <div className="container">
                        <div id="logo" className="pull-left">
                    <h1><span>e</span>Tutoring</h1>
                    </div>
                    </div>
                </div>

                <section id="hero" className="wow fadeIn">
                    <div className="container">
                        <div className="hero-container">
                            <h1>Welcome to eTutoring</h1>
                            <img src={img} alt="Hero Imgs"/>
                            <span id='sign-in' className="btn-get-started scrollto" onClick={signInWithGoogle}>Get Started</span>
                            <div className="btns">
                                <span ><i className="fa fa-apple fa-3x"></i> App Store</span>
                                <span ><i className="fa fa-play fa-3x"></i> Google Play</span>
                                <span ><i className="fa fa-windows fa-3x"></i> windows</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;