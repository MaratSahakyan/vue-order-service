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
          aria-autocomplete="current-password"
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
import useRouter from "../hooks/useRouter";

export default defineComponent({
  name: "SignInPage",

  setup() {
    const router = useRouter();

    return {
      router,
    };
  },

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
        this.router.push("/customers");
      } catch (error) {
        throw error;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

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
    width: 100%;
  }
}
</style>
