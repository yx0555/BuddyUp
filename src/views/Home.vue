<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
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
      refreshComp: 0,
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