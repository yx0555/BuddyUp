<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <AddLog :buddynumber="buddynumber" @added="change" />
    <LogDisplay :key="refreshComp" :buddynumber="buddynumber" />
  </div>
  <div v-else>
    <h1>You must be logged in to view this page</h1>
    <Login :route="'indivbuddies/' + this.$routes.params.id" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import AddLog from "../components/AddLog.vue";
import Login from "../components/Login.vue";
import LogDisplay from "../components/LogDisplay.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "IndivBuddies",

  components: {
    NavBar,
    SideBar,
    AddLog,
    LogDisplay,
    Login,
  },

  data() {
    return {
      user: false,
      refreshComp: 0,
      buddynumber: this.$route.params.id,
    };
  },

  methods: {
    change() {
      this.refreshComp += 1;
    },
  },

  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        alert("you must be logged in to view this page");
        this.$router.push("/");
      }
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
