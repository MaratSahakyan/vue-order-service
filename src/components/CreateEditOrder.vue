<template>
  <q-card-section>
    <div class="text-h6">Create Order</div>
  </q-card-section>
  <q-card-section class="q-pt-none">
    <q-form @submit.prevent="onSubmit(localOrderData)" class="form">
      <q-input
        v-model="localOrderData.name"
        label="Order Name"
        outlined
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 3) ||
            'Please type your first name, min 2 symbol.',
        ]"
      />
      <q-input
        v-model="localOrderData.quantity"
        label="Quantity"
        type="number"
        outlined
        lazy-rules
        :rules="[(val) => (val && !(val % 1)) || 'Please type integer.']"
      />
      <q-input
        v-model="localOrderData.price"
        label="Price"
        type="number"
        step="any"
        outlined
        lazy-rules
        :rules="[
          (val) => (val && val > 0) || 'Price should be greater then 0 .',
        ]"
      />

      <q-select
        outlined
        v-model="localOrderData.status"
        :options="statusOptions"
      />

      <q-select
        v-if="customerOptions"
        outlined
        v-model="localOrderData.customerId"
        :options="customerOptions"
        label="User Name"
        emit-value
        map-options
        option-label="username"
        option-value="customerId"
      />

      <div class="btn-container">
        <q-btn :label="mode" type="submit" class="bg-secondary text-white" />
        <q-btn
          flat
          style="color: #ff0080"
          label="Cancel"
          @click="closeDialog"
        />
      </div>
    </q-form>
  </q-card-section>
</template>

<script>
export default {
  name: "CreateEditOrder",
  props: [
    "closeDialog",
    "onSubmit",
    "orderData",
    "mode",
    "statusOptions",
    "customerOptions",
  ],
  data() {
    return {
      localOrderData: { ...this.orderData },
    };
  },

  watch: {
    orderData: {
      handler(newVal) {
        this.localOrderData = { ...newVal };
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  label {
    padding: 0;
    color: #000;
  }
  .btn-container {
    display: flex;
    gap: 10px;
    justify-content: right;
    margin-top: 10px;
    button {
      text-transform: capitalize;
    }
  }
}
</style>
