<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar/>
    <SideBar/>

    <div class="displayProfileContainer">
      <h1>My Profile</h1>
      <img src="@/assets/man.png" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid #333"/>
      <p style="text-align: center">
        Region: <strong>{{ this.region }}</strong><br>
        Languages: <strong>{{ this.languages }}</strong><br>
        Buddy Gender Preferences: <strong>{{ this.buddyGenderPreferences }}</strong><br>
        Availability: <strong>{{ this.availability }}</strong><br>
      </p>
    </div>

    <div class="updateProfileContainer">
      <h2>Update My Particulars</h2>

      <form id="updateProfileDetails">
        <div id="formOfDetails">
          <!-- REGION -->
          <label for="region" id="formFields"><strong>Region: </strong></label>
          <select name="region" id="region">
            <option value="">Select option</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="central">Central</option>
          </select>
          <br><br>

          <!-- LANGUAGES / DIALECTS -->
          <label for="languages" id="languagesFields"><strong>Languages:</strong></label>
          <div class="multiselect">
            <div class="selectBox" v-on:click="showLanguageCheckboxes()">
              <select>
                <option value="">Select option(s)</option>
              </select>
              <div class="overSelect"></div>
            </div>
            <div id="languageCheckboxes" style="display: none">
              <label for="english">
                <input class="languageCheckbox" type="checkbox" id="english" value="english">English</label>
              <br>
              <label for="chinese">
                <input class="languageCheckbox" type="checkbox" id="chinese" value="chinese">Chinese</label>
              <br>
              <label for="malay">
                <input class="languageCheckbox" type="checkbox" id="malay" value="malay">Malay</label>
              <br>
              <label for="tamil">
                <input class="languageCheckbox" type="checkbox" id="tamil" value="tamil">Tamil</label>
            </div>
          </div>
          <br>

          <!-- GENDER PREFERENCES -->
          <label for="genderPreferences" id="formFields"
            ><strong>Buddy Gender Preferences: </strong></label>
          <select name="genderPreferences" id="genderPreferences">
            <option value="">Select option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="noPreferences">No Preferences</option>
          </select>
          <br><br>

          <!-- AVAILABILITY -->
          <label for="availability" id="availabilityFields"><strong>Availability:</strong></label>
          <div class="multiselect">
            <div class="selectBox" v-on:click="showAvailabilityCheckboxes()">
              <select>
                <option value="">Select option(s)</option>
              </select>
              <div class="overSelect"></div>
            </div>
            <div id="availabilityCheckboxes" style="display: none">
              <h5>Monday</h5>
              <label for="mon8to11">
                <input class="availabilityCheckbox" type="checkbox" id="mon08to11" value="mon08to11">0800HRS - 1100HRS</label><br>
              <label for="mon11to14">
                <input class="availabilityCheckbox" type="checkbox" id="mon11to14" value="mon11to14">1100HRS - 1400HRS</label><br>
              <label for="mon14to17">
                <input class="availabilityCheckbox" type="checkbox" id="mon14to17" value="mon14to17">1400HRS - 1700HRS</label><br>
              <label for="mon17to20">
                <input class="availabilityCheckbox" type="checkbox" id="mon17to20" value="mon17to20">1700HRS - 2000HRS</label>

              <h5>Tuesday</h5>
              <label for="tue8to11">
                <input class="availabilityCheckbox" type="checkbox" id="tue08to11" value="tue08to11">0800HRS - 1100HRS</label><br>
              <label for="tue11to14">
                <input class="availabilityCheckbox" type="checkbox" id="tue11to14" value="tue11to14">1100HRS - 1400HRS</label><br>
              <label for="tue14to17">
                <input class="availabilityCheckbox" type="checkbox" id="tue14to17" value="tue14to17">1400HRS - 1700HRS</label><br>
              <label for="tue17to20">
                <input class="availabilityCheckbox" type="checkbox" id="tue17to20" value="tue17to20">1700HRS - 2000HRS</label>

              <h5>Wednesday</h5>
              <label for="wed8to11">
                <input class="availabilityCheckbox" type="checkbox" id="wed08to11" value="wed08to11">0800HRS - 1100HRS</label><br>
              <label for="wed11to14">
                <input class="availabilityCheckbox" type="checkbox" id="wed11to14" value="wed11to14">1100HRS - 1400HRS</label><br>
              <label for="wed14to17">
                <input class="availabilityCheckbox" type="checkbox" id="wed14to17" value="wed14to17">1400HRS - 1700HRS</label><br>
              <label for="wed17to20">
                <input class="availabilityCheckbox" type="checkbox" id="wed17to20" value="wed17to20">1700HRS - 2000HRS</label>

              <h5>Thursday</h5>
              <label for="thurs8to11">
                <input class="availabilityCheckbox" type="checkbox" id="thurs08to11" value="thurs08to11">0800HRS - 1100HRS</label><br>
              <label for="thurs11to14">
                <input class="availabilityCheckbox" type="checkbox" id="thurs11to14" value="thurs11to14">1100HRS - 1400HRS</label><br>
              <label for="thurs14to17">
                <input class="availabilityCheckbox" type="checkbox" id="thurs14to17" value="thurs14to17">1400HRS - 1700HRS</label><br>
              <label for="thurs17to20">
                <input class="availabilityCheckbox" type="checkbox" id="thurs17to20" value="thurs17to20">1700HRS - 2000HRS</label>

              <h5>Friday</h5>
              <label for="fri8to11">
                <input class="availabilityCheckbox" type="checkbox" id="fri08to11" value="fri08to11">0800HRS - 1100HRS</label><br>
              <label for="fri11to14">
                <input class="availabilityCheckbox" type="checkbox" id="fri11to14" value="fri11to14">1100HRS - 1400HRS</label><br>
              <label for="fri14to17">
                <input class="availabilityCheckbox" type="checkbox" id="fri14to17" value="fri14to17">1400HRS - 1700HRS</label><br>
              <label for="fri17to20">
                <input class="availabilityCheckbox" type="checkbox" id="fri17to20" value="fri17to20">1700HRS - 2000HRS</label>

              <h5>Saturday</h5>
              <label for="sat8to11">
                <input class="availabilityCheckbox" type="checkbox" id="sat08to11" value="sat08to11">0800HRS - 1100HRS</label><br>
              <label for="sat11to14">
                <input class="availabilityCheckbox" type="checkbox" id="sat11to14" value="sat11to14">1100HRS - 1400HRS</label><br>
              <label for="sat14to17">
                <input class="availabilityCheckbox" type="checkbox" id="sat14to17" value="sat14to17">1400HRS - 1700HRS</label><br>
              <label for="sat17to20">
                <input class="availabilityCheckbox" type="checkbox" id="sat17to20" value="sat17to20">1700HRS - 2000HRS</label>

              <h5>Sunday</h5>
              <label for="sun8to11">
                <input class="availabilityCheckbox" type="checkbox" id="sun08to11" value="sun08to11">0800HRS - 1100HRS</label><br>
              <label for="sun11to14">
                <input class="availabilityCheckbox" type="checkbox" id="sun11to14" value="sun11to14">1100HRS - 1400HRS</label><br>
              <label for="sun14to17">
                <input class="availabilityCheckbox" type="checkbox" id="sun14to17" value="sun14to17">1400HRS - 1700HRS</label><br>
              <label for="sun17to20">
                <input class="availabilityCheckbox" type="checkbox" id="sun17to20" value="sun17to20">1700HRS - 2000HRS</label>
            </div>
          </div>
          <br>
        </div>
      </form>
      <!-- UPDATE BUTTON -->
      <div class="update">
        <button id="updateButton" type="button" v-on:click="saveParticulars()">Update</button>
      </div>
      <br>
    </div>
  </div>
  <div v-else>
    <h1> You must be logged in to view this page </h1>
    <Login route="profile" />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import firebaseApp from "../firebase.js";
import Login from "../components/Login.vue";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth();

var expanded = false;

export default {
  components: {
    NavBar,
    SideBar,
    Login,
  },

  data() {
    return {
      user: false,
      region: "",
      languages: "",
      buddyGenderPreferences: "",
      availability: "",
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
          const region = snapshot.data().region;
          vm.region = region;
          const languages = snapshot.data().languages;
          vm.languages = languages;
          const buddyGenderPreferences = snapshot.data().genderPref;
          vm.buddyGenderPreferences = buddyGenderPreferences;
          const availability = snapshot.data().availability;
          vm.availability = availability;
        });
      }
    });
  },

  methods: {
    saveParticulars() {
      // REGION
      var userRegion = document.getElementById("region").value;
      // LANGUAGES / DIALECTS
      var userCheckedLanguages = new Array();
      var checkedLanguageBoxes = document.getElementsByClassName("languageCheckbox");
      for (var i = 0; checkedLanguageBoxes[i]; i++) {
        if (checkedLanguageBoxes[i].checked) {
          userCheckedLanguages.push(checkedLanguageBoxes[i].value);
        }
      }
      // GENDER PREFERENCES
      var userGenderPreferences = document.getElementById("genderPreferences").value;
      // AVAILABILITY
      var userCheckedAvailability = new Array();
      var checkedAvailabilityBoxes = document.getElementsByClassName("availabilityCheckbox");
      for (var j = 0; checkedAvailabilityBoxes[j]; j++) {
        if (checkedAvailabilityBoxes[j].checked) {
          userCheckedAvailability.push(checkedAvailabilityBoxes[j].value);
        }
      }

      var uid = auth.currentUser.uid;
      console.log(userRegion)
      updateDoc(doc(db, "Users", uid), {
        region: userRegion,
        languages: userCheckedLanguages,
        genderPref: userGenderPreferences,
        availability: userCheckedAvailability,
      });

      alert("Your particulars have been updated!");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },

    showLanguageCheckboxes() {
      var languageCheckboxes = document.getElementById("languageCheckboxes");
      if (!expanded) {
        languageCheckboxes.style.display = "block";
        expanded = true;
      } else {
        languageCheckboxes.style.display = "none";
        expanded = false;
      }
    },

    showAvailabilityCheckboxes() {
      var availabilityCheckboxes = document.getElementById("availabilityCheckboxes");
      if (!expanded) {
        availabilityCheckboxes.style.display = "block";
        expanded = true;
      } else {
        availabilityCheckboxes.style.display = "none";
        expanded = false;
      }
    },
  },
};
</script>

<style scoped>
.page {
  margin-left: 200px;
}

.multiselect {
  text-align: center;
}
.selectBox {
  position: relative;
}

.overSelect {
  position: absolute;
}

.displayProfileContainer {
  margin-left: 50px;
}

.updateProfileContainer {
  margin-left: 50px;
  border: 5px solid #f07575;
}

#updateButton {
  background-color: #abe6e9;
  border-radius: 5px;
  border: none;
  padding: 5px;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: 600;
  cursor: pointer;
}
</style>