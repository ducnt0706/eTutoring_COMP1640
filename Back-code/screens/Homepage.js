import React, { Component } from 'react';
import Itemcontrol from '../components/Itemcontrol';
import Postview from '../components/Postview';
import Meetingview from '../components/Meetingview';
import Footer from '../components/Footer';
//Model data from providers
import Postprovider from '../providers/Postprovider';
import Meetingprovider from '../providers/Meetingprovider';


class Homepage extends Component {
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
                            <Itemcontrol/>
                        </div>
                    </section>
                    <br></br>
                    <section className="updates no-padding-top">
                        <div className="container-fluid">
                            <div className="row"> 
                                <Postprovider>
                                    <Postview/>
                                </Postprovider>
                                <Meetingprovider>
                                    <Meetingview/>
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

export default Homepage;