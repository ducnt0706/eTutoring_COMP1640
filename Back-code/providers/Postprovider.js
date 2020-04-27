import React, { Component,createContext } from 'react';
import {firestore} from '../firebaseconfig';

export const PostContext=createContext();

class Postprovider extends Component {
    state = {posts:[]}

    componentDidMount = () => {
        firestore.collection('posts').orderBy("time","desc").onSnapshot(snapshot =>{
          const posts = snapshot.docs.map(doc => {
            return {
              id:doc.id,
              content: doc.data().content,
              imageUrl: doc.data().imageUrl,
              loves: doc.data().loves,
              time: doc.data().time,
              tutorPictureurl: doc.data().tutorPictureurl,
              tutorgmail: doc.data().tutorgmail,
              tutorname: doc.data().tutorname,
            }
          });
          this.setState({posts});
        })
    }

    render() {
        const {posts} = this.state;
        const {children}=this.props;
        return (
            <PostContext.Provider value={posts}>{children}</PostContext.Provider>
        );
    }
}

export default Postprovider;