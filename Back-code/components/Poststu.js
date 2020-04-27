import React, {useContext} from 'react';
import {firestore} from '../firebaseconfig';
import moment from 'moment';
import {UserContext} from '../providers/Userprovider';

const belongsToCurrentUser= (currentUser, gmail)=>{
    if(!currentUser) return false;
    return currentUser.email === gmail;
}

const Poststu = ({id, content, imageUrl, loves, time, tutorPictureurl, tutorgmail, tutorname, onRemove}) => {
    const {user}=useContext(UserContext);

    const postRef= firestore.collection('posts').doc(id);
    const love =()=>postRef.update({loves:loves+1});

    if(imageUrl!=null){
        return (
            <div className="item" >
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between">
                        <span className="feed-profile">
                            <img src={tutorPictureurl} alt="person" className="img-fluid rounded-circle" />
                        </span>
    
                        <div className="content">
                            <h5>{tutorname}</h5>
                            <div className="full-date"><small>{moment(time.toDate()).calendar()}</small></div>
                            <hr />
                            <p>{content}</p>
                            <img src={imageUrl} alt="Photo.." className="img-fluid" />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <button className="btn btn-xs  container-fluid " onClick={love}><i className="fa fa-heart"></i> {loves} Loves</button>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-xs  container-fluid"><i className="fa fa-comments"></i> Comment</button>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div class="item clearfix">
                        <div class="feed d-flex justify-content-between">
                          <div class="feed-body d-flex justify-content-between">
                            <span class="feed-profile">
                              <img src="https://photo-2-baomoi.zadn.vn/w1000_r1/2019_08_10_119_31788589/3793ed558f15664b3f04.jpg" alt="person" class="img-fluid rounded-circle"/>
                            </span>
                            <div class="content">
                              <h6>Hoc sinh ngoan</h6>
                            </div>
                          </div>
                          <div class="date text-right"><small>5min ago</small></div>
                        </div>
                        <div class="quote has-shadow"> <small>thả tym 🧡</small>
                        </div>
                </div>   
            </div>
        )
    }else{
        return (
            <div className="item" >
                <div className="feed d-flex justify-content-between">
                    <div className="feed-body d-flex justify-content-between">
                        <span className="feed-profile">
                            <img src={tutorPictureurl} alt="person" className="img-fluid rounded-circle" />
                        </span>
    
                        <div className="content">
                            <h5>{tutorname}</h5>
                            <div className="full-date"><small>{moment(time.toDate()).calendar()}</small></div>
                            <hr />
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-4">
                        <button className="btn btn-xs  container-fluid " onClick={love}><i className="fa fa-heart"></i> {loves} Loves</button>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-xs  container-fluid"><i className="fa fa-comments"></i> Comment</button>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>   
            </div>
        )
    }
}

export default Poststu;