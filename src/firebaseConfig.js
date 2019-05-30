import { firebase } from "@firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


// firebase init
const config = {
  apiKey: "AIzaSyCXH6iFvo6O1a0O3UuNUDixQHiFEfVD49M",
  authDomain: "thingstodo-4add9.firebaseapp.com",
  databaseURL: "https://thingstodo-4add9.firebaseio.com",
  projectId: "thingstodo-4add9",
  storageBucket: "thingstodo-4add9.appspot.com",
  messagingSenderId: "671229048720",
  appId: "1:671229048720:web:039f4df0f1d66fa7"
}
firebase.initializeApp(config)

// firebase utils
const database = firebase.firestore()
var listCollection = database.collection("todo-lists");

// date issue fix according to firebase
const settings = { timestampsInSnapshots: true }
database.settings(settings)

export {
  firebase,
  database,
  listCollection
}
