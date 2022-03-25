import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import MyBuddies from "@/views/MyBuddies.vue";
import MyCalendar from "@/views/MyCalendar.vue";
import Profile from "@/views/Profile.vue";
import Register from "@/views/Register.vue";
import AboutUs from "@/views/AboutUs.vue";
import IndivBuddies from "@/views/IndivBuddies.vue";
import NotFound from "@/views/NotFound.vue";

IndivBuddies = {
  template: '<div>IndivBuddies {{$route.params.id }}</div>',
}

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/mybuddies",
    name: "MyBuddies",
    component: MyBuddies,
  },
  {
    path: "/mycalendar",
    name: "MyCalendar",
    component: MyCalendar,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/indivbuddies/:id",
    name: "IndivBuddies",
    component: IndivBuddies,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
