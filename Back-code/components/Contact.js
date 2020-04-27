import React, { useContext } from 'react';
import { UserContext } from '../providers/Userprovider';
import stvetor from '../img/student.jpg';
import moment from 'moment';

const belongsToCurrentUser = (currentUser, gmail) => {
    if (!currentUser) return false;
    return currentUser.email === gmail;
}

const Contact = ({tutorgmail,tutorname,studentname,studentgmail,studentmobile,studentmssv,studenttimeinteract }) => {
    const {user} = useContext(UserContext);

    return (
        <div className="col-lg-4 ">
            {belongsToCurrentUser(user,tutorgmail) &&
                <div className="client card">
                    <div className="card-close">
                        <button type="button" className="dropdown-toggle">
                            <i className="fa fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="card-body text-center">
                        <div className="client-avatar">
                            <img src={stvetor} alt="Photo..." className="img-fluid rounded-circle" />
                            <div className="status bg-green"></div>
                        </div>
                        <div className="client-title">
                            <h3>{studentname}</h3>
                            <h3>{studentmssv}</h3>
                            <span>Contact</span>
                        </div>
                        <br />
                        <p className="text-danger">
                            Last Signin:{moment(studenttimeinteract.toDate()).calendar()}<br />
                            7 days no interact
                        </p>
                        <div className="row">
                            <div className="col-6">
                                <i className="fa fa-phone"></i><br /><small>{studentmobile}</small>
                            </div>
                            <div className="col-6">
                                <i className="fa fa-google-plus"></i><br /><small>{studentgmail}</small>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Contact;