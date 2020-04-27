
import React, { Component } from 'react';

class Notification extends Component {
    render() {
        return (
            <div>
                <li className="nav-item dropdown">
                    <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">
                        <i className="fa fa-bell-o"></i>
                        <span className="badge bg-red badge-corner">12</span>
                    </a>
                    <ul aria-labelledby="notifications" className="dropdown-menu">
                        <li>
                            <a rel="nofollow" href="#" className="dropdown-item">
                                <div className="notification">
                                    <div className="notification-content"><i className="fa fa-envelope bg-green"></i>You have 6 new messages</div>
                                    <div className="notification-time"><small>4 minutes ago</small></div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a rel="nofollow" href="#" className="dropdown-item">
                                <div className="notification">
                                    <div className="notification-content"><i className="fa fa-upload bg-orange"></i>Server Rebooted</div>
                                    <div className="notification-time"><small>4 minutes ago</small></div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a rel="nofollow" href="#" className="dropdown-item all-notifications text-center">
                                <strong>view all notifications </strong>
                            </a>
                        </li>
                    </ul>
                </li>
            </div>
        );
    }
}

export default Notification;
