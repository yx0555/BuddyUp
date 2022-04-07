<template>
  <div style="text-align: center" v-if="user">
    <TopBar />
    <h3>Page Not Found !!</h3>
    <h4>Please click on the available options</h4>
    <br />
  </div>
  <div v-else>
    <h3>Page Not Found !!</h3>
    <router-link to="/"> Go to login</router-link>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "NotFound",

  components: {
    TopBar,
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
      }
    });
  },
};
</script>

<style>
</style>