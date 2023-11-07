<template>
  <q-layout view="lHh Lpr lFf">
    <div class="container">
      <div class="imageContainer">
        <q-img
          src="https://www.vardells.co.uk/wp-content/uploads/2019/02/services.jpg"
          class="img"
        >
          <div class="absolute-full text-subtitle2 flex flex-center">
            Caption
          </div>
        </q-img>
      </div>
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

export default defineComponent({
  name: "AuthLayout",
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  div {
    flex: 1;
  }
  .imageContainer {
    width: 50vw;
    height: 100vh;

    @media (max-width: 1045px) {
      display: none;
    }

    .img {
      width: 50vw;
      height: 100%;
    }
  }
}
</style>
