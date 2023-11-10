<template>
  <q-toolbar class="bg-secondary text-white shadow-2">
    <q-toolbar-title>
      <q-btn @click="goToHomePage" flat stretch label="Order Service"
    /></q-toolbar-title>

    <q-space />

    <q-btn @click="goToSignIn" flat stretch label="Sign-In" />
    <q-btn @click="goToSignUp" flat stretch label="Sign-Up" />
  </q-toolbar>
</template>

<script>
import { ref } from "vue";
import useRouter from "../hooks/useRouter";

export default {
  setup() {
    const { push } = useRouter();

    return {
      goToSignIn: () => push("/signin"),
      goToSignUp: () => push("/signup"),
      goToHomePage: () => push("/"),
    };
  },
};
</script>
