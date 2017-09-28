// Initialize Firebase

// export const config = {
//   apiKey: "AIzaSyB0VkZanvFv8mpphfvvMP-RMjxxxCmdQ_Y",
//   authDomain: "vuekeep-53f72.firebaseapp.com",
//   databaseURL: "https://vuekeep-53f72.firebaseio.com",
//   projectId: "vuekeep-53f72",
//   storageBucket: "vuekeep-53f72.appspot.com",
//   messagingSenderId: "619538627737"
// };


import {initializeApp} from 'firebase'

const app = initializeApp(
  {
    apiKey: "AIzaSyB0VkZanvFv8mpphfvvMP-RMjxxxCmdQ_Y",
    authDomain: "vuekeep-53f72.firebaseapp.com",
    databaseURL: "https://vuekeep-53f72.firebaseio.com",
    projectId: "vuekeep-53f72",
    storageBucket: "",
    messagingSenderId: "619538627737"
  }
)

export const db = app.database()
export const titleRef = db.ref('titles')
