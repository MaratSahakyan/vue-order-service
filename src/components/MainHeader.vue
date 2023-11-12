<template>
  <q-toolbar class="bg-secondary text-white shadow-2">
    <q-toolbar-title>
      <RouterLink to="/" class="text-white noUnderline">
        <q-btn flat stretch label="Order Service" /></RouterLink
    ></q-toolbar-title>

    <q-space />

    <RouterLink to="/signin" class="text-white noUnderline"
      ><q-btn flat stretch label="Sign-In"
    /></RouterLink>
    <RouterLink to="/signup" class="text-white noUnderline"
      ><q-btn flat stretch label="Sign-Up"
    /></RouterLink>
  </q-toolbar>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "MainHeader",
  components: { RouterLink },
});
</script>

<style lang="scss" scoped>
.noUnderline {
  text-decoration: none;
}
</style>
