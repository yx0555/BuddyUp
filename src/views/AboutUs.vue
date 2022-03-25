<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h1>About Us Page</h1>
    <br />
    <h2>Background</h2>
    <p>
      Singapore has one of the lowest fertility rates in the world at 1.15
      children per woman while having one of the highest life expectancies. This
      has resulted in an ageing population, with 23.1 elderly per 100
      non-elderly Singaporean residents, which puts pressure on Singapore’s
      shrinking workforce. Furthermore, social isolation for elderlies has also
      become an issue. 67,600 elderly (65 years and above) live alone as of
      2019, making up 11.6% of the elderly population in Singapore. This number
      is expected to increase to 83,000 by 2030. This social isolation issue has
      prompted the setting up of programmes such as Neighbours for Active Living
      to ensure that patients with complex health and social care needs continue
      to receive care in the community after discharge. However, such programmes
      rely on volunteers, and volunteerism rates have decreased by 7% in 2021,
      partly due to the COVID-19 pandemic.
    </p>
    <br />
    <h2>Problem</h2>
    <p>
      Despite volunteers being in high demand, there are still significant
      barriers to entry for individuals who are looking to begin volunteering.
      For instance, the experience could be stressful due to potential language
      barriers or large time commitments. Furthermore, prospective volunteers
      are faced with issues on how to begin the volunteering process. In the
      context of caring for elderlies, the quality of care provided may be
      compromised if there are too many elderlies paired with a single
      volunteer.
    </p>
    <br />
    <h2>Solution</h2>
    <p>
      Buddy Up serves as an all-in-one platform solely for volunteers’ use. The
      app aims to match volunteers with elderlies who are socially isolated and/
      or have chronic diseases. Buddy Up will request the elderlies’ preferences
      data from the organisations and partner organisations will not have to
      interact with our web application’s interface. Users that registered
      themselves as volunteers will then be matched with elderlies according to
      their preferences, and they can then visit their buddies at their
      respective homes. Volunteers are mainly expected to provide preventive
      care for their buddies and keep them company. Once matched, the platform
      will prompt users to record their visitation details in a form and set
      reminders for themselves while caring for the elderlies, enabling them to
      render the most support possible with the least amount of stress.
    </p>

    <p>
      Buddy Up will increase the quality of care for the elderly by providing
      volunteers with the necessary tools, while also improving the experience
      for volunteers. Through streamlining the volunteering process, it makes
      volunteering more accessible through a comprehensive platform. By
      increasing charity organisation reach for volunteers and capping the
      number of beneficiaries per volunteer, our application would result in
      higher volunteerism adoption and retention rates and thereby improve
      social and health outcomes for the elderly.
    </p>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    NavBar,
    SideBar,
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
      }
    });
  },
};
</script>

<style>
p {
  text-align: justify;
  margin-left: 10%;
  margin-right: 10%;
}

.page {
  margin-left: 200px;
}
</style>