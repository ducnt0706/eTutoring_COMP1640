import React, { Component,createContext } from 'react';
import {firestore} from '../firebaseconfig';

export const ContactContext=createContext();

class Contactprovider extends Component {
    state = {contacts:[]}

    componentDidMount = () => {
        firestore.collection('contacts').onSnapshot(snapshot =>{
            const contacts=snapshot.docs.map(doc => {
              return {
                  id:doc.id,
                  studentgmail:doc.data().studentgmail,
                  studentname:doc.data().studentname,
                  studentmobile: doc.data().studentmobile,
                  studentmssv: doc.data().studentmssv,
                  studenttimeinteract: doc.data().studenttimeinteract,
                  tutorgmail:doc.data().tutorgmail,
                  tutorname:doc.data().tutorname,
                  tutormobile: doc.data().tutormobile,
              }
            });
            this.setState({ contacts });
        });
        
    }

    render() {
        const {contacts} = this.state;
        const {children}=this.props;
        return (
            <ContactContext.Provider value={contacts}>{children}</ContactContext.Provider>
        );
    }
}

export default Contactprovider;