<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h3>Upcoming Tasks</h3>
    <ul id="taskList"></ul>
    <h3>Important Reminders</h3>
    <ul id="reminderList"></ul>
  </div>
  <div v-else>
    <Login route="" />
  </div>

</template>

<script>
import firebaseApp from "../firebase.js";
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import Login from "../components/Login.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  collection
} from "firebase/firestore";


export default {
  components: {
    NavBar,
    SideBar,
    Login
  },

  data() {
    return {
      refreshComp: 0,
      user: false,
      upcomingVisits: [],
      reminders: [],
      uid : ""
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.uid = user.uid;
        this.upcomingVisits = []
        // this.upcomingVisits = this.generateUpcomingVisits();

        const db = getFirestore(firebaseApp);
        const docRef = getDoc(doc(db, "Users", this.uid));
        var vm = this;
        
        const docRef2 = collection(db, "Reminders");
        const q = query(
          docRef2,
          where("userID","==", user.uid)
        );
        const querySnapshot = getDocs(q);


        docRef.then(function (snapshot) {
          const buddy1 = {name:"", visitDate:new Date()};
          const buddy2 = {name:"", visitDate:new Date()};
          const buddy3 = {name:"", visitDate:new Date()};
          buddy1.name = snapshot.data().buddyName1
          buddy2.name = snapshot.data().buddyName2
          buddy3.name = snapshot.data().buddyName3
          var buddy1Slot = "";
          var buddy2Slot = "";
          var buddy3Slot = "";
          buddy1Slot = snapshot.data().buddy1VisitationSlot;
          buddy2Slot = snapshot.data().buddy2VisitationSlot;
          buddy3Slot = snapshot.data().buddy3VisitationSlot;
          var buddy1Day = 0;
          var buddy2Day = 0;
          var buddy3Day = 0;

          function convertDayToInt(day) {
            var i = 0
            if (day == "mon") {
              i = 1;
            } else if (day == "tue") {
              i = 2;
            } else if (day == "wed") {
              i = 3;
            } else if (day == "thu") {
              i =  4;
            } else if (day == "fri") {
              i = 5;
            } else if (day == "sat") {
              i = 6;
            } else if (day == "sun") {
              i = 7;
            } 
            return i;
          }

          function getVisitDate(visitDay, endTime) {
            const d = new Date()
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            d.setDate(diff + visitDay - 1) + (day == 0 ? 7:0);
            d.setHours(endTime);
            d.setMinutes(0);
            d.setSeconds(0);
            if (new Date().getTime() > d.getTime()) {
              d.setDate(d.getDate() + 7);
            }
            return d;
          }

          var buddy1Time = "";
          var buddy2Time = "";
          var buddy3Time = "";
          const buddyArray = []

          if (buddy1Slot) {
            buddy1Day = convertDayToInt(buddy1Slot.slice(0,3));
            buddy1Time = buddy1Slot.slice(7);
            buddy1.visitDate = getVisitDate(buddy1Day, buddy1Time);
            buddyArray.push(buddy1);

          }
          if (buddy2Slot) {
            buddy2Day = convertDayToInt(buddy2Slot.slice(0,3));
            buddy2Time = buddy2Slot.slice(7);
            buddy2.visitDate = getVisitDate(buddy2Day, buddy2Time);
            buddyArray.push(buddy2);
          }
          if (buddy3Slot) {
            buddy3Day = convertDayToInt(buddy3Slot.slice(0,3));
            buddy3Time = buddy3Slot.slice(7);
            buddy3.visitDate = getVisitDate(buddy3Day, buddy3Time);
            buddyArray.push(buddy3)
          }
          buddyArray.sort((a,b) => (a.visitDate > b.visitDate) ? 1 : -1);
          console.log(buddyArray)

          buddyArray.forEach((buddy)=>{
            vm.upcomingVisits.push(buddy.visitDate.toDateString() + " " + buddy.visitDate.getHours() + "00 : visit " + buddy.name);
          })

          let list = document.getElementById("taskList");
        
          vm.upcomingVisits.forEach((visit)=>{
            let li = document.createElement("li");
            li.innerText = visit;
            list.appendChild(li) ;
          })
          if (vm.upcomingVisits.length == 0) {
            let li = document.createElement("li")
            li.innerText = "no upcoming visits"
            list.appendChild(li)
          }
        });
        
        querySnapshot.then(function (reminderArray) {
          console.log(reminderArray)
          reminderArray.forEach((r) =>{
            vm.reminders.push(new Date(r.data().date).toDateString() + " : " + r.data().reminder + " (" + r.data().buddyName + ")");
          })
          let list2 = document.getElementById("reminderList");
          vm.reminders.forEach((reminder)=>{
            let li = document.createElement("li");
            li.innerText = reminder;
            list2.appendChild(li) ;
          })
          if (vm.reminders.length == 0) {
            let li = document.createElement("li")
            li.innerText = "no reminders"
            list2.appendChild(li)
          }
        })
      }
    });

  },

  // methods: {
  //   generateUpcomingVisits() {
  //       const db = getFirestore(firebaseApp);
  //       const docRef = getDoc(doc(db, "Users", this.uid));
  //       docRef.then(function (snapshot) {
  //         const buddy1 = {name:"", visitDate:new Date()};
  //         const buddy2 = {name:"", visitDate:new Date()};
  //         const buddy3 = {name:"", visitDate:new Date()};
  //         buddy1.name = snapshot.data().buddyName1
  //         buddy2.name = snapshot.data().buddyName2
  //         buddy3.name = snapshot.data().buddyName3
  //         var buddy1Slot = "";
  //         var buddy2Slot = "";
  //         var buddy3Slot = "";
  //         buddy1Slot = snapshot.data().buddy1VisitationSlot;
  //         buddy2Slot = snapshot.data().buddy2VisitationSlot;
  //         buddy3Slot = snapshot.data().buddy3VisitationSlot;
  //         var buddy1Day = 0;
  //         var buddy2Day = 0;
  //         var buddy3Day = 0;

  //         function convertDayToInt(day) {
  //           var i = 0
  //           if (day == "mon") {
  //             i = 1;
  //           } else if (day == "tue") {
  //             i = 2;
  //           } else if (day == "wed") {
  //             i = 3;
  //           } else if (day == "thu") {
  //             i =  4;
  //           } else if (day == "fri") {
  //             i = 5;
  //           } else if (day == "sat") {
  //             i = 6;
  //           } else if (day == "sun") {
  //             i = 7;
  //           } 
  //           return i;
  //         }

  //         buddy1Day = convertDayToInt(buddy1Slot.slice(0,3));
  //         buddy2Day = convertDayToInt(buddy2Slot.slice(0,3));
  //         buddy3Day = convertDayToInt(buddy3Slot.slice(0,3));
  //         const buddy1Time = buddy1Slot.slice(7);
  //         const buddy2Time = buddy2Slot.slice(7);
  //         const buddy3Time = buddy3Slot.slice(7);

  //         function getVisitDate(visitDay, endTime) {
  //           const d = new Date()
  //           var day = d.getDay(),
  //               diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  //           d.setDate(diff + visitDay - 1) + (day == 0 ? 7:0);
  //           d.setHours(endTime);
  //           d.setMinutes(0);
  //           d.setSeconds(0);
  //           if (new Date().getTime() > d.getTime()) {
  //             d.setDate(d.getDate() + 7);
  //           }
  //           return d;
  //         }

  //         buddy1.visitDate = getVisitDate(buddy1Day, buddy1Time);
  //         buddy2.visitDate = getVisitDate(buddy2Day, buddy2Time);
  //         buddy3.visitDate = getVisitDate(buddy3Day, buddy3Time);
  //         const buddyArray = [buddy1, buddy2, buddy3];
  //         buddyArray.sort((a,b) => (a.visitDate > b.visitDate) ? 1 : -1);
  //         console.log(buddyArray)
  //         return buddyArray;
  //       });
  //   },
  // }
};

</script>

<style>
.page {
  margin-left: 200px;
}
</style>