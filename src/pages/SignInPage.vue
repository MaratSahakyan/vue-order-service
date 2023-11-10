<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-form @submit.prevent="onSubmit">
        <h1 class="main-title">Manage Your Service</h1>
        <q-input
          v-model="submitData.username"
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
          v-model="submitData.password"
          label="Password"
          type="password"
          outlined
          class="inputClassName"
          :rules="[
            (val) =>
              (val && val.length > 5) ||
              'Please type your password, min 5 symbol.',
          ]"
        />

        <q-btn label="Sign-In" type="submit" class="bg-secondary text-white" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { login } from "../providers/authProvider";

export default defineComponent({
  name: "SignInPage",

  data() {
    return {
      submitData: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async onSubmit() {
      try {
        await login(this.submitData.username, this.submitData.password);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 20px;
  min-width: 500px;

  h1 {
    font-size: 28px;
    margin: 0;
    line-height: normal;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
