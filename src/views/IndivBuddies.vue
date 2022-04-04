<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <AddReminders :buddynumber="buddynumber" @added="change"/>
    <div class="container">
      <div class="flex-child left">
        <AddLog :buddynumber="buddynumber" @added="change" />
      </div>
      <div class="flex-child right"> 
        <LogDisplay :key="refreshComp" :buddynumber="buddynumber" />
      </div>
    </div>
  </div>
  <div v-else>
    <h1>You must be logged in to view this page</h1>
    <Login :route="'indivbuddies/' + this.$route.params.id" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import AddLog from "../components/AddLog.vue";
import Login from "../components/Login.vue";
import LogDisplay from "../components/LogDisplay.vue";
import AddReminders from "../components/AddReminders.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "IndivBuddies",

  components: {
    NavBar,
    SideBar,
    AddLog,
    LogDisplay,
    Login,
    AddReminders,
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

.container{
  display:flex;
}

.flex-child {
    flex: 0.49;
}  

.right{
  margin-right: 40px;
}

</style>