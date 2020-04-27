import React, { useContext } from 'react';
import { UserContext } from '../providers/Userprovider';
import tuvetor from '../img/tuvetor.jpg';

const belongsToCurrentUser = (currentUser, gmail) => {
    if (!currentUser) return false;
    return currentUser.email === gmail;
}

const Contactstu = ({tutorgmail,tutormobile,tutorname,studentname,studentgmail,studentmobile,studentmssv,studenttimeinteract }) => {
    const {user} = useContext(UserContext);

    return (
        <div className="col-lg-4 ">
            {belongsToCurrentUser(user,studentgmail) &&
                <div className="client card">
                    <div className="card-close">
                        <button type="button" className="dropdown-toggle">
                            <i className="fa fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="card-body text-center">
                        <div className="client-avatar">
                            <img src={tuvetor} alt="Photo..." className="img-fluid rounded-circle" />
                            <div className="status bg-green"></div>
                        </div>
                        <div className="client-title">
                            <h3>{tutorname}</h3>
                            <h3>Personal tutor</h3>
                            <span>Contact</span>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <i className="fa fa-phone"></i><br /><small>{tutormobile}</small>
                            </div>
                            <div className="col-6">
                                <i className="fa fa-google-plus"></i><br /><small>{tutorgmail}</small>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Contactstu;