import React, { useContext } from 'react';
import Contact from '../components/Contact';
//TODO: get data form post provider
import {ContactContext} from '../providers/Contactprovider';


const Contactview=()=> {
    
    const contacts=useContext(ContactContext);

    return (
        <div className="container-fluid">
            <div className="row">
                {contacts.map(contact => <Contact {...contact} key={contact.id} />)}
            </div>
            
        </div>
        
    );
    
}

export default Contactview;