<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
    <h1>My Calendar Page</h1>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        alert("you must be logged in to view this page")
        this.$router.push("/")
      }
    });
  },
};
</script>

<style>
</style>