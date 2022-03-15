<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
    <h1>My Buddies Page</h1>
    <br />
    <div class="row">
      <div class="column">
        <img
          id="icon"
          src="@/assets/buddyicon.png"
          width="150"
          alt="Buddy Icon"
        />
        <br /><br /><router-link to="/indivbuddies/1">Buddy 1</router-link>
      </div>

      <div class="column">
        <img
          id="icon2"
          src="@/assets/buddyicon.png"
          width="150"
          alt="Buddy Icon"
        />
        <br /><br />
        <router-link to="/indivbuddies/2">Buddy 2</router-link>
      </div>

      <div class="column">
        <img
          id="icon3"
          src="@/assets/buddyicon.png"
          width="150"
          alt="Buddy Icon"
        />
        <br /><br />
        <router-link to="/indivbuddies/2">Buddy 3</router-link>
      </div>
    </div>

    <div class="row">
      <br />
      <button id="addbutton" type="button" v-on:click="addbuddy()">
        Add a buddy
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
// import firebaseApp from "../firebase.js";
// import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// const db = getFirestore(firebaseApp);

export default {
  components: {
    NavBar,
  },

  methods: {
    addbuddy() {
      var image = document.getElementById("icon");
      image.src = "@/assets/buddyicon.png";
    },
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
#icon {
  color: antiquewhite;
}

#addbutton {
  font-family: Helvetica;
  background-color: lightpink;
  font-size: 15px;
  border-radius: 5px;
}

.column {
  float: left;
  width: 33.33%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>