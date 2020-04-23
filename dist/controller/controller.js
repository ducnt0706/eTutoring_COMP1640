//================================ FUNCTIONS =================================

//------------------- Handle Login -------------------
// TODO 1: Sign in Firebase with credential from the Google user.
function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    //console.log('User>>Goole>>>>', user);
    userId = user.uid;

  }).catch(function (error) {
    console.error('Error: hande error here>>>', error.code)
  })
}

// TODO 2: Sign out of Firebase.
function signOut() {
  firebase.auth().signOut().then(function () {
    // Redirect to google sign out.
    //window.location.assign('https://accounts.google.com/logout');
  }).catch(function (error) {
    // Error occurred.
  })
}

// TODO 3: Initialize Firebase and Listen user state changes.
function initFirebaseAuth() {
    
    firebase.auth().onAuthStateChanged(user => {
    // Present tutor dashboard 
    if (user != null && firebase.auth().currentUser.uid == "iC8d3oEGkRY7qbjsoiJCJ0mkG5y2") { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      userName = getUserName();

      // Set the user's profile pic and name.
      $('#tutor-dashboard-page').show();
      $('#login-page').hide();

      // Show user's profile and sign-out button.
      $('#user-name').text(userName);
      $('#user-avatar').attr('src', profilePicUrl);

      //show list Tutor & list Student 




    } else {
      // User is signed out!
      $('#tutor-dashboard-page').hide();
      $('#login-page').show();
    }
  });
}

assignToturWithStudent = () => {

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
// TODO 10 :check if user is student ==>dang bi sai
function isStudentAccount(uId) {

}

//------------------- End Handle Login! -------------------


// // TODO 8: CREATE NEW document of student
// function createStudentInfo(){
//   //Note: If want to user auto ID just use doc();
//   firebase.firestore().collection('students').doc('AkK6ZIFjjnPP8VB40rKoKlYKOJi1').set({
//     name:"Duc Dap Chai",
//     mssv:"GCH1745",
//     moblie:"038147",
//     gmail:"abc@gmail.com"
//   }).then(()=>{
//     console.log("Document successfully written!");
//   });
// }

//TODO 9: CREATE NEW document of tutor info
// function createTutorInfo(){
//   //Note: If want to user auto ID just use doc();
//   // To update new property do the same with set({new property},{merge:true})
//   db.collection('tutors').doc('').set({
//     name:"Name of tutor",
//     gmail:"abc@gmail.com"
//   }).then(()=>{
//     console.log(" Document of tutor successfully written!");
//   });
// }

// TODO 10: Create new contact 
function createContact(tutoruid, studentid) {
  firebase.firestore().collection('contacts').doc(tutoruid).collection('students').doc(studentid).set({
    name: "Co be ngoan hien",
    mssv: "GCH84245",
    mobile: "016732184122",
    gmail: "cobengoanhien@gmail.com"
  }).then(() => {
    console.log(" Contact Document successfully written!");
  });
}
// TODO 11: get contact by tutor id 
function getContactByTutor(tutoruid) {
  firebase.firestore().collection('contacts').doc(tutoruid).collection('students').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots       
      // Render contact interface
      // renderContact(doc);
      renderTotur()
      //console.log('data1:', doc.data())
    });
  });
}





// TODO 12: render contact interface



//get list students from server

var arrayStu = []

function getStudent() {
  $("#listStudent").empty();
  $("#options-Stu").empty();

  firebase.firestore().collection('listStudent').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      if (doc.data().supported === "no") {
        renderStudent(doc.data())
        renderOptionStu(doc.data())
        arrayStu.push(doc.data())
      }
    });
  });
}
//renderList Student
renderStudent = (stu) => {
  var student = `
  <li class="list-group-item">Name:  ${stu.name} </li>
  <li class="list-group-item">Email: ${stu.email}</li>  
  <br/>
  `
  $('#listStudent').append(student);
}

renderOptionStu = (stu) => {
  var op =
    `
  <option value=${stu.email}>
  `
  $('#options-Stu').append(op);

}

//================================ End Handle meeting funtion !==========================
//================================= Handle post function ========================
// TODO: Checking when user add image to post

function createNewPost(file) {
  const form = document.querySelector('#create-new-post');
  var post = {
    tutorgmail: getGmail(),
    tutorname: getUserName(),
    tutorPictureurl: getProfilePicUrl(),
    imageUrl: 'img/hotgirl1.jpg',
    content: form.content.value,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    loves: 0
  };
  firebase.firestore().collection('posts').add(post).then((postRef)=>{
    // Upload the image to cloud
    var filePath=getUid()+'/'+postRef.id+'/'+file.name;
    return firebase.storage().ref(filePath).put(file).then((fileSnapshot)=>{
      // Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url)=>{
        // Update the chat message placeholder with the image's URL.
        return postRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    })
  });
}

// -------------Show List of Assign
function getListShow() {
  
  $('#show-list').empty()
  console.log('kkkkkkkk')
  firebase.firestore().collection('ListAssignOfTotur').get().then(
    (snap => snap.forEach(
      (doc) => {
        renderListAssign(doc.data())
      }
    ))
  )
}

renderListAssign = (data) => {
  //console.log(data)

  var list = `
              <div class="col" class="border">
                <h1 class="p-3 mb-2 bg-info text-white">${data.name}</h1>
                <ul class="list-group" id={"item"}>
                  ${data.students.map((i)=>{ 
                    console.log(i)
                    return(
                      `<li class="list-group-item list-group-item-success">${i}
                          <button type="button" class="close" aria-label="Close" id="delete" onclick="myFunction('${i}','${data.email}')"  >
                              <span aria-hidden="true">&times</span>
                          </button>
                      </li>  `       
                    )
                    })
                  }
                </ul>
              </div>
              `

  $('#show-list').append(list);
}




function myFunction(stu, totur) {
  
  var r = confirm("Do you want to delete assign,right ????");
  if (r == true) {
    //alert(x + y)
    //update student
    firebase.firestore().collection('listStudent').doc(stu)
      .update({
        "supported":"no" , 
      })
      .then(function() {
          console.log("Student update successfully !!");
      });
    //update list assign 
    firebase.firestore().collection('ListAssignOfTotur').doc(totur)
    .update({
      "students": firebase.firestore.FieldValue.arrayRemove(stu),
    })
    .then(function () {
      console.log("Totur update successfully !!");
    })
    .catch(err=>console.log('loiiii',err))
    ;

    getListShow();

  } else {
    //alert('stoppp ')
  }

}

function vip(){
  
}

//------------------

function tutorContactClick() {
  getToturs();
  getStudent();

  $('#tutor-page-header').text("AssingStudent&Totur");
  $('#tutor-dashboard-header').hide();
  $('#dashboard-infor').hide();
  $('#tutor-contact-card').show();
  $('#form-assign').show()
  $('#list-assigns').hide();

}

function tutorDashboardClick() {
  $('#tutor-page-header').text("Dashboard");
  $('#tutor-contact-card').hide();
  $('#tutor-dashboard-header').show();
  $('#form-assign').hide();
  $('#dashboard-infor').show();
  $('#list-assigns').hide();


}

function initialTutorDesign() {
  getContactByTutor('EYjCZIaYnIemSOjOGPONPBIFM2g1');
  $('#tutor-contact-card').hide();
  $('#list-stu').hide();
  $('#form-assign').hide();
  $('#list-assigns').hide();
}




//=================================== ADD EVENTS ===============================

$('#sign-out').on('click', signOut);
$('#sign-out2').on('click', signOut);
$('#sign-in').on('click', signIn);

$('#btn-tutor-contact').on('click', tutorContactClick);
$('#btn-tutor-dashboard').on('click', tutorDashboardClick);
$('#btn-tutor-listAssign').on('click', clickListAssing);



//create post event ===> can xu ly lai
// const file=null;
// document.getElementById('mediaInputPost').addEventListener('change',(e)=>{
//  //get file
//  file = e.target.files[0];
// });

$("#postSubmit").on('click', () => {
  $("#create-new-post").submit(createNewPost);
});

// when create new meeting
$('#meetingSubmit').on('click',onMeetingSubmit);

// Region for admin

// Set up initial

// Listen user state changes
initFirebaseAuth();
// getStudent();
// test1()
// console.log(" update successfully !!");
// getListShow()

// getToturs();
initialTutorDesign();
// Region for tutor
