<template>
  <div id="app">
    <img src="@/assets/BuddyUpLogo.png" alt="Buddy Up Logo" />
    <div>
      <form @submit.prevent="login">
        <h2>Login</h2>
        <input type="email" placeholder="Email address..." v-model="email" />
        <br />
        <input type="password" placeholder="Password..." v-model="password" />
        <br /><br />
        <button type="submit" v-on:click="submit()">Login</button>
      </form>
      <router-link to="/register"> Register here! </router-link>
      <router-link to="/forgotpassword"> Forgot password</router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebaseApp from '../firebase.js';
// import { getFirestore } from "firebase/firestore";

export default {
  name: "Login",

  props: {
    route: String,
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    submit() {
      let route = this.route;
      if (!this.route) {
        route = "/";
      }
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Signed in
          console.log("signed in successfully");
          this.$router.push(route);
          // ...
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    mounted() {
      console.log("the current router is:" + this.route);
    },
  },
};
</script>

<style scoped>
#app {
}
</style>
