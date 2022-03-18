<template>
  <div style="text-align: center" v-if="user">
    <NavBar />

    <div class="title">
      <h1>Update My Particulars</h1>
    </div>

    <div class="profileMainContainer">
      <div class="leftDiv">
        <img id="dummyUserIcon" src="@/assets/man.png" alt="Dummy User Icon" />

        <!-- INSERT USERNAME OF USER -->
      </div>

      <div class="rightDiv">
        <form id="updateProfileDetails">
          <div id="formOfDetails">
            <!-- REGION -->
            <label for="region" id="formFields">Region: </label>
            <!-- Maybe can try using v-model instead -->
            <select name="region" id="region">
              <option value="">Please select one</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="central">Central</option>
            </select>
            <br /><br />

            <!-- LANGUAGES / DIALECTS -->
            <label for="languages" id="formFields">
              Languages/ Dialects:
            </label>
            <div class="multiselect">
              <div class="selectBox" v-on:click="showCheckboxes()">
                <select>
                  <option value="">Select option(s)</option>
                </select>
                <div class="overSelect"></div>
              </div>
              <div id="checkboxes">
                <label for="english">
                  <input
                    type="checkbox"
                    id="english"
                    value="english"
                  />English</label
                >

                <label for="chinese">
                  <input
                    type="checkbox"
                    id="chinese"
                    value="chinese"
                  />Chinese</label
                >

                <label for="malay">
                  <input type="checkbox" id="malay" value="malay" />Malay</label
                >
                <label for="tamil">
                  <input type="checkbox" id="tamil" value="tamil" />Tamil</label
                >
              </div>
            </div>
            <br /><br />

            <!-- GENDER PREFERENCES -->
            <label for="genderPreferences" id="formFields"
              >Buddy Gender Preferences:
            </label>
            <select name="genderPreferences" id="genderPreferences">
              <option value="">Please select one</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="noPreferences">No Preferences</option>
            </select>
            <br /><br />

            <!-- AVAILABILITY -->
            <label for="availability" id="formFields">Availability: </label>
            <select name="availability" id="availability">
              <option value="">Please select one</option>
              <optgroup label="Monday">
                <option value="firstSlot">0800HRS - 1100HRS</option>
                <option value="secondSlot">1100HRS - 1400HRS</option>
                <option value="secondSlot">1400HRS - 1700HRS</option>
                <option value="secondSlot">1700HRS - 2000HRS</option>
              </optgroup>
            </select>
            <br /><br />
          </div>
        </form>
        <!-- UPDATE BUTTON -->
        <div class="update">
          <button
            id="updateButton"
            type="button"
            v-on:click="saveParticulars()"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth();

var expanded = false;

export default {
  components: {
    NavBar,
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

  methods: {
    allLanguages() {
      // var userEnglish = document.querySelector('#english').checked
      // var userChinese = document.querySelector('#chinese').checked
    },

    saveParticulars() {
      var userRegion = document.getElementById("region").value;
      var userGenderPreferences =
        document.getElementById("genderPreferences").value;
      var uid = auth.currentUser.uid;
      updateDoc(doc(db, "Users", uid), {
        region: userRegion,
        genderPref: userGenderPreferences,
      });
    },

    showCheckboxes() {
      var checkboxes = document.getElementById("checkboxes");
      if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
      } else {
        checkboxes.style.display = "none";
        expanded = false;
      }
    },
  },
};
</script>

<style>
.profileMainContainer {
  left: 30%;
  right: 0;
}

.multiselect {
  /* width: 70%; */
  text-align: right;
}
.selectBox {
  position: relative;
}
/* .selectBox select {
  width: 100%;
} */
.overSelect {
  position: absolute;
  /* left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
}
#checkboxes {
  display: none;
  border: 1px #dadada solid;
  text-align: left;
  width: 70%;
  left: 70%;
}
#checkboxes label {
  display: block;
}
#checkboxes label:hover {
  background-color: #f07575;
}

#dummyUserIcon {
  width: 15%;
  height: 15%;
}

.profileMainContainer {
  margin: auto;
  width: 50%;
  height: 100%;
  border: 5px solid #f07575;
  padding: 10px;
}

.leftDiv {
  position: left;
  right: 100%;
  border: #f07575;
  text-align: left;
  padding: 0px 500px 0px 0px;
}

.rightDiv {
  position: right;
  left: 100%;
  border: #f07575;
  text-align: left;
  padding: 0px 0px 0px 100px;
}
</style>