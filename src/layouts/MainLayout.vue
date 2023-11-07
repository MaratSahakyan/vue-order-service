<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="list">
        <q-item-model header class="title">Order Service</q-item-model>
      </q-list>
      <q-item class="item">
        <q-item-section class="item-title">Customers</q-item-section>
      </q-item>
      <q-item class="item">
        <q-item-section class="item-title">Orders</q-item-section>
      </q-item>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.list,
.item {
  padding: 10px;
  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .item-title {
    font-size: 16px;
    cursor: pointer;
  }
  .item-title:hover {
    font-weight: bold;
  }
}
</style>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
});
</script>
