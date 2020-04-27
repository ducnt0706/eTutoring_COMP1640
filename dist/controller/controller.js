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
  var listUid = []
    firebase.firestore().collection('listStudent').get()
    .then((docSnapshot)=>{
      docSnapshot.forEach((doc)=>{
        listUid.push(doc.data().uid)
      })
    }).
    then(()=>{
      firebase.auth().onAuthStateChanged(user => {
        var time = new Date()
        // Present tutor dashboard 
        if (user != null && listUid.includes(firebase.auth().currentUser.uid)) { // User is signed in!
    
          // Get the signed-in user's profile pic and name.
          var profilePicUrl = getProfilePicUrl();
          var userName = getUserName();
    
          // Set the user's profile pic and name.
          $('#tutor-dashboard-page').show();
          $('#login-page').hide();
    
          // Show user's profile and sign-out button.
          $('#user-name').text(userName);
          $('#user-avatar').attr('src', profilePicUrl);
        
          
    
        } else {
          // User is signed out!
          $('#tutor-dashboard-page').hide();
          $('#login-page').show();
        }
      }
      
      );
    })

    console.log('my arrays',listUid)

  
}

// TODO 4: Return the user's profile pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/img/avatar-9.jpg';
}

// TODO 5: Return the user's display name.
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
    if (docSnapshot.exists) {
      console.log(doc.id);
    } else {
      console.log("k log duoc");
    }
  });
}


//------------------- End Handle Login! -------------------


//============================================Handle contact=============

// TODO 10: get contact by student id 
function getContactByStudent(studentgmail) {
  firebase.firestore().collection('studentcontacts').doc(studentgmail).collection('tutor').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots       
      // Render contact interface
      renderContact(doc);
      rendertutormessenger(doc);
    });
  });
}

// TODO 11: render contact interface
function renderContact(doc) {
  var studentcontact =
    '<div class="col-lg-6 student-contact">' +
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
    '<a href="chat.html">Message</a>' +
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

// TODO 12: render list contact of messenger
function rendertutormessenger(doc) {
  var tutormessenger =
  '<div class="chat_list active_chat">' +
    '<div class="chat_people">' +
      '<div class="chat_img">' +
        '<img class="img-fluid" alt="Anderson" src="img/avatar-2.jpg">' +
      '</div>' +
      '<div class="chat_ib">' +
        '<h5>' + doc.data().name + '<span class="chat_date">5 hours ago</span>' + '</h5>' +
        '<p>' + 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' + '</p>' +
      '</div>' +
    '</div>' +
  '</div>';
  $('#tutor-mess-contact').append(tutormessenger);
}

// TODO 13: Saves a new message to your Cloud Firestore database.
function onMessSubmit(e) {
  e.preventDefault();
  var name = getUserName();
  var studentgmail = getGmail();
  var text = $('#inputmessage').val();
  var profilePicUrl = getProfilePicUrl();
  if (text != "") {
    createNewMess(name, studentgmail, text, profilePicUrl);
  }
}

function createNewMess(name, studentgmail, text, profilePicUrl) {
  var messDoc = {
    name: name,
    studentgmail : studentgmail,
    text: text,
    profilePicUrl: profilePicUrl,
    time: firebase.firestore.FieldValue.serverTimestamp()
  }
  firebase.firestore().collection('messenger').add(messDoc).then(() => {
    console.log("Messenger Document successfully written!");
  })
}

function renderMess(doc) {
  var messItem =
  '<div class="incoming_msg">' +
    '<div class="incoming_msg_img">' +
      '<img class="img-fluid" alt="Alexander" src="'+ doc.data().profilePicUrl + '">' +
    '</div>' +
    '<div class="received_msg">' +
      '<div class="received_withd_msg">' +
        '<p>' + doc.data().text + '</p>' +
        '<span class="time_date">' + doc.data().time.toDate() + '</span>' +
      '</div>' +
    '</div>' +
  '</div>';

  $('#messages-box').append(messItem);
}

function getMessByStudent(studentgmail) {
  firebase.firestore().collection('messenger').where("studentgmail", "==", studentgmail).limit(10).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      renderMess(doc);
    });
  });
}


//============================================ Handle contact End! =============

function renderPost(doc){

}
function getPostByTutor() {

}
//================================== End post function !========================


//==============================Handlde loading interface setting
function tutorContactClick() {
  $('#tutor-page-header').text("Contacts");
  $('#tutor-dashboard-header').hide();
  $('#tutor-contact-card').show();
  $('#tutor-dashboard-timeline').hide();
  $('#tutor-messenger-card').hide();
}
function tutorDashboardClick() {
  $('#tutor-page-header').text("Dashboard");
  $('#tutor-contact-card').hide();
  $('#tutor-dashboard-header').show();
  $('#tutor-dashboard-timeline').show();
  $('#tutor-messenger-card').hide();
}
function initialTutorDesign() {
  $('#tutor-contact-card').hide();
  $('#tutor-messenger-card').hide();
}
function tutorMessengerClick() {
  $('#tutor-page-header').text("Messenger");
  $('#tutor-contact-card').hide();
  $('#tutor-dashboard-header').hide();
  $('#tutor-dashboard-timeline').hide();
  $('#tutor-messenger-card').show();
}
//==============================Handlde loading interface setting end!=======================

//=================================== ADD EVENTS ===============================

$('#sign-out').on('click', signOut);
$('#sign-in').on('click', signIn);

$('#btn-tutor-contact').on('click', tutorContactClick);
$('#btn-tutor-dashboard').on('click', tutorDashboardClick);
$('#btn-tutor-messenger').on('click', tutorMessengerClick);

// when send messenger
$('#submitmessenger').on('click',onMessSubmit);

// Region for admin

// Set up initial

// Listen user state changes
initFirebaseAuth();

initialTutorDesign();
// Region for tutor
//createNewMeeting("meeting3");
//createContact( "hannn@fpt.edu.vn","cobenhonhan@gmail.com");
