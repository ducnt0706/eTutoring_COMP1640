import React, { useContext }from 'react';
import {firestore} from '../firebaseconfig';
import Meeting from '../components/Meeting';
import Meetingadd from '../components/Meetingadd';
//TODO: get data form post provider
import {MeetingContext} from '../providers/Meetingprovider';

const Meetingview=()=>{

  const handleRemove = (id)=>{
    var confirm=window.confirm("Are you sure you want to remove this meeting?");
    if(confirm==true){
      //TODO:Delete data from db
    firestore.collection('meetings').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    }
  }
  const meetings=useContext(MeetingContext);
  return (
    <div className="col-lg-4">
          <div className="recent-activities card">
            <Meetingadd/>
            <div className="card-header">
              <h3 className="h4">Meeting Activities</h3>
            </div>
            <div id="tutor-meeting-box" className="card-body no-padding">        
              {meetings.map(meeting => <Meeting {...meeting} key={meeting.id} onRemove={handleRemove} />)}
            </div>
          </div>
        </div>
  );
  
}


export default Meetingview;


  
