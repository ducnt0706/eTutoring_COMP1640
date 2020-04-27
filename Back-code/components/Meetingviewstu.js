import React, { useContext }from 'react';
import {firestore} from '../firebaseconfig';
import Meetingstu from '../components/Meetingstu';
//TODO: get data form post provider
import {MeetingContext} from '../providers/Meetingprovider';

const Meetingviewstu =()=>{

  const handleConfilm = (id)=>{
    var confirm=window.confirm("Are you sure you want to join this meeting?");
    if(confirm==true){
      //TODO:Delete data from db
    firestore.collection('meetings').doc(id).update({
        status:true
    });
    }
  }

  const meetings=useContext(MeetingContext);
  return (
    <div className="col-lg-4">
          <div className="recent-activities card">
            <div className="card-header">
              <h3 className="h4">Meeting Activities</h3>
            </div>
            <div id="tutor-meeting-box" className="card-body no-padding">        
              {meetings.map(meeting => <Meetingstu {...meeting} key={meeting.id} onConfilm={handleConfilm} />)}
            </div>
          </div>
        </div>
  );
  
}


export default Meetingviewstu;


  
