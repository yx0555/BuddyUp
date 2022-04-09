<template>
  <div id = "page">
    <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Buddy Up Logo" />
    <br /><br />
    <h1>Create an Account</h1>
    <br />

    <div class="registerMainContainer">
      <form id="userRegistration">
        <div class="formli">
          <label for="fullName">Full Name: </label>
          <input
            type="text"
            id="fullNameField"
            required=""
            placeholder="Enter your Full Name"
          />
          <br /><br />

          <label for="username">Username: </label>
          <input
            type="text"
            id="usernameField"
            required=""
            placeholder="Enter your Username"
          />
          <br /><br />

          <label for="emailAddress">Email Address: </label>
          <input
            type="email"
            id="emailAddressField"
            required=""
            placeholder="Enter your Email"
          />
          <br /><br />

          <label for="password">Password: </label>
          <input
            type="password"
            id="passwordField"
            required=""
            placeholder="Enter your Password"
          />
          <br /><br />

          <label for="repeatPassword">Repeat Password: </label>
          <input
            type="password"
            id="repeatPasswordField"
            required=""
            placeholder="Enter your Password again"
          />
          <br /><br />

          <div class="signUp">
            <button
              id="signUpButton"
              type="button"
              v-on:click="checkValidityOfForm()"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div id="loginPromptRouter">
        <router-link to="/login">Have an account? Login here!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, setDoc, doc } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "Register",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    checkValidityOfForm() {
      const auth = getAuth();
      var userFullName = document.getElementById("fullName").value;
      var userUsername = document.getElementById("username").value;
      var userEmail = document.getElementById("emailAddress").value;
      var userPassword = document.getElementById("password").value;
      var userRepeatPassword = document.getElementById("repeatPassword").value;
      if (userFullName == "") {
        alert("Please key in your Full Name");
      } else if (userUsername == "") {
        alert("Please key in a username");
      } else if (userEmail == "") {
        alert("Please key in your Email Address");
      } else if (userPassword == "") {
        alert("Please key in a password");
      } else if (userRepeatPassword == "") {
        alert("Please key in your password again");
      } else if (userPassword != userRepeatPassword) {
        alert(
          "Your passwords are not the same. Please key in your passwords again."
        );
      } else {
        try {
          createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(() => {
              this.$router.push("/");

              var uid = auth.currentUser.uid;
              setDoc(doc(db, "Users", uid), {
                fullName: userFullName,
                username: userUsername,
                emailAddress: userEmail,
              });
              // console.log(docRef)
              document.getElementById("userRegistration").reset();
              // this.$emit("added")'
              alert("We will be registering you: " + userFullName);
            })
            .catch((error) => {
              alert(error.message);
            });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");

h1 {
  background-color: #fff8f8;
  font-size: 20px;
}

label {
  display: inline-block;
  width: 150px;
  margin-right: 5px;
  text-align: right;
}

#logo {
  width: 200px;
  margin: auto;
  display: block;
}

#loginPromptRouter {
  text-align: center;
  margin-top: 20px;
}

#page {
  background-color: #fff8f8;
  height: 100vh;
  
}

#signUpButton {
  background-color: #abe6e9;
  border: none;
  border-radius: 10px;
  padding: 7px;
  padding-left: 25px;
  padding-right: 25px;
  cursor: pointer;
  font-family: "Montserrat";
  font-weight: 700;
}

#nav {
  padding: 30px;
}

#fullNameField, #usernameField, #emailAddressField, #passwordField, #repeatPasswordField {
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  text-indent: 10px;
  margin: auto 7px auto 2px;
}

</style>