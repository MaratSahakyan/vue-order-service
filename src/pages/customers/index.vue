<template>
  <q-page padding>
    <CustomersHeader :openDialog="openDialog" />
    <CustomersContent
      :customersData="customersData"
      :makeEdit="makeEdit"
      :openDialog="openDialog"
      :deleteCustomer="deleteCustomer"
      :paginationMeta="paginationMeta"
      :getCustomers="getCustomers"
    />
    <CustomDialog :open="dialogOpen" @closeDialog="closeDialog">
      <template #dialogContent>
        <CreateEditCustomerDialogContent
          :customerData="customerData"
          :closeDialog="closeDialog"
          :onSubmit="dialogMode === 'create' ? cereateCustomer : editCustomer"
          :mode="dialogMode"
        />
      </template>
    </CustomDialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CustomDialog from "../../components/CustomDialog.vue";
import CustomersHeader from "./CustomersHeader.vue";
import CustomersContent from "./CustomersContent.vue";
import CreateEditCustomerDialogContent from "../../components/CreateEditCustomerDialogContent.vue";

export default defineComponent({
  name: "CustomersPage",

  components: {
    CustomDialog,
    CustomersHeader,
    CustomersContent,
    CreateEditCustomerDialogContent,
  },

  created() {
    this.getCustomers();
  },

  methods: {
    openDialog(mode) {
      this.dialogMode = mode;
      this.dialogOpen = true;
    },

    closeDialog() {
      this.dialogOpen = false;
      this.cleanCustomerData();
    },

    async getCustomers(page) {
      const { data } = await this.$axios.get(`/customers?page=${page || 1}`);
      this.customersData = data.items;
      this.paginationMeta = data.meta;
    },

    cleanCustomerData() {
      this.customerData = {
        firstName: "",
        lastName: "",
        username: "",
        dob: "",
      };
    },

    async makeEdit(customerId) {
      try {
        const { data } = await this.$axios.get(`/customers/${customerId}`);
        this.customerData = data;
      } catch (error) {
        throw error;
      }
    },

    async deleteCustomer(customerId) {
      try {
        await this.$axios.delete(`/orders/delete/${customerId}`);
        await this.$axios.delete(`/customers/${customerId}`);
        this.getCustomers();
      } catch (error) {
        throw error;
      }
    },

    async editCustomer(editCustomerData) {
      try {
        await this.$axios.patch(
          `/customers/${editCustomerData.id}`,
          editCustomerData
        );
        this.closeDialog();
        this.getCustomers();
      } catch (error) {
        throw error;
      }
    },

    async cereateCustomer(customerData) {
      try {
        await this.$axios.post("/customers/create", customerData);
        this.getCustomers();
        this.closeDialog();
      } catch (error) {
        throw error;
      }
    },
  },

  data() {
    return {
      customersData: [],
      dialogOpen: false,
      dialogMode: "create",
      customerData: {
        firstName: "",
        lastName: "",
        username: "",
        dob: "",
      },
      paginationMeta: {},
    };
  },
});
</script>
