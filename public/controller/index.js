
//============================ Functions =============================
// TODO 1: Sign in Firebase with credential from the Google user.
function signIn() { 
    var provider = new firebase.auth.GoogleAuthProvider();
    //To localize the provider's OAuth flow to the user's preferred language without explicitly passing the relevant custom OAuth parameters
    //firebase.auth().languageCode = 'pt';
    firebase.auth().useDeviceLanguage();
    //call setCustomParameters on the initialized provider with an object containing the key as specified by the OAuth provider documentation and the corresponding value
    provider.setCustomParameters({
      'login_hint': 'user@gmail.com'
    });
    //
    firebase.auth().signInWithPopup(provider).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });
}
// TODO 1+: Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// TODO 2: Sign out of Firebase.
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}

// TODO 3: Initialize Firebase
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// TODO: Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}







// TODO: Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running using `firebase serve`');
    }
}
  
// Checks that Firebase has been imported.
checkSetup();

//============================== Get element ==========================
var signInButtonElement = document.getElementById('sign-in');



//============================ Set Event Listener========================
signInButtonElement.addEventListener('click', signIn);
