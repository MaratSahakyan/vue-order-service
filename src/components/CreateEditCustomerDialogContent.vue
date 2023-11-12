<template>
  <q-card-section>
    <div class="text-h6">Create customer</div>
  </q-card-section>
  <q-card-section class="q-pt-none">
    <q-form @submit.prevent="onSubmit(localCustomerData)" class="form">
      <q-input
        v-model="localCustomerData.firstName"
        label="First Name"
        outlined
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 3) ||
            'Please type your first name, min 2 symbol.',
        ]"
      />
      <q-input
        v-model="localCustomerData.lastName"
        label="Last Name"
        outlined
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 3) ||
            'Please type your last name, min 2 symbol.',
        ]"
      />
      <q-input
        v-model="localCustomerData.username"
        label="User Name"
        outlined
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 3) ||
            'Please type your user name, min 2 symbol.',
        ]"
      />
      <q-input
        outlined
        v-model="localCustomerData.dob"
        type="date"
        :dense="dense"
        label="Date of Birth"
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
  name: "CreateEditCustomerDialogContent",
  props: ["closeDialog", "onSubmit", "customerData", "mode"],
  data() {
    return {
      localCustomerData: { ...this.customerData },
    };
  },

  watch: {
    customerData: {
      handler(newVal) {
        this.localCustomerData = { ...newVal };
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
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
