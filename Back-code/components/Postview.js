import React, { Component,useContext }from 'react';
import { firestore} from '../firebaseconfig';
import Post from '../components/Post';
import Postadd from '../components/Postadd';
//TODO: get data form post provider
import {PostContext} from '../providers/Postprovider';

const Postview=()=>{
  
  const handleRemove= (id)=>{
    var confirm=window.confirm("Are you sure you want to remove this post?");
    if(confirm==true){
      //TODO:Delete data from db
    firestore.collection('posts').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    }
  }
  const posts=useContext(PostContext);

  return (
    <div className="col-lg-8">

      <div className="daily-feeds card">

        <Postadd/>

        <div className="card-header">
          <h3 className="h4">Daily Posts</h3>
        </div>


        <div id="tutor-post-box" className="card-body no-padding">

          {posts.map(post => <Post {...post} key={post.id} onRemove={handleRemove} />)}
          
        </div>

      </div>
    </div>
  );
  
  
  


}


export default Postview;

