<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h1>My Calendar Page</h1>
  </div>
  <div v-else>
    <h1> You must be logged in to view this page </h1>
    <Login route="mycalendar" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import Login from "../components/Login.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,
    SideBar,
    Login,
  },

  data() {
    return {
      user: false,
      loading: false,
    };
  },

  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
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