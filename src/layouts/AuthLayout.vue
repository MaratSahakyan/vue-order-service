<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />
    <div class="container">
      <div>
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import MainHeader from "../components/MainHeader.vue";

export default defineComponent({
  name: "AuthLayout",
  components: { MainHeader },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
