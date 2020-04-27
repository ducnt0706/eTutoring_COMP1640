import React, { useContext }from 'react';
import Poststu from '../components/Poststu';
//TODO: get data form post provider
import {PostContext} from '../providers/Postprovider';

const Postviewstu=()=>{
  
  const posts=useContext(PostContext);

  return (
    <div className="col-lg-8">

      <div className="daily-feeds card">

        <div className="card-header">
          <h3 className="h4">Daily Posts</h3>
        </div>


        <div id="tutor-post-box" className="card-body no-padding">

          {posts.map(post => <Poststu {...post} key={post.id} />)}
          
        </div>

      </div>
    </div>
  );
  
  
  


}


export default Postviewstu;

