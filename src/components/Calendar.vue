<template>
<!-- <Calendar />
<DatePicker v-model="date" />   -->
	<div id="app">
		<h1>My Calendar</h1>
		<calendar-view
			:show-date="showDate"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate" />
			</template>
		</calendar-view>
	</div>
</template>

<script>
// import { Calendar } from 'v-calendar';
// import 'v-calendar/dist/style.css';

// export default {
//     components: {
//         Calendar,
//         // DatePicker,
//     },
//     data() {
//         return {
//         date: new Date(),
//         };
//     },
// }
	import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"

	import "vue-simple-calendar/dist/style.css"
	// // The next two lines are optional themes
	// import "..relative-path-to-node_modules/vue-simple-calendar/static/css/default.css"
	// import "..relative-path-to-node_modules/vue-simple-calendar/static/css/holidays-us.css"

	export default {
		name: 'app',
		data: function() {
			return { showDate: new Date() }
		},
		components: {
			CalendarView,
			CalendarViewHeader,
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
		}
	}
</script>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>