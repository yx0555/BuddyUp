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
        <br /><br /><router-link id="buddy1" to="/indivbuddies/1"
          >Buddy 1</router-link
        >
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
        <router-link to="/indivbuddies/$.id">Buddy 3</router-link>
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
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  query,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  components: {
    NavBar,
  },

  methods: {
    async addbuddy() {
      // var image = document.getElementById("icon");
      // image.src = "@/assets/buddyicon.png";
      var uid = auth.currentUser.uid;
      const snapshot = await getDoc(doc(db, "Users", uid));
      var genderPref = snapshot.data().genderPref;
      var region = snapshot.data().region;
    

      const querySnap = await getDocs(query(collection(db, "Buddies")));
      querySnap.forEach((doc) => {
        if (doc.data().gender == genderPref && doc.data().region == region) {
          document.getElementById("buddy1").innerHTML = doc.data().buddyName;
          this.buddyid_data = doc.id;
        } else {
          this.buddyid_data = "None";
        }
      });
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
      } else {
        alert("you must be logged in to view this page")
        this.$router.push("/")
      }
    });
    this.buddyid_data=this.$route.params.id;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");
#icon {
  color: antiquewhite;
}

.column{
  font-family: "Montserrat";
}

#addbutton {
  font-family: "Montserrat";
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