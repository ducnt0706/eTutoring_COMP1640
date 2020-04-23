//================================ FUNCTIONS =================================

//------------------- Handle Login -------------------
// TODO 1: Sign in Firebase with credential from the Google user.
function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// TODO 2: Sign out of Firebase.
function signOut() {
  firebase.auth().signOut();
}

// TODO 3: Initialize Firebase and Listen user state changes.
function initFirebaseAuth() {

  firebase.auth().onAuthStateChanged(user => {
    // User is signed in!
    if (user != null ) {
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userName = getUserName();
      // Set the user's profile pic and name.
      $('#tutor-dashboard-page').show();
      $('#login-page').hide();
      $('#user-name').text(userName);
      $('#user-avatar').attr('src', profilePicUrl);

      // Region for loading Post, meeting, contact
      loadPostByTutorGmail(getGmail());
      getContactByTutor(getGmail());
      getMeetingByTutor(getGmail());
    } else {
      // User is signed out!
      $('#tutor-dashboard-page').hide();
      $('#login-page').show();
    }
  });
}
// TODO 4: Return the user's profile pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL;
}
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// TODO 6: Return uid of gmail

function getUid() {
  return firebase.auth().currentUser.uid;
}

// TODO 7: Return gmail of user

function getGmail() {
  return firebase.auth().currentUser.email;
}

// TODO 8: Return true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}
// TODO 9: check if user is tutor ==>dang bi sai
function isTutorAccount(uId) {
  firebase.firestore().collection('tutors').doc(uId).get().then((docSnapshot) => {

  });
}
//------------------- End Handle Login! -------------------
//============================================Handle contact=============
// TODO 10: Create new contact 
function createContact(tutorgmail, studentgmail) {
  firebase.firestore().collection('tutorcontacts').doc(tutorgmail).collection('students').doc(studentgmail).set({
    name: "Co be hat hay",
    mssv: "GBH18362",
    mobile: "0168266371",
    gmail: "cobenhonhan124277@gmail.com"
  }).then(() => {
    console.log(" Contact Document successfully written!");
  });
}

function getContactByTutor(tutorgmail) {
  firebase.firestore().collection('tutorcontacts').doc(tutorgmail).collection('students').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots       
      // Render contact interface
      renderContact(doc);
    });
  });
}

// TODO 12: render contact interface
function renderContact(doc) {

  var studentcontact =
    '<div class="col-lg-4 student-contact">' +
    '<div class="client card">' +

    '<div class="card-close">' +
    '<div class="dropdown">' +
    '<button type="button" id="closeCard2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">' +
    '<i class="fa fa-ellipsis-v"></i>' +
    '</button>' +
    '<div aria-labelledby="closeCard2" class="dropdown-menu dropdown-menu-right has-shadow">' +
    '<a class="dropdown-item remove"><i class="fa fa-times"></i>Close</a>' +
    '<a class="dropdown-item edit"> <i class="fa fa-gear"></i>Edit</a>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '<div class="card-body text-center">' +
    '<div class="client-avatar"><img src="img/avatar-2.jpg" alt="..." class="img-fluid rounded-circle">' +
    '<div class="status bg-green"></div>' +
    '</div>' +
    '<div class="client-title">' +
    '<h3>' + doc.data().name + '</h3>' +
    '<h3>' + doc.data().mssv + '</h3>' +
    '<a href="#">Message</a>' +
    '</div>' +
    '<div class="client-info">' +
    '<div class="row">' +
    '<div class="col-6"><strong>Mobile</strong><br><small>' + doc.data().mobile + '</small></div>' +
    '<div class="col-6"><strong>Gmail</strong><br><small>' + doc.data().gmail + '</small></div>' +
    '</div>' +
    '</div>' +
    '<div class="row d-flex justify-content-between">' +
    '<div class="col-6"><i class="fa fa-phone"></i></div>' +
    '<div class="col-6"><i class="fa fa-google-plus"></i></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  $('#tutor-row-contact').append(studentcontact);



}
//============================================ Handle contact End! =============

//================================Handle meeting funtion==========================
//TODO: Create new meeting
function onMeetingSubmit(e) {
  e.preventDefault();
  var tutorname = getUserName();
  var tutorgmail = getGmail();
  var title = $('#titleInputMeeting').val();
  var content = $('#contentInputMeeting').val();
  var date = $('#dateInputMeeting').val();
  var time = $('#timeInputMeeting').val();
  var status = false;
  var studentgmail = $('#emailInputMeeting').val();
  var studentname = $('#nameInputMeeting').val();
  if (content != "") {
    createNewMeeting(tutorname, tutorgmail, title, content, date, time, status, studentgmail, studentname);
    $('#noticeMeeting').text("Adding successfully!");
  }
}

function createNewMeeting(tutorname, tutorgmail, title, content, date, time, status, studentgmail, studentname) {
  var meetingDoc = {
    studentgmail: studentgmail,
    studentname: studentname,
    tutorname: tutorname,
    tutorgmail: tutorgmail,
    title: title,
    content: content,
    date: date,
    time: time,
    status: status
  }
  firebase.firestore().collection('meetings').add(meetingDoc).then(() => {
    console.log("Meeting Document successfully written!");
  })
}
// TODO: render meeting interface
function renderMeeting(doc) {

  var meetingItem =
    '<div class="item">' +
    '<div class="row">' +
    '<div class="col-4 date-holder text-right item-meeting">' +
    '<div id="tutor-meeting-delete" class="icon bg-danger "><i class="fa fa-close "></i></div>' +
    '<div class="icon tutor-meeting-status"><i class="fa fa-check "></i></div>' +
    '<div class="date">' +
    '<h5>' + doc.data().time + '</h5>' +
    '<h7 class="text-info">' + doc.data().date + '</h7>' +
    '</div>' +
    '</div>' +
    '<div id="tutor-meeting-content" class="col-8 content">' +
    '<h5>' + doc.data().title + '</h5>' +
    '<p>' + doc.data().content + '</p>' +
    '<p>' + doc.data().studentname + '<br>' + doc.data().studentgmail + '</p>' +
    '</div>' +
    '</div>' +
    '</div>';

  $('#tutor-meeting-box').append(meetingItem);
  $("#tutor-meeting-delete").attr('id', doc.id);
  //add event delete buttons
  let newId = "#" + doc.id;
  $(newId).on('click', function (e) {
    e.stopPropagation();
    deleteMeeting(doc.id);
  })
  // Change status of meeting
  if (doc.data().status == true) {
    $('.tutor-meeting-status').attr("background-color", "#3cb371");
  };
};
// TODO: present meeting interface from db
function getMeetingByTutor(tutorGmail) {
  firebase.firestore().collection('meetings').where("tutorgmail", "==", tutorGmail).limit(10).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      renderMeeting(doc);
    });
  });
}
//TODO: delete meeting
function deleteMeeting(idMeeting) {
  firebase.firestore().collection("meetings").doc(idMeeting).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}
//TODO: update status meeting
function updateMeetingStatus(idMeeting) {
  firebase.firestore().collection("meetings").doc(idMeeting).update({
    status: true
  }).then(function () {
    console.log("Document successfully updated!");
  }).catch(function (error) {
    console.error("Error updating document: ", error);
  });
}

//================================ End Handle meeting funtion !==========================
//================================= Handle post function ========================
// TODO: Checking when user add image to post
function onPostSubmit(e) {
  e.preventDefault();
  var tutorgmail = getGmail();
  var tutorname = getUserName();
  var tutorPictureurl = getProfilePicUrl();
  var imageUrl = 'img/hotgirl1.jpg';
  var content = $('#contentInputPost').val();
  var loves = 0;
  let files = $('#mediaInputPost').change(function (e) {
    return e.target.files;
  });
  console.log(files[0].name);
  if (content != "") {
    //createNewPost(tutorgmail,tutorname,tutorPictureurl,imageUrl,content,time,loves,file);

  }
}

function createNewPost(tutorgmail, tutorname, tutorPictureurl, imageUrl, content, loves, file) {
  var post = {
    tutorgmail: tutorgmail,
    tutorname: tutorname,
    tutorPictureurl: tutorPictureurl,
    imageUrl: imageUrl,
    content: content,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    loves: loves
  };
  firebase.firestore().collection('posts').add(post).then((postRef) => {
    // Upload the image to cloud
    var filePath = getUid() + '/' + postRef.id + '/' + file.name;
    firebase.storage().ref(filePath).put(file).then((fileSnapshot) => {
      // Generate a public URL for the file.
      fileSnapshot.ref.getDownloadURL().then((url) => {
        // Update the chat message placeholder with the image's URL.
        postRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    })
  }).catch(function (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  });
}

  function renderPost(doc) {
    var postItem =
      '<div class="item">' +
      '<div class="feed d-flex justify-content-between">' +
      '<div class="feed-body d-flex justify-content-between">' +
      '<span class="feed-profile">' +
      '<img src="' + doc.data().tutorPictureurl + '" alt="person" class="img-fluid rounded-circle">' +
      '</span>' +
      '<div class="content">' +
      '<h5>' + doc.data().tutorname + '</h5>' +
      '<div class="full-date"><small>' + doc.data().time.toDate() + '</small></div>' +
      '<hr>' +
      '<p>' + doc.data().content + '</p>' +
      '<img src="' + doc.data().imageUrl + '" alt="Photo.." class="img-fluid">' +
      '<div class="CTAs">' +
      '<button class="btn btn-xs btn-secondary"> <i class="fa fa-heart"></i> Love</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';


    $('#tutor-post-box').append(postItem);
  }

  function loadPostByTutorGmail(tutorGmail) {
    var query = firebase.firestore()
      .collection('posts')
      .where("tutorgmail", "==", tutorGmail)
      .limit(10);
    query.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        renderPost(doc);
      })
    });
  }
  //=================================== For testing ======================
  function loadWhenSignedIn() {
    if (isUserSignedIn()) {
      var tutorgmail = getGmail();
      loadPostByTutorGmail("ducntgch17377@fpt.edu.vn");
      return true;
    }
    return false;
  }
  //================================== End post function !========================
  //==============================Handlde loading interface setting
  function tutorContactClick() {
    $('#tutor-page-header').text("Contacts");
    $('#tutor-dashboard-header').hide();
    $('#tutor-contact-card').show();
  }
  function tutorDashboardClick() {
    $('#tutor-page-header').text("Dashboard");
    $('#tutor-contact-card').hide();
    $('#tutor-dashboard-header').show();
    $('#tutor-dashboard-timeline').show();
  }
  function initialTutorDesign() {
    $('#tutor-contact-card').hide();
  }
  //==============================Handlde loading interface setting end!=======================
  //=================================== EVENTS WHEN USER INTERRACT WITH SYSTEm ===============================
  $('#sign-out').on('click', signOut);
  $('#sign-in').on('click', signIn);

  $('#btn-tutor-contact').on('click', tutorContactClick);
  $('#btn-tutor-dashboard').on('click', tutorDashboardClick);

//create post event ===> can xu ly lai
// const file=null;
// document.getElementById('mediaInputPost').addEventListener('change',(e)=>{
//  //get file
//  file = e.target.files[0];
// });

$("#postSubmit").on('click', onPostSubmit);

// when create new meeting
$('#meetingSubmit').on('click',onMeetingSubmit);

// Region for admin

// Set up initial

// Listen user state changes
initialTutorDesign();
// Region for tutor
//createNewMeeting("meeting3");
//createContact( "hannn@fpt.edu.vn","cobenhonhan@gmail.com");
//createNewPost("mypost","hannn@fpt.edu.vn","Han Nguyen Ngoc","ancancanc.com","dlaaknckac.com","Hello World",69);

initFirebaseAuth(); 