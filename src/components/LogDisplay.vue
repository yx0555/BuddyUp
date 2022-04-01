<template>
  <div class="page" style="text-align: center">
    <div class="Visitationlist">
      <h2>{{ this.buddyName }}'s Visitations</h2>
      <table id="visitationtable" align="center">
        <tr>
          <th>S.No</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Remarks</th>
          <th>Options</th>
        </tr>
      </table>
    </div>
    
    <button id="requestdetailsbutton" type="button" v-on:click="requestdetails()">
      Request Buddy's details
    </button>

    <button id="deletebuddybutton" type="button" v-on:click="deletebuddy()">
      Delete this buddy
    </button>

    <div class="buttons">
      <button
        id="requestdetailsbutton"
        type="button"
        v-on:click="requestdetails()"
      >
        Request Buddy's details
      </button>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  arrayRemove,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  props: ["buddynumber"],
  data() {
    return {
      buddyId: "",
      buddyName: "",
    };
  },

  methods: {
    async requestdetails() {
      alert("Details of the buddy will be sent to your registered email");
    },
  },

  mounted() {
    const auth = getAuth();
    var vm = this;
    display();

    //UPDATE THE BUDDYNAME AND BUDDYID BASED ON THE ROUTE PARAMETERS
    async function display() {
      const uid = auth.currentUser.uid;
      const snapshot = await getDoc(doc(db, "Users", uid));
      if (snapshot.exists()) {
        if (vm.buddynumber == 1) {
          vm.buddyName = snapshot.data().buddyName1;
          vm.buddyId = snapshot.data().buddyID1;
          console.log("This runs first");
        } else if (vm.buddynumber == 2) {
          vm.buddyName = snapshot.data().buddyName2;
          vm.buddyId = snapshot.data().buddyID2;
        } else {
          vm.buddyName = snapshot.data().buddyName3;
          vm.buddyId = snapshot.data().buddyID3;
        }
      }
      display2();
    }
    async function display2() {
      console.log("this runs second");
      const uid = auth.currentUser.uid;
      let ind = 1;
      console.log("buddyid" + vm.buddyId);
      console.log("userid" + uid);
      const vRef = collection(db, "Visitations");
      const q = query(
        vRef,
        where("buddyID", "==", vm.buddyId),
        where("userID", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      //Inserting data into the table
      querySnapshot.forEach((docs) => {
        let yy = docs.data();
        var table = document.getElementById("visitationtable");
        var row = table.insertRow(ind);
        var date = yy.date;
        var startTime = yy.startTime;
        var endTime = yy.endTime;
        var remarks = yy.remarks;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = ind;
        cell2.innerHTML = date;
        cell3.innerHTML = startTime;
        cell4.innerHTML = endTime;
        cell5.innerHTML = remarks;
        cell6.innerHTML = "";

        var bu = document.createElement("button");
        bu.innerHTML = "Delete";
        bu.onclick = function () {
          deletevisitation(docs.id);
        };
        cell6.appendChild(bu);

        ind += 1;
      });
    }
    //Delete from firebase
    async function deletevisitation(visitationID) {
      alert("You are going to delete this visitation log");
      await deleteDoc(doc(db, "Visitations", visitationID));
      await updateDoc(doc(db, "Buddies", vm.buddyId), {
        visitationID: arrayRemove(visitationID),
      });
      let tb = document.getElementById("visitationtable");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      display();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

.page {
  margin-left: 0px;
}

h1,
h2 {
  text-align: center;
  background-color: #f5a4a4;
  font-size: 1.5em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  font-family: "Montserrat";
}

#visitationtable {
  font-family: "Montserrat";
  font-size: 15px;
  border-collapse: collapse;
  width:95%;
  text-align: center;
  margin-bottom: 20px;
}

th,
tr {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

#requestdetailsbutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 15px;
  padding: 3px;
}
</style>
