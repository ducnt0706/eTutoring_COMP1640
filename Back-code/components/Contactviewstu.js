import React, { useContext } from 'react';
import Contactstu from '../components/Contactstu';
//TODO: get data form post provider
import {ContactContext} from '../providers/Contactprovider';


const Contactviewstu=()=> {
    
    const contacts=useContext(ContactContext);

    return (
        <div className="container-fluid">
            <div className="row">
                {contacts.map(contact => <Contactstu {...contact} key={contact.id} />)}
            </div>
            
        </div>
        
    );
    
}

export default Contactviewstu;