<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="onSubmit" class="container">
      <h1 class="main-title">Manage Your Service</h1>
      <div class="inputsContainer">
        <q-input
          v-model="username"
          label="Username"
          outlined
          class="inputClassName"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 3) ||
              'Please type your username, min 3 symbol.',
          ]"
        />

        <q-input
          v-model="password"
          label="Password"
          outlined
          class="inputClassName"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Please type your password, min 5 symbol.',
          ]"
        />

        <q-input
          v-model="repeatPassword"
          label="Repeat Password"
          outlined
          class="inputClassName"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Please type your password, min 5 symbol.',
          ]"
        />
      </div>

      <div class="buttonsContainer">
        <q-btn label="Sign-Up" type="submit" color="primary" />
        <RouterLink to="signin"
          ><q-btn label="Sign-In" color="primary" flat
        /></RouterLink>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { createUser } from "../providers/authProvider";

export default defineComponent({
  name: "SignUpPage",

  components: {
    RouterLink,
  },

  data() {
    return {
      username: "",
      password: "",
      repeatPassword: "",
    };
  },

  methods: {
    onSubmit() {
      if (this.password !== this.repeatPassword) {
        this.password = "";
        this.repeatPassword = "";
        return;
      }
      createUser(this.username, this.password)
        .then((res) => console.log("res", res))
        .catch((error) => console.log("error", error));
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 20px;

  .main-title {
    margin: 0;
    font-size: 50px;

    @media (max-width: 723px) {
      margin: 0;
      font-size: 35px;
    }
  }

  .inputsContainer {
    display: flex;
    flex-direction: column;
    .inputClassName {
      width: 100%;
    }
  }

  .buttonsContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;

    button {
      width: 100%;
    }
  }
}
</style>
