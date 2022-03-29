<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <div class="Addvisitation">
      <form id="myform">
        <h2>Log a new visitation</h2>
        <div class="formli">
          <label for="date"> Date:</label>
          <input type="date" id="date" required="" placeholder="DD/MM/YYYY" v-model="a"/>
          <br /><br />

          <label for="starttime">Start Time:</label>
          <input type="number" id="starttime" required="" placeholder="0000 HR" v-model="b"/><br /><br />

          <label for="endtime">End Time:</label>
          <input type="number" id="endtime" required="" placeholder="0000 HR" v-model="c"/><br /><br />

          <label for="remarks">Remarks:</label>
          <input type="text" id="remarks" required="" placeholder="Eg. Bring item" v-model="d"/><br /><br />

          <div class="save">
            <button id="savebutton" type="button" v-on:click="savetofs()">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="Visitationlist" v-if="user">
      <h2> {{ this.buddyName }}'s Visitations</h2>
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

    <div class="buttons">
      <button id="requestdetailsbutton" type="button" v-on:click="requestdetails()">
        Request Buddy's details
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import firebaseApp from "../firebase.js";
import { getFirestore, addDoc, collection, doc, arrayUnion,updateDoc,getDocs,getDoc, deleteDoc,arrayRemove, query, where} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "IndivBuddies",

  components: {
    NavBar,
    SideBar,
  },

  data() {
    return {
      a:"",b:"",c:"",d:"",
      buddynumber : this.$route.params.id,
      buddyId: "", 
      buddyName: "",
      user: false,
      refreshComp:0,
    };
  },

  methods: {
    change(){
      console.log("changed activated")
      this.refreshComp+=1;
    },

    async requestdetails() {
      alert("Details of the buddy will be sent to your registered email");
    },

    async savetofs() {
      if (!(this.a == "" || this.b == "" || this.c == "")){
        if (this.b!=this.c) {
          //Date and time cannot be empty
          try {
            var uid = auth.currentUser.uid;
            const docRef = await addDoc(collection(db, "Visitations"), {
              date: this.a, startTime: this.b, endTime: this.c, remarks: this.d, userID: uid, buddyID: this.buddyId,
            });
            console.log(docRef);
            const addRef = doc(db, "Buddies", this.buddyId);
            await updateDoc(addRef, {
              visitationID: arrayUnion(docRef.id),
            });
            document.getElementById("myform").reset();
            // this.$emit("added");
            this.$emit.change();
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        } else alert("Start and end time cannot be the same!");
      } else alert("Cannot take empty values. Please enter the values");
    },
  
},

  mounted() {   
    const auth = getAuth();
    //UPDATE THE BUDDYNAME AND BUDDYID BASED ON THE ROUTE PARAMETERS
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        var uid = user.uid;
        const docRef = getDoc(doc(db, "Users", uid));
        var vm = this;
        docRef.then(function (snapshot) {
          if (vm.buddynumber==1){
            vm.buddyName = snapshot.data().buddyName1;
            vm.buddyId=snapshot.data().buddyID1;
            console.log("first"+vm.buddyId);
          } else if (vm.buddynumber==2){
            vm.buddyName = snapshot.data().buddyName2;
            vm.buddyId=snapshot.data().buddyID2;
          }
          else {
            vm.buddyName = snapshot.data().buddyName3;
            vm.buddyId=snapshot.data().buddyID3;
          }
        });
      } else {
        alert("you must be logged in to view this page");
        this.$router.push("/");
      }
    });
    
    async function display(){
        //Querying the data from visitations with matching buddyID and userID
        var vm = this;
        let ind=1
        console.log("second"+ vm.buddyId);
        const q = await query(collection(db, "Visitations"), where("buddyID", "==", vm.buddyId), where ("userID","==",auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        //Inserting data into the table
        querySnapshot.forEach((docs) => {
            let yy = docs.data()
            var table = document.getElementById("visitationtable")
            var row = table.insertRow(ind)

            var date = (yy.date)
            var startTime = (yy.startTime)
            var endTime = (yy.endTime)
            var remarks = (yy.remarks)

            var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5); 

            cell1.innerHTML = ind; cell2.innerHTML = date; cell3.innerHTML= startTime; cell4.innerHTML=endTime;
            cell5.innerHTML = remarks; cell6.innerHTML="";

            var bu = document.createElement("button")
            bu.innerHTML="Delete"
            bu.onclick = function(){
                deletevisitation(docs.id)
            };
            cell6.appendChild(bu)

            ind += 1;
        });
    
    }
    display();
    
    //Delete from firebase
    async function deletevisitation(visitationID){
      var vm = this;
      alert("You are going to delete this visitation log")
      await deleteDoc(doc(db, "Visitations", visitationID))
      await updateDoc(doc(db,"Buddies",vm.buddyId),{
        visitationID: arrayRemove(visitationID)
      });
      let tb=document.getElementById("visitationtable")
      while (tb.rows.length>1){
        tb.deleteRow(1)
      }
      display()
    }

  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

.page {
  margin-left: 200px;
}


h1,h2{
    text-align:center;
    background-color: #f5a4a4;
    font-size:1.5em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight:bold;
    font-family: "Montserrat"
}

#visitationtable {
  position: relative;
  font-family: "Montserrat";
  font-size: 15px;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  overflow: scroll;
}


th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.buttons {
  align-content: top;
  bottom: 70%;
  display: inline;
}

#requestdetailsbutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 13px;
}

#savebutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 13px;
}
</style>
