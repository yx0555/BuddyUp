import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
// import { SetupCalendar } from 'v-calendar';

createApp(App).use(router).mount("#app");

// const app = createApp(App)
// app.use(SetupCalendar, {})
// app.component('Calendar', Calendar)
// app.component('DatePicker', DatePicker)

// new App({
//     router,
//     render: h => h(App)
// }).$mount('#app')
