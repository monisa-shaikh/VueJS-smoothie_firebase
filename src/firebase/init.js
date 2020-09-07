  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBjlWT6QoMntojDGA2wstN0aZjntbW-cx0",
    authDomain: "ninja-smoothies-843bd.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-843bd.firebaseio.com",
    projectId: "ninja-smoothies-843bd",
    storageBucket: "ninja-smoothies-843bd.appspot.com",
    messagingSenderId: "79724644968",
    appId: "1:79724644968:web:bda7559d12796c5fb2c9dd",
    measurementId: "G-DDJ8BF5LYE"
  };
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

// for timestampsInSnapshots error
//   firebaseApp.firestore().settings({timestampsInSnapshots:true})

  //export firesote database
  export default firebaseApp.firestore()
  firebase.analytics();