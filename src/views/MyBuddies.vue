<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
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
        <br /><br /><router-link id="buddy1" 
        to="{name: 'IndivBuddies', params: {id: this.buddy1id}}">Buddy 1</router-link
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
        <router-link to="/indivbuddies/3">Buddy 3</router-link>
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
import SideBar from "../components/SideBar.vue";
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  components: {
    NavBar,
    SideBar,
  },

  methods: {
    async addbuddy() {
      // var image = document.getElementById("icon");
      // image.src = "@/assets/buddyicon.png";
      var uid = auth.currentUser.uid;
      const snapshot = await getDoc(doc(db, "Users", uid));
      var genderPref = snapshot.data().genderPref;
      var region = snapshot.data().region;
      var languageArray = snapshot.data().languages;

      var buddy1 = snapshot.data().buddyID1;
      var buddy2 = snapshot.data().buddyID2;
      var buddy3 = snapshot.data().buddyID3;
      this.buddy1id = buddy1;

      var x;
      if (buddy1 == "") {
        x = 1;
      } else if (buddy2 == "") {
        x = 2;
      } else if (buddy3 == "") {
        x = 3;
      } else {
        alert("Maximum number of buddies reached");
      }

      var available = false;
      const querySnap = await getDocs(query(collection(db, "Buddies")));
      try {
        querySnap.forEach((d) => {
          if (
            d.data().gender == genderPref &&
            d.data().region == region &&
            d.data().userID == "" &&
            languageArray.includes(d.data().language) &&
            x == 1
          ) {
            console.log(d.id);
            updateDoc(doc(db, "Buddies", d.id), {
              userID: uid,
            });
            updateDoc(doc(db, "Users", uid), {
              buddyID1: d.id,
              buddyName1: d.data().buddyName,
            });
            document.getElementById("buddy1").innerHTML = d.data().buddyName;
            alert(d.data().buddyName + " is your new buddy");
            available = true;
            throw "Break";
          } else if (
            d.data().gender == genderPref &&
            d.data().region == region &&
            d.data().userID == "" &&
            languageArray.includes(d.data().language) &&
            x == 2
          ) {
            console.log(d.id);
            updateDoc(doc(db, "Buddies", d.id), {
              userID: uid,
            });
            updateDoc(doc(db, "Users", uid), {
              buddyID2: d.id,
              buddyName2: d.data().buddyName,
            });
            document.getElementById("buddy2").innerHTML = d.data().buddyName;
            alert(d.data().buddyName + " is your new buddy");
            available = true;
            throw "Break";
          } else if (
            d.data().gender == genderPref &&
            d.data().region == region &&
            d.data().userID == "" &&
            languageArray.includes(d.data().language) &&
            x == 3
          ) {
            console.log(d.id);
            updateDoc(doc(db, "Buddies", d.id), {
              userID: uid,
            });
            updateDoc(doc(db, "Users", uid), {
              buddyID3: d.id,
              buddyName3: d.data().buddyName,
            });
            document.getElementById("buddy3").innerHTML = d.data().buddyName;
            alert(d.data().buddyName + " is your new buddy");
            available = true;
            throw "Break";
          }
        });
      } catch (e) {
        if (e !== "Break") throw e;
      } finally {
        if (available == false) {
          alert("No Buddies Available");
        }
      }
    },
  },

  data() {
    return {
      user: false,
      buddy1id: null,
    };
  },

  mounted() {
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

.page {
  margin-left: 200px;
}

#icon {
  color: antiquewhite;
}

.column {
  font-family: "Montserrat";
  color: #000000;
}

#addbutton {
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  padding: 8px;
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