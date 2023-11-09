<template>
  <MainHeader />
</template>

<script>
import { defineComponent } from "vue";
import MainHeader from "../components/MainHeader.vue";

export default defineComponent({
  name: "MainLayout",
  components: { MainHeader },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
});
</script>

<style lang="scss" scoped></style>
