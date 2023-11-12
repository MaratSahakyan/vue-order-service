<template>
  <div class="header-container">
    <h6>Customers</h6>
    <q-btn class="bg-cyan-8 text-white" @click="openDialog('create')">
      <q-icon name="fa-solid fa-user-tie" />
      <div>Add Customer</div>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "CustomersHeader",
  props: ["openDialog"],
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
