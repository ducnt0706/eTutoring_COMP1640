import React, {useContext} from 'react';
import {UserContext} from '../providers/Userprovider';

const belongsToCurrentUser= (currentUser, gmail)=>{
    if(!currentUser) return false;
    return currentUser.email === gmail;
}

const Meetingstu = ({ id,content, date, status, studentgmail, studentname, time, title,tutorgmail,tutorname, onConfilm }) => {
    const {user}=useContext(UserContext);

    return (
        <div>
            {belongsToCurrentUser(user,studentgmail) && <div className="item">
            <div className="row">
                <div className="col-4 date-holder bg-color-orange">
                    <div className="text-right">
                        <div className={status?"icon bg-success pointer":"icon btn btn-outline-success pointer"} onClick={()=>onConfilm(id)} ><i className="fa fa-check "></i></div>
                    </div>
                    <div className="date text-center">
                        <h3 className="text-color-black">{time}</h3>
                        <h6 className="text-color-black">{date}</h6>
                        <div><i className={status ? "fa fa-thumbs-up fa-3x text-success" : "fa fa-paper-plane fa-3x"}></i></div>
                    </div>
                </div>
                <div id="tutor-meeting-content" className="col-8 content">
                    <h5>{title}</h5>
                    <h6>{content}</h6>
                    <p>{tutorname} <br/> {tutorgmail}</p>
                </div>
            </div>
            </div>}
        </div>
    )
}

export default Meetingstu;