import React, { Component } from 'react';
import Modal from 'react-modal';
import { firestore,fireauth} from '../firebaseconfig';

class Meetingadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
            content:'',
            date: '',
            studentgmail:'',
            studentname:'',
            time:'',
            title:'',
        }
    }
    getUserName=()=> {
    return fireauth.currentUser.displayName;
    }

    getGmail=()=> {
    return fireauth.currentUser.email;
    }


    toggleModal = ()=>{
    this.setState({isOpen:!this.state.isOpen})
    } 

    handleCreate=(e)=> {
        e.preventDefault();
        var meetingDoc = {
          studentgmail: this.state.studentgmail,
          studentname: this.state.studentname,
          tutorname: this.getUserName(),
          tutorgmail: this.getGmail(),
          title: this.state.title,
          content: this.state.content,
          date: this.state.date,
          time: this.state.time,
          status: false
        }
        firestore.collection('meetings').add(meetingDoc).then(() => {
          console.log("Meeting Document successfully written!");
        })
        this.toggleModal()
      }

    render() {
        return (
            <div>
                <div className="card-close">
                    <div className="dropdown" onClick={this.toggleModal}>
                      <button type="button" className="dropdown-toggle text-success ">
                        <i className="fa fa-plus-square fa-2x"></i>
                      </button>
                    </div>
                </div>
                  <Modal
                        isOpen={this.state.isOpen}
                        style={customStyles1}
                        contentLabel="Example Modal"
                        >
                           
                                <div className="modal-content">


                                    <div className="modal-header">
                                        <h4 className="modal-title">New Meeting</h4>
                                        <button type="button" className="close" data-dismiss="modal" onClick={this.toggleModal}>&times;</button>
                                    </div>


                                    <div className="modal-body">
                                        <input type="text" placeholder="Title" onChange={txt=>this.setState({title:txt.target.value})} /><br />
                                        <textarea className="form-control" rows="1" placeholder="Content" onChange={txt=>this.setState({content:txt.target.value})} ></textarea>
                                        <input type="date" onChange={txt=>this.setState({date:txt.target.value})}/><br />
                                        <input type="time" onChange={txt=>this.setState({time:txt.target.value})} /><br />
                                        <div className="input-group mb-3">
                                            <div className="input-group-text">
                                                <input type="checkbox"  value="false" disabled />
                                            </div>
                                            <input type="text" className="form-control" placeholder="Waiting for student verify!" disabled />
                                        </div>
                                        <input type="email" placeholder="Email of student" onChange={txt=>this.setState({studentgmail:txt.target.value})} /><br />
                                        <input itype="text" placeholder="Name of student"  onChange={txt=>this.setState({studentname:txt.target.value})} /><br />
                                        <div>
                                            <button type="submit" className="btn btn-warning" onClick={this.handleCreate}>Done!</button>
                                            <div className="text-success"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.toggleModal}>Close</button>
                                </div>
                </Modal>
            </div>
        );
    }
}
const customStyles1 = {
    content : {
    marginTop:120,
      top                   : '35%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width:600
    }
  };

export default Meetingadd;