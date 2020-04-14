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
      if (user!=null && firebase.auth().currentUser.uid=="Cy9gnZjziDVD2Lxq9K9oRtILt1F2") { // User is signed in!
        
        window.location ="../index.html";
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();
        //to get uid of gmail
        var userId=firebase.auth().currentUser.uid;
        //to get gmail or emailVerified
        var userGmail=firebase.auth().currentUser.email;
        var userEmailVerified=firebase.auth().currentUser.emailVerified;

  
      };
      if(user!=null && firebase.auth().currentUser.uid=="e8TerPyh9fNIVYR6wviY1XZGysA3"){

      }
      if(user==null){ 
        // User is signed out!
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
  
  // TODO 6: Return true if a user is signed-in.
  function isUserSignedIn() { 
    return !!firebase.auth().currentUser;
  }


$('#sign-out').on('click', signOut);
$('#sign-out2').on('click', signOut);
$('#sign-in').on('click', signIn);