<template>
  <div class="container grid grid-tempate-area-main">
    <SidebarForm />
    <section class="grid__data">
      <KeepAlive>
        <component
          :is="currentStepComponent"
          @update-step="handleUpdateStep"
        ></component>
      </KeepAlive>
      {{ $store.state.selectedPlan }}

      <!-- <span
        style="
          background-color: aquamarine;
          position: absolute;
          z-index: 10;
          height: 30px;
        "
      >
        <p>onlineService - {{ $store.state.onlineService }}</p>
        <p>largerStorage - {{ $store.state.largerStorage }}</p>
        <p>customizableProfile - {{ $store.state.customizableProfile }}</p>
        <p>periodPlan - {{ $store.state.periodPlan }}</p>
        <p>selectedPlan - {{ $store.state.selectedPlan }}</p>
      </span> -->

      <div class="navigation">
        <button
          class="navigation__button back"
          v-if="currentStepIndex > 0"
          @click="previousStep"
        >
          Go Back
        </button>
        <button
          class="navigation__button next"
          v-if="currentStepIndex < steps.length - 1"
          @click="nextStep"
        >
          Next Step
        </button>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Footer from "./components/AttribuitionFooter.vue";
import SidebarForm from "./components/SidebarForm.vue";
import StepPersonalInfo from "./components/StepPersonalInfo.vue";
import StepSelectPlan from "./components/StepSelectPlan.vue";
import StepPickAddon from "@/components/StepPickAddon";
import StepSummary from "@/components/StepSummary";

export default {
  name: "App",
  components: {
    Footer,
    SidebarForm,
    StepPersonalInfo,
    StepSelectPlan,
    StepPickAddon,
    StepSummary,
  },
  computed: {
    ...mapState(["currentStepIndex"]),
    steps() {
      return [
        "StepPersonalInfo",
        "StepSelectPlan",
        "StepPickAddon",
        "StepSummary",
      ];
    },
    currentStepComponent() {
      return this.steps[this.currentStepIndex];
    },
  },
  methods: {
    ...mapActions(["goToStep", "updateStepData"]),
    nextStep() {
      this.goToStep(this.currentStepIndex + 1);
    },
    previousStep() {
      this.goToStep(this.currentStepIndex - 1);
    },
    handleUpdateStep({ step, data }) {
      this.updateStepData({ step, data });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap");

#app {
  font-family: "Ubuntu", sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eef5ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

:root {
  --CoolGray: hsl(231, 11%, 63%);
  --LightGray: hsl(229, 24%, 87%);
  --Magnolia: hsl(217, 100%, 97%);
  --Alabaster: hsl(231, 100%, 99%);
  --White: hsl(0, 0%, 100%);
  --DarkBlue: hsl(213, 96%, 18%);
  --PurplishBlue: hsl(243, 100%, 62%);
  --PastelBlue: hsl(228, 100%, 84%);
  --LightBlue: hsl(206, 94%, 87%);
  --StrawberryRed: hsl(354, 84%, 57%);
}

.container {
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
}

.grid {
  display: grid;
}

.grid__sidebar {
  grid-area: sidebar;
}

.grid__data {
  display: grid;
  grid-area: data;
  grid-template-rows: 460px 80px;
  grid-template-columns: minmax(350px, 600px);
}

.grid__footer {
  grid-area: footer;
}

.grid__buttons {
  grid-area: buttons;
}

.grid-tempate-area-main {
  grid-template-areas:
    "sidebar data"
    "sidebar buttons"
    "footer footer";
  grid-template-rows: 24fr 1fr;
}

.content {
  justify-self: center;
  width: 80%;
}

.content__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--DarkBlue);
  margin: 2rem 0 1rem;
}

.content__subtitle {
  color: var(--CoolGray);
  margin-bottom: 2rem;
}

.navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "back next";
  align-items: end;
  justify-self: center;
  width: 80%;
}

.navigation__button {
  border-radius: 8px;
  padding: 0.75rem 0;
  width: 110px;
  height: 42px;
  border: none;
  transition: 0.3s all ease;
  cursor: pointer;
  font-weight: 700;
}

.navigation__button:hover {
  opacity: 0.7;
}

.navigation__button.next {
  background-color: var(--DarkBlue);
  color: #fff;
  grid-area: next;
  justify-self: end;
}

.navigation__button.back {
  background-color: #fff;
  color: var(--CoolGray);
  grid-area: back;
}

.navigation__button.back:hover {
  color: var(--DarkBlue);
}
</style>
