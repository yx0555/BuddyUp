<template>
  <div id="page">
    <section>
      <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Buddy Up Logo" />
      <h1 class="text-center mb-4 font-bold text-lg">Reset your Password</h1>
      <br /><br />
      <article class="md:w-1/3 p-5 border rounded bg-gray-100 mx-auto">
        <transition name="fade">
          <p
            class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
            v-if="error"
          >
            {{ error }}
          </p>
        </transition>
        <form @submit.prevent>
          <div class="mb-4">
            <label for="email" class="font-bold text-gray-700">Email: </label>
            <input
              type="email"
              placeholder="Enter your registered email address"
              v-model="email"
              id="emailField"
              class="bg-white px-4 py-2 border rounded w-full"
              required
            />
          </div>
          <br>
          <div class="mb-4">
            <button
              id="submitButton"
              type="submit"
              @click="sendEmail"
              class="
                bg-green-500
                px-4
                py-2
                rounded
                text-white
                border border-green-600
                transition
                duration-500
                ease-in-out
                hover:bg-green-600
              "
            >
              <transition name="fade" mode="out-in">
                <span v-if="!emailSending">Send</span>
                <span v-else>Sending...</span>
              </transition>
            </button>
          </div>
        </form>
      </article>
    </section>
    <br>
    <router-link to="/"> Go back to login </router-link>
  </div>
</template>


<script>
// import firebaseApp from "../firebase.js"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: "ForgotPassword",

  data() {
    return {
      email: "",
      error: null,
      emailSending: false,
    };
  },
  methods: {
    sendEmail() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.emailSending = false;
        })
        .catch((error) => {
          this.emailSending = false;
          this.error = error.message;
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");

#page {
  background-color: #fff8f8;
  height: 100vh;
}

#logo {
  width: 200px;
  margin: auto;
  display: block;
}

h1 {
  background-color: #fff8f8
}

#emailField {
  width: 250px;
  height: 30px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  text-indent: 10px;
  margin: auto 7px auto 2px;
}

#submitButton {
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

</style>