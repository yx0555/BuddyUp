<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
    <div>
      <h1>Current Buddy id is {{ this.buddyId }}</h1>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "IndivBuddies",

  components: {
    NavBar,
  },

  data() {
    return {
      buddyId: this.$route.params.id,
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