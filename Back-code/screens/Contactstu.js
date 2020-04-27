import React, { Component } from 'react';
import Footer from '../components/Footer';
import Contactviewstu from '../components/Contactviewstu';
import Contactprovider from '../providers/Contactprovider';

class Contactstu extends Component {
    render() {
        return (
            <div className="content-inner color-gradient-grey">
                <header className="page-header">
                    <div className="container-fluid">
                        <h2 className="no-margin-bottom">Contact</h2>
                    </div>
                </header>
                <div>
                    <section className="dashboard-counts no-padding-bottom ">
                        <Contactprovider>
                            <Contactviewstu/>
                        </Contactprovider> 
                    </section>
                </div>   
                <Footer/>
            </div>
        );
    }
}

export default Contactstu;