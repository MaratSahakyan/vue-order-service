<template>
  <div>
    <q-list bordered separator>
      <q-item
        v-for="customer in customersData"
        :key="customer.id"
        clickable
        v-ripple
      >
        <q-item-section @click="handleWatchCustomerDetails(customer.id)">
          <div class="list-item">
            <div>
              <div class="flex-container">
                <q-item-label>{{ customer.lastName }}</q-item-label>
                <q-item-label>{{ customer.firstName }}</q-item-label>
              </div>
              <q-item-label caption>{{ customer.dob }}</q-item-label>
            </div>
            <div class="btn-container">
              <q-btn
                label="Edit"
                @click.stop="handleEditCustomer(customer.id)"
              />
              <q-btn label="Delete" @click.stop="deleteCustomer(customer.id)" />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import useRouter from "../../hooks/useRouter";
export default {
  name: "CustomersContent",
  props: ["customersData", "makeEdit", "openDialog", "deleteCustomer"],

  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  methods: {
    handleEditCustomer(id) {
      this.makeEdit(id);
      this.openDialog("edit");
    },

    handleWatchCustomerDetails(id) {
      this.$router.push({ path: `/customers/customer/${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .flex-container {
    display: flex;
    align-items: center;
    gap: 5px;
    .q-item__label {
      margin: 0;
    }
  }

  .btn-container {
    display: flex;
    gap: 10px;
  }
}
</style>
