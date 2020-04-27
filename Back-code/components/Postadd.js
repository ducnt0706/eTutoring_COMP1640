import React, { Component } from 'react';
import Modal from 'react-modal';
import { firestore,fireauth,firestorage} from '../firebaseconfig';

class Postadd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            content: null,
            imageUrl: null,
            loves: null,
            time: null,
            tutorPictureurl: null,
            tutorgmail: null,
            tutorname: null,
            file: null
        }
    }
    getUserName=()=> {
        return fireauth.currentUser.displayName;
        }
    
    getGmail=()=> {
    return fireauth.currentUser.email;
    }

    getPhotoUrl=()=> {
        return fireauth.currentUser.photoURL;
    }

    toggleModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    handleCreate = (e) => {
        e.preventDefault();
        var file=this.state.file;
        var post = {
            content: this.state.content,
            loves: 0,
            time: new Date(),
            imageUrl: null,
            tutorPictureurl: this.getPhotoUrl(),
            tutorgmail: this.getGmail(),
            tutorname: this.getUserName()
        }
        firestore.collection('posts').add(post).then(function(postRef){
            // Upload the image to cloud
            var filePath = fireauth.currentUser.uid + '/' + postRef.id + '/' + file.name;
            return firestorage.ref(filePath).put(file).then((fileSnapshot) => {
              // Generate a public URL for the file.
              return fileSnapshot.ref.getDownloadURL().then((url) => {
                // Update the chat message placeholder with the image's URL.
                return postRef.update({
                  imageUrl: url,
                  storageUri: fileSnapshot.metadata.fullPath
                });
              });
            })
        }).catch(function (error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        });
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <div className="card-close" onClick={this.toggleModal}>
                <button type="button" className="dropdown-toggle text-success ">
                    <i className="fa fa-plus-square fa-2x"></i>
                </button>
            </div>
            <Modal
                isOpen={this.state.isOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Modal Heading</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={this.toggleModal}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <form id="create-new-post">
                            <input type="text" placeholder="What is your mind?" onChange={(txt) => this.setState({ content: txt.target.value })} />
                            <br />
                            <input type="file" accept="image/*" capture onChange={(e) => this.setState({ file: e.target.files[0]})} />
                            <br />
                            <button type="submit" className="btn btn-warning" onClick={this.handleCreate}>Post</button>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.toggleModal}>Close</button>
                    </div>

                </div>
            </Modal>
            </div>
        );
    }
}
const customStyles = {
    content : {
    marginTop:40,
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width:600
    }
};

export default Postadd;


