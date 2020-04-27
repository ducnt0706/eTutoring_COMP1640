import React, { Component } from 'react';
import Footer from '../components/Footer';

class Message extends Component {
    render() {
        return (
            <div className="content-inner color-gradient-grey">
                <header className="page-header">
                    <div className="container-fluid">
                        <h2 className="no-margin-bottom">Message</h2>
                    </div>
                </header>
                <div>
                    <section className="dashboard-counts no-padding-bottom ">
                        <div className="container-fluid">
                            Hello this is content of Message!
                        </div>
                    </section>
                </div>   
                <Footer/>
            </div>
        );
    }
}

export default Message;