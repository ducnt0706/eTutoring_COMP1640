import React, { Component } from 'react';
import Footer from '../components/Footer';
import Contactview from '../components/Contactview';
import Contactprovider from '../providers/Contactprovider';

class Contact extends Component {
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
                            <Contactview/>
                        </Contactprovider> 
                    </section>
                </div>   
                <Footer/>
            </div>
        );
    }
}

export default Contact;