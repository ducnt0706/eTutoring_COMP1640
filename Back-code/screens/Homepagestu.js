import React, { Component } from 'react';
import Itemcontrolstu from '../components/Itemcontrolstu';
import Postviewstu from '../components/Postviewstu';
import Meetingviewstu from '../components/Meetingviewstu';
import Footer from '../components/Footer';
//Model data from providers
import Postprovider from '../providers/Postprovider';
import Meetingprovider from '../providers/Meetingprovider';


class Homepagestu extends Component {
    render() {
        return (
            <div className="content-inner color-gradient-grey">
                <header className="page-header">
                    <div className="container-fluid">
                        <h2 className="no-margin-bottom">Dashboard</h2>
                    </div>
                </header>
                <div>
                    <section className="dashboard-counts no-padding-bottom ">
                        <div className="container-fluid">
                            <Itemcontrolstu/>
                        </div>
                    </section>
                    <br></br>
                    <section className="updates no-padding-top">
                        <div className="container-fluid">
                            <div className="row"> 
                                <Postprovider>
                                    <Postviewstu/>
                                </Postprovider>
                                <Meetingprovider>
                                    <Meetingviewstu/>
                                </Meetingprovider>  
                            </div>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Homepagestu;