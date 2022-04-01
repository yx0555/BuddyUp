<template>
	<div id="app">
		<h1>My Calendar</h1>
		<calendar-view
			:show-date="state.showDate"
			:items="state.items"
			:enable-date-selection="true"
			:selection-start="state.selectionStart"
			:selection-end="state.selectionEnd"
			:display-week-numbers="false"
			:enable-drag-drop="true"
			:item-top="themeOptions.top"
			:item-content-height="themeOptions.height"
			:item-border-height="themeOptions.border"
			:class="`theme-${state.theme}`"
			:current-period-label="themeOptions.currentPeriodLabel"
			class="holiday-us-traditional holiday-us-official holiday-ue"
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
	import { reactive } from '@vue/reactivity';
	import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
	// import { ICalendarItem } from "vue-simple-calendar"

	import "vue-simple-calendar/dist/style.css"
	// // // The next two lines are optional themes
	import "vue-simple-calendar/static/css/default.css"
	import "vue-simple-calendar/static/css/gcal.css";
	/* @import "../static/css/default.css"; */
	import "vue-simple-calendar/static/css/holidays-us.css";

	export default {
		name: 'app',
		setup() {
			const state = reactive({
				showDate: new Date(),
				items: [], 
				selectionStart: undefined,
				selectionEnd: undefined,
				theme: "gcal",
				themeOptions: {
					top: "0px",
					height: "20px",
					border: "1px solid #ddd",
					currentPeriodLabel: "Current Period",
					previousYearLabel: "Previous Year",
					previousPeriodLabel: "Previous Period",
					nextPeriodLabel: "Next Period",
					nextYearLabel: "Next Year"
				}
			});
			return {state};
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
			setSelection(dateRange) {
				this.selectionStart = dateRange[0];
				this.selectionEnd = dateRange[1];
			},
			finishSelection(dateRange) {
				// eslint-disable-next-line no-undef
				return setSelection(dateRange);
			},
			themeOptions() {
				this.theme == "gcal"
					? {
				top: "2.6em",
				height: "2.1em",
				border: "0px",
				previousYearLabel: "\uE5CB\uE5CB",
				previousPeriodLabel: "\uE5CB",
				nextPeriodLabel: "\uE5CC",
				nextYearLabel: "\uE5CC\uE5CC",
				currentPeriodLabel: "Today",
				}
			: {
				top: "1.4em",
				height: "1.4em",
				border: "2px",
				previousYearLabel: "<<",
				previousPeriodLabel: "<",
				nextPeriodLabel: ">",
				nextYearLabel: ">>",
				currentPeriodLabel: "",
				}
			},
			getEvent(i) {
				// const startDay = Math.floor(Math.random() * 28 + 1)
				// const endDay = Math.floor(Math.random() * 4) + startDay
				// var d = new Date();
				console.log("getting event")
				var item = {
					id: i.toString(),
					title: 'Event test',
					startDate: "2022-04-01 12:00:00",
					endDate: "2022-04-01 12:10:00",
				}
				return item	
			},
			mounted() {
				this.items = [...Array(25)].map((_, i) => this.getEvent(i))
			}
		}
	}

	
</script>

<style scoped>

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #94273f;
		height: 67vh;
		width: 90vw;
		margin-left: 75px;
		margin-right: auto;
	}
</style>