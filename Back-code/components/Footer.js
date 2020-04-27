import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="main-footer">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-6">
                        <p>eTutoring company &copy; 2019-2020</p>
                    </div>
                    <div className="col-sm-6 text-right">
                        <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Bootstrapious</a></p>
                    </div>
                    </div>
                </div>
        </footer>
        );
    }
}

export default Footer;