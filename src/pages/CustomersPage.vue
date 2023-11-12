<template>
  <q-page padding>
    <div class="header-container">
      <h6>Customers</h6>
      <q-btn class="bg-cyan-8 text-white" @click="openDialog('create')">
        <q-icon name="fa-solid fa-user-tie" />
        <div>Add Customer</div>
      </q-btn>
    </div>
    <div style="max-width: 100%">
      <q-list bordered separator>
        <q-item
          v-for="customer in customerData"
          :key="customer.id"
          clickable
          v-ripple
        >
          <q-item-section>
            <div class="list-item">
              <div>
                <q-item-label>{{ item.lastName }}</q-item-label>
                <q-item-label v-if="item.caption" caption>{{
                  customer.firstName
                }}</q-item-label>
              </div>
              <div>
                <div>Edit</div>
                <div>Delete</div>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <CustomDialog :open="dialogOpen" @closeDialog="closeDialog">
      <template #dialogContent>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-card-section>
      </template>
    </CustomDialog>
  </q-page>
</template>

<script>
import { defineComponent, watch } from "vue";
import CustomDialog from "../components/CustomDialog.vue";

export default defineComponent({
  name: "CustomersPage",

  components: { CustomDialog },

  async created() {
    const customerData = await this.$axios.get("/customers");
    this.customerData = customerData.items;
  },

  methods: {
    openDialog() {
      this.dialogOpen = true;
    },
    closeDialog() {
      this.dialogOpen = false;
    },
  },

  data() {
    return {
      customerData: [],
      dialogOpen: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item,
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
