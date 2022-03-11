<template>
  <NavBar />
  <div id="app">
    <img src="@/assets/BuddyUpLogo.png" alt = "IDK WHY IS THIS IMAGE BROKEN HELP">
    <div>
      <form @submit.prevent="login">
        <h2>Login</h2>
        <input type="email" placeholder="Email address..." v-model="email"/>
        <input type="password" placeholder="password..." v-model="password"/>
        <button type = "submit" v-on:click="submit()">Login</button>

      </form>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebaseApp from '../firebase.js';
// import { getFirestore } from "firebase/firestore";


export default {
  components: {
    NavBar
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      }
    }
  },

  methods: {
    submit() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
        // Signed in 
        console.log("signed in successfully")
        this.$router.push('/home')
        // ...
      })
      .catch((error) => {
        alert(error.message)
      });
    }
  }

}
</script>

<style scoped>

</style>