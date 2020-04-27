import React, { Component,createContext } from 'react';
import {firestore} from '../firebaseconfig';

export const MeetingContext=createContext();

class Meetingprovider extends Component {
    state = {meetings:[]}

    componentDidMount = () => {
        firestore.collection('meetings').orderBy('date','asc').onSnapshot(snapshot =>{
            const meetings=snapshot.docs.map(doc => {
              return {
                  id: doc.id,
                  content: doc.data().content,
                  date: doc.data().date,
                  status: doc.data().status,
                  studentgmail:doc.data().studentgmail,
                  studentname:doc.data().studentname,
                  time:doc.data().time,
                  title:doc.data().title,
                  tutorgmail:doc.data().tutorgmail,
                  tutorname:doc.data().tutorname,
              }
            });
            this.setState({ meetings});
          });
        
    }

    render() {
        const {meetings} = this.state;
        const {children}=this.props;
        return (
            <MeetingContext.Provider value={meetings}>{children}</MeetingContext.Provider>
        );
    }
}

export default Meetingprovider;