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
    <q-pagination
      v-model="current"
      :max="paginationData.totalPages"
      direction-links
      class="pagination"
      outline
      color="teal"
      active-design="push"
      active-color="orange"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import useRouter from "../../hooks/useRouter";
export default {
  name: "CustomersContent",
  props: [
    "customersData",
    "makeEdit",
    "openDialog",
    "deleteCustomer",
    "paginationMeta",
    "getCustomers",
  ],

  watch: {
    paginationMeta(newVal) {
      this.paginationData = newVal;
    },
  },

  data() {
    return {
      paginationData: {},
    };
  },

  setup(props) {
    const router = useRouter();
    const current = ref(props.paginationMeta.currentPage);

    watch(
      () => props.paginationMeta.currentPage,
      (newPage, oldPage) => {
        if (newPage !== oldPage) {
          current.value = newPage;

          props.getCustomers(newPage);
        }
      }
    );

    watch(current, (newValue) => {
      props.getCustomers(newValue);
    });

    return {
      router,
      current,
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

.pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
