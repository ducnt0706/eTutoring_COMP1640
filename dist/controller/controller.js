//================================ FUNCTIONS =================================
var userName="";
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
    // Present tutor dashboard 
<<<<<<< HEAD
    if (user!=null && firebase.auth().currentUser.uid=="OWDQX2WwEZVVISbjV8z73FbRUXs2") { // User is signed in!
=======
    if (user!=null && firebase.auth().currentUser.uid=="iC8d3oEGkRY7qbjsoiJCJ0mkG5y2") { // User is signed in!
>>>>>>> toan update
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      userName = getUserName();

      // Set the user's profile pic and name.
      $('#tutor-dashboard-page').show();
      $('#login-page').hide();

      // Show user's profile and sign-out button.
      $('#user-name').text(userName);
      $('#user-avatar').attr('src',profilePicUrl);

    }else{ 
      // User is signed out!
      $('#tutor-dashboard-page').hide();
      $('#login-page').show();
    }
  });
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

function getUid(){
  return firebase.auth().currentUser.uid;
}

// TODO 7: Return gmail of user

function getGmail(){
  return firebase.auth().currentUser.email;
}
// TODO 8: Return true if a user is signed-in.
function isUserSignedIn() { 
  return !!firebase.auth().currentUser;
}
// TODO 9: check if user is tutor ==>dang bi sai
function isTutorAccount(uId){
  firebase.firestore().collection('tutors').doc(uId).get().then((docSnapshot)=>{
    if(docSnapshot.exists){
      console.log(doc.id);
    }else{
      console.log("k log duoc");
    } 
  });
}
// TODO 10 :check if user is student ==>dang bi sai
function isStudentAccount(uId){
  
}

//------------------- End Handle Login! -------------------

// TODO 7: Return contact of student
function getStudentInfo(){
  
  firebase.firestore().collection('students').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots       
        // Render contact interface
        renderContact(doc);
    });
});
}

// TODO 8: CREATE NEW document of student
function createStudentInfo(){
  //Note: If want to user auto ID just use doc();
  firebase.firestore().collection('students').doc('AkK6ZIFjjnPP8VB40rKoKlYKOJi1').set({
    name:"Duc Dap Chai",
    mssv:"GCH1745",
    moblie:"038147",
    gmail:"abc@gmail.com"
  }).then(()=>{
    console.log("Document successfully written!");
  });
}

//TODO 9: CREATE NEW document of tutor info
function createTutorInfo(){
  //Note: If want to user auto ID just use doc();
  // To update new property do the same with set({new property},{merge:true})
  db.collection('tutors').doc('').set({
    name:"Name of tutor",
    gmail:"abc@gmail.com"
  }).then(()=>{
    console.log(" Document of tutor successfully written!");
  });
}

// TODO 10: Create new contact 
function createContact(tutoruid,studentid) {
  firebase.firestore().collection('contacts').doc(tutoruid).collection('students').doc(studentid).set({
    name:"Co be ngoan hien",
    mssv:"GCH84245",
    mobile:"016732184122",
    gmail:"cobengoanhien@gmail.com"
  }).then(()=>{
    console.log(" Contact Document successfully written!");
  });
}
// TODO 11: get contact by tutor id 
function getContactByTutor(tutoruid){
  firebase.firestore().collection('contacts').doc(tutoruid).collection('students').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots       
        // Render contact interface
        renderContact(doc);
    });
});
}
// TODO 12: render contact interface
function renderContact(doc) {
  
  var studentcontact=
  '<div class="col-lg-4 student-contact">'+
                '<div class="client card">'+

                  '<div class="card-close">'+
                    '<div class="dropdown">'+
                      '<button type="button" id="closeCard2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle">'+
                        '<i class="fa fa-ellipsis-v"></i>'+
                        '</button>'+
                       '<div aria-labelledby="closeCard2" class="dropdown-menu dropdown-menu-right has-shadow">'+
                         '<a class="dropdown-item remove"><i class="fa fa-times"></i>Close</a>'+
                         '<a class="dropdown-item edit"> <i class="fa fa-gear"></i>Edit</a>'+
                        '</div>'+
                    '</div>'+
                  '</div>'+

                  '<div class="card-body text-center">'+
                    '<div class="client-avatar"><img src="img/avatar-2.jpg" alt="..." class="img-fluid rounded-circle">'+
                      '<div class="status bg-green"></div>'+
                    '</div>'+
                    '<div class="client-title">'+
                      '<h3>'+doc.data().name+'</h3>'+
                      '<h3>'+doc.data().mssv+'</h3>'+
                      '<a href="#">Message</a>'+
                    '</div>'+
                    '<div class="client-info">'+
                      '<div class="row">'+
                        '<div class="col-6"><strong>Mobile</strong><br><small>'+doc.data().mobile+'</small></div>'+
                       '<div class="col-6"><strong>Gmail</strong><br><small>'+doc.data().gmail+'</small></div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-between">'+
                      '<div class="col-6"><i class="fa fa-phone"></i></div>'+
                      '<div class="col-6"><i class="fa fa-google-plus"></i></div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
  '</div>';

  $('#tutor-row-contact') .append(studentcontact);

  

}

function tutorContactClick(){
  $('#tutor-page-header').text("Contacts");
  $('#tutor-dashboard-header').hide();
  
  $('#tutor-contact-card').show();
}
function tutorDashboardClick(){
  $('#tutor-page-header').text("Dashboard");
  $('#tutor-contact-card').hide();
  $('#tutor-dashboard-header').show();
}
function initialTutorDesign(){
  getContactByTutor('EYjCZIaYnIemSOjOGPONPBIFM2g1');
  $('#tutor-contact-card').hide();
}


//=================================== ADD EVENTS ===============================

$('#sign-out').on('click', signOut);
$('#sign-out2').on('click', signOut);
$('#sign-in').on('click', signIn);

$('#btn-tutor-contact').on('click', tutorContactClick);
$('#btn-tutor-dashboard').on('click', tutorDashboardClick);
// Region for admin

// Set up initial

// Listen user state changes
initFirebaseAuth();


initialTutorDesign();
// Region for tutor
console.log();
