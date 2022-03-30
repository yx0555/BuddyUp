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
        <br /><br />
        <router-link :to="{ name: 'IndivBuddies', params: { id: 1 } }">{{
          this.buddyName1
        }}</router-link>
      </div>

      <div class="column">
        <img
          id="icon2"
          src="@/assets/buddyicon.png"
          width="150"
          alt="Buddy Icon"
        />
        <br /><br />
        <router-link :to="{ name: 'IndivBuddies', params: { id: 2 } }">{{
          this.buddyName2
        }}</router-link>
      </div>

      <div class="column">
        <img
          id="icon3"
          src="@/assets/buddyicon.png"
          width="150"
          alt="Buddy Icon"
        />
        <br /><br />
        <router-link :to="{ name: 'IndivBuddies', params: { id: 3 } }">{{
          this.buddyName3
        }}</router-link>
      </div>
    </div>

    <div class="row">
      <br />
      <button id="addbutton" type="button" v-on:click="addbuddy()">
        Add a buddy
      </button>
    </div>
  </div>
  <div v-else>
    <h1>you must be logged in to view this page</h1>
    <Login route="mybuddies" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import firebaseApp from "../firebase.js";
import Login from "../components/Login.vue";

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
    Login,
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

      var x;
      if (buddy1 == "" || buddy1 == null) {
        x = 1;
      } else if (buddy2 == "" || buddy2 == null) {
        x = 2;
      } else if (buddy3 == "" || buddy3 == null) {
        x = 3;
      } else {
        alert("Maximum number of buddies reached");
      }

      var available = false;

      const querySnap = await getDocs(query(collection(db, "Buddies")));
      try {
        querySnap.forEach((d) => {
          if (
            (d.data().gender == genderPref || genderPref == "noPreferences") &&
            d.data().region == region &&
            (d.data().userID == "" || d.data().userID == null) &&
            languageArray.includes(d.data().language)
          ) {
            if (x == 1) {
              updateDoc(doc(db, "Buddies", d.id), {
                userID: uid,
              });
              updateDoc(doc(db, "Users", uid), {
                buddyID1: d.id,
                buddyName1: d.data().buddyName,
              });
              alert(d.data().buddyName + " is your new buddy");
              available = true;
              throw "Break";
            } else if (x == 2) {
              updateDoc(doc(db, "Buddies", d.id), {
                userID: uid,
              });
              updateDoc(doc(db, "Users", uid), {
                buddyID2: d.id,
                buddyName2: d.data().buddyName,
              });
              alert(d.data().buddyName + " is your new buddy");
              available = true;
              throw "Break";
            } else if (x == 3) {
              updateDoc(doc(db, "Buddies", d.id), {
                userID: uid,
              });
              updateDoc(doc(db, "Users", uid), {
                buddyID3: d.id,
                buddyName3: d.data().buddyName,
              });
              alert(d.data().buddyName + " is your new buddy");
              available = true;
              throw "Break";
            }
          }
        });
      } catch (e) {
        if (e !== "Break") throw e;
      } finally {
        if (x != null && available == false) {
          alert("No Buddies Available");
        }
      }
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },
  },

  data() {
    return {
      user: false,
      buddyName1: "",
      buddyName2: "",
      buddyName3: "",
      buddyID1: "",
      buddyID2: "",
      buddyID3: "",
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        var uid = user.uid;
        const docRef = getDoc(doc(db, "Users", uid));
        var vm = this;
        docRef.then(function (snapshot) {
          const name1 = snapshot.data().buddyName1;
          vm.buddyName1 = name1;
          const name2 = snapshot.data().buddyName2;
          vm.buddyName2 = name2;
          const name3 = snapshot.data().buddyName3;
          vm.buddyName3 = name3;
        });
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