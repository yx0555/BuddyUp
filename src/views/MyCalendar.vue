<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h1>My Calendar Page</h1>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,
    SideBar,
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

<style scoped>
.page {
  margin-left: 200px;
}
</style>