import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6NiATiGy5Qme0ZBgJK1GttkbZJSBrk68",
  authDomain: "blog23-167417.firebaseapp.com",
  databaseURL: "https://blog23-167417.firebaseio.com",
  projectId: "blog23-167417",
  storageBucket: "blog23-167417.appspot.com",
  messagingSenderId: "897040135213",
  appId: "1:897040135213:web:7e18164bb6a722a1d434a4",
  measurementId: "G-KQ7JK87CF9",
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;
