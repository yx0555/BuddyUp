<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h3>Upcoming Tasks</h3>
    <h3>Important Reminders</h3>
  </div>
  <div v-else>
    <Login route="" />
  </div>

</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import Login from "../components/Login.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,
    SideBar,
    Login
  },

  data() {
    return {
      refreshComp: 0,
      user: false,
    };
  },

  beforeMount() {
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
.page {
  margin-left: 200px;
}
</style>