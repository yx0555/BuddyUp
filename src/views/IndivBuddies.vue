<template>
  <div class="page" style="text-align: center" v-if="user">
    <TopBar :componentName="componentName"/>
    <SideBar />
    <div class="container">
    <div class = "row">
      <div class="column right">
        <AddLog :buddynumber="buddynumber" @added="change" />
        <AddReminders :buddynumber="buddynumber" @added="change"/> <br>
      </div>

      <div class="column left"> 
        <LogDisplay :key="refreshComp" :buddynumber="buddynumber" />
        <!-- <ReminderDisplay :key="refreshComp2" :buddynumber="buddynumber" /> -->
      </div>
    </div>
    </div>

  </div>
  <div v-else>
    <h1>You must be logged in to view this page</h1>
    <Login :route="'indivbuddies/' + this.$route.params.id" />
    <Login />
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar.vue";
import AddLog from "../components/AddLog.vue";
import Login from "../components/Login.vue";
import LogDisplay from "../components/LogDisplay.vue";
import AddReminders from "../components/AddReminders.vue"
// import ReminderDisplay from "../components/ReminderDisplay.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "IndivBuddies",

  components: {
    TopBar,
    SideBar,
    AddLog,
    LogDisplay,
    Login,
    AddReminders,
    // ReminderDisplay
  },

  data() {
    return {
      user: false,
      refreshComp: 0,
      buddynumber: this.$route.params.id,
      componentName: "Individual Buddies"
    };
  },

  methods: {
    change() {
      this.refreshComp += 1;
    },
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = false;
      }
    });
  },
  
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");


.column {
  float: right;
}

.left{
  width: 60%;
}

.right {
  width: 40%;
  
}


.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width:1000px) {
  .column {
    width: 100%;
  }
}

.container{
  display: grid;
  grid-template-columns: auto;

}

.page {
  margin-left: 110px;
  height: 100%;
}
</style>