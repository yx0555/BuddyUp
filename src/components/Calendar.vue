<template>
	<div id="app" v-if="user">
		<calendar-view
			:show-date="showDate"
			:items="state.items"
			:show-times= "true"
			:time-format-options="{ hour: 'numeric', minute: '2-digit' }"
			class="theme-default holiday-us-traditional holiday-us-official"
			@click-date="onClickDate"
			
		>
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					:previous-year-label="themeOptions.previousYearLabel"
					:previous-period-label="themeOptions.previousPeriodLabel"
					:next-period-label="themeOptions.nextPeriodLabel"
					:next-year-label="themeOptions.nextYearLabel"
					@input="setShowDate"
				/>
			</template>
		</calendar-view>
	</div>
</template>

<script>
	import { reactive } from "vue"
	import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
	// import { ICalendarItem } from "vue-simple-calendar"

	import "vue-simple-calendar/dist/style.css"
	// // // The next two lines are optional themes
	import "vue-simple-calendar/static/css/default.css"
	import "vue-simple-calendar/static/css/gcal.css";
	/* @import "../static/css/default.css"; */
	import "vue-simple-calendar/static/css/holidays-us.css";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import {
		getFirestore,
		getDoc,
		doc,
		collection,
		query,
		where,
		getDocs
	} from "firebase/firestore";
	import firebaseApp from "../firebase.js";

	class AppState {
		showDate = new Date()
		selectionStart = undefined
		selectionEnd = undefined
		theme = "gcal"
		items = []
	}

	class Reminder {
		date = new Date();
		buddy = "";
		title = "";
	}

	

	export default {
		name: 'app',
		
		data() {
			return {
				user: true,
				uid: "",
				showDate: new Date(),
				state: reactive(new AppState()),
				themeOptions: {
					top: "1.4em",
					height: "1.4em",
					border: "2px",
					previousYearLabel: "<<",
					previousPeriodLabel: "<",
					nextPeriodLabel: ">",
					nextYearLabel: ">>",
					currentPeriodLabel: "",
					}
			}
		},


		mounted() {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					this.user = user;
					this.uid = user.uid;

					const db = getFirestore(firebaseApp);
					const docRef = getDoc(doc(db, "Users", this.uid));
					var vm = this;

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
							console.log(buddy1Day);
							buddy1Time = buddy1Slot.slice(3,5);
							console.log(buddy1Time)
							buddy1.visitDate = getVisitDate(buddy1Day, buddy1Time);
							console.log(buddy1.visitDate)
							buddyArray.push(buddy1);
						}
						if (buddy2Slot) {
							buddy2Day = convertDayToInt(buddy2Slot.slice(0,3));
							buddy2Time = buddy2Slot.slice(3,5);
							buddy2.visitDate = getVisitDate(buddy2Day, buddy2Time);
							buddyArray.push(buddy2);
						}
						if (buddy3Slot) {
							buddy3Day = convertDayToInt(buddy3Slot.slice(0,3));
							buddy3Time = buddy3Slot.slice(3,5);
							buddy3.visitDate = getVisitDate(buddy3Day, buddy3Time);
							buddyArray.push(buddy3)
						}
						console.log(buddyArray)
						console.log(buddyArray[0].visitDate)
						
						function addHours(date, hours) {
							const newDate = new Date(date);
							newDate.setHours(newDate.getHours() + hours);
							return newDate;
						}
						function addWeeks(date, weeks) {
							const newDate = new Date(date);
							newDate.setDate(newDate.getDate() + 7 * weeks);
							return newDate;
						}
						function getColor(n) {
							if (n==1) {
								return "LightSkyBlue";
							} else if (n==2){
								return "Pink";
							} else {
								return "LightGreen";
							}
						}
						var currId = 1;
						var currBuddy = 1;
						buddyArray.forEach((buddy)=>{
							const startDate = new Date(buddy.visitDate);
							const endDate = addHours(startDate, 3)
							console.log(startDate)
							for (let i = 0; i < 30; i++){
								const currStartDate = addWeeks(startDate, i)
								const currEndDate = addWeeks(endDate, i)
								vm.state.items.push({
									id: currId.toString(),
									startDate: currStartDate,
									endDate: currEndDate,
									title: "Visit " + buddy.name,
									style: "font-size:small; background-color:" + getColor(currBuddy)
								}
								);
								currId += 1;
							}
							currBuddy += 1;
						})
						console.log(vm.state.items)
					});


					const docRef2 = collection(db, "Reminders");
					const q = query(
					docRef2,
					where("userID","==", user.uid)
					);
					const querySnapshot = getDocs(q);

					querySnapshot.then(function (reminderArray) {
						const finalArray = []
						console.log(reminderArray)
						reminderArray.forEach((r) =>{
							const currReminder = new Reminder();
							currReminder.date = new Date(r.data().date);
							currReminder.buddy = r.data().buddyName;
							currReminder.title = r.data().reminder;
							finalArray.push(currReminder);
						})

						var currId = 1;
						finalArray.forEach((r)=>{
							const startDate = r.date;
							startDate.setHours(0);
							console.log("reminder startDate: " + startDate);
							vm.state.items.push({
								id: "r" + currId.toString(),
								startDate: startDate,
								title: r.title + " (" + r.buddy + ")",
								style: "font-size:small"
							})
						})
					})
				} else {
					this.user = false;
				}
			});
		},

		// data: function() {
		// 	return { showDate: new Date(), items: [], selectionStart: undefined, selectionEnd: undefined, theme: "gcal" }
		// },
		components: {
			CalendarView,
			CalendarViewHeader,
			// CalendarItem,
		},
		methods: {
			setShowDate(d) {
			this.showDate = d;
			},
			onClickDate(...params) {
			console.log(params);
			},
			thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
			},
		}
	}

	
</script>

<style scoped>

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #94273f;
		height: 83vh;
		width: 100vw;
		margin-left: 17px;
		margin-right: auto;
		/* max-width: 1000px */
		max-width: 1200px;
	}

</style>