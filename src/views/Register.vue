<template>
  <div id="app">
    <img src="@/assets/BuddyUpLogo.png" alt = "Buddy Up Logo">
  </div>

  <h1>CREATE AN ACCOUNT</h1>

  <div class = "registerMainContainer">
    <form id = "userRegistration">
      <div class = "formli">
        <label for = "fullName">Full Name: </label>
        <input type = "text" id = "fullName" required = "" placeholder = "Enter your Full Name"> <br><br>

        <label for = "username">Username: </label>
        <input type = "text" id = "username" required = "" placeholder = "Enter your Username"> <br><br>

        <label for = "emailAddress">Email Address: </label>
        <input type = "email" id = "emailAddress" required = "" placeholder = "Enter your Email"> <br><br>

        <label for = "password">Password: </label>
        <input type = "password" id = "password" required = "" placeholder = "Enter your Password"> <br><br>

        <label for = "repeatPassword">Repeat Password: </label>
        <input type = "password" id = "repeatPassword" required = "" placeholder = "Enter Password again"> <br><br>

        <div class = "signUp">
          <button id = "signUpButton" type="button" v-on:click="checkValidityOfForm()">Sign Up</button>
        </div>  

      </div>
    </form>
    <div id="loginPromptRouter">
      <router-link to="/login">Have an account? Login here!</router-link>
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const db = getFirestore(firebaseApp);

export default {
  
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    checkValidityOfForm() {
      const auth = getAuth()
      var userFullName = document.getElementById("fullName").value
      var userUsername = document.getElementById("username").value
      var userEmail = document.getElementById("emailAddress").value
      var userPassword = document.getElementById("password").value
      var userRepeatPassword = document.getElementById("repeatPassword").value
      if (userFullName == "") {
        alert("Please key in your Full Name");
      } else if (userUsername == "") {
        alert("Please key in a username");
      } else if (userEmail == "") {
        alert("Please key in your Email Address")
      } else if (userPassword == "") {
        alert("Please key in a password");
      } else if (userRepeatPassword == "") {
        alert("Please key in your password again")
      } else if (userPassword != userRepeatPassword) {
        alert("Your passwords are not the same. Please key in your passwords again.")
      } else {
        try {
          alert("We will be registering you: " + userFullName)
          const docRef = addDoc(collection(db, "Users"), {
            fullName: userFullName, username: userUsername, emailAddress: userEmail
          })
          console.log(docRef)
          document.getElementById('userRegistration').reset();
          // this.$emit("added")
          createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(() => {
              this.$router.push('/login')
            })
            .catch((error) => {
              alert(error.message)
            })};
          }
        catch(error) {
          console.error("Error adding document: ", error);
        }
      }
    } 
  }
}
</script>

<style scoped>

label {
  display: inline-block;
  width: 150px;
  margin-right: 5px;
  text-align: right;
}

input {
  size: 10;
}

#signUpButton {
  background-color: #F07575;
  border-radius: 4px;
  cursor: pointer;
}

#nav {
  padding: 30px
}
</style>