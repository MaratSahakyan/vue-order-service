<template>
  <div class="container">
    <q-img
      src="https://www.nowcommerce.com/hubfs/business_188.jpg"
      spinner-color="white"
      img-class="my-custom-image"
      class="img"
    >
      <div class="absolute-top text-subtitle1 text-center title">
        Overcome Your Customer Order Management Challenges
      </div>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: calc(100vh - 50px);
}

.title {
  font-size: 24px;
}
</style>
