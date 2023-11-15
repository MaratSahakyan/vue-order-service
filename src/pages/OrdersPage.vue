<template>
  <div>
    <q-tabs v-model="tab" class="bg-grey-9" dense align="justify">
      <q-tab
        class="text-orange"
        name="Pending"
        icon="fa-solid fa-spinner"
        label="Pendings"
      />
      <q-tab
        class="text-cyan"
        name="Completed"
        icon="fa-solid fa-circle-check"
        label="Completeds"
      />
      <q-tab
        class="text-red"
        name="Cancelled"
        icon="fa-solid fa-xmark"
        label="Cancelleds"
      />
    </q-tabs>

    <div class="header-container">
      <h6>Orders</h6>
      <q-btn class="bg-cyan-8 text-white" @click="openDialog('create')">
        <q-icon name="fa-solid fa-list-check" />
        <div>Add Order</div>
      </q-btn>
    </div>

    <q-list bordered separator>
      <q-item v-for="order in orders" :key="order.id" clickable v-ripple>
        <q-item-section>
          <div class="list-item">
            <div>
              <div class="flex-container">
                <div>
                  <h6>Name</h6>
                  <q-item-label>{{ order.name }}</q-item-label>
                </div>
                <div>
                  <h6>Quantity</h6>
                  <q-item-label>{{ order.quantity }}</q-item-label>
                </div>
                <div>
                  <h6>Price</h6>
                  <q-item-label>{{ order.price }}</q-item-label>
                </div>
                <div>
                  <h6>Create Date</h6>
                  <q-item-label>{{
                    translateTimestamp(order.createdAt)
                  }}</q-item-label>
                </div>
                <div>
                  <h6>Update Date</h6>
                  <q-item-label>{{
                    translateTimestamp(order.updatedAt)
                  }}</q-item-label>
                </div>
              </div>
            </div>
            <div class="btn-container">
              <q-btn label="Edit" @click.stop="handleEditOrder(order.id)" />
              <q-btn label="Delete" @click.stop="deleteOrder(order.id)" />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <q-pagination
      v-model="current"
      v-if="paginationMeta.totalPages"
      :max="paginationMeta.totalPages"
      direction-links
      class="pagination"
      outline
      color="teal"
      active-design="push"
      active-color="orange"
    />
    <CustomDialog :open="dialogOpen" @closeDialog="closeDialog">
      <template #dialogContent>
        <CreateEditOrder
          :orderData="orderData"
          :closeDialog="closeDialog"
          :onSubmit="dialogMode === 'create' ? createOrder : editOrder"
          :mode="dialogMode"
          :statusOptions="['Pending', 'Completed', 'Cancelled']"
          :customerOptions="customers"
        />
      </template>
    </CustomDialog>
  </div>
</template>

<script>
import useRouter from "../hooks/useRouter";
import CustomDialog from "../components/CustomDialog.vue";
import CreateEditOrder from "../components/CreateEditOrder.vue";
import { translateTimestamp } from "../utils/dateTools";
export default {
  name: "OrdersPage",
  components: { CustomDialog, CreateEditOrder },

  setup() {
    const router = useRouter();

    return {
      router,
      translateTimestamp,
    };
  },

  methods: {
    openDialog(mode) {
      this.dialogMode = mode;
      this.dialogOpen = true;
    },

    closeDialog() {
      this.dialogOpen = false;
      this.cleanOrderData();
    },

    cleanOrderData() {
      this.orderData = {
        name: "",
        quantity: 1,
        price: 0,
        status: "Pending",
      };
    },

    handleEditOrder(orderId) {
      this.openDialog("edit");
      this.makeEdit(orderId);
    },
    async getOrdersByStatus(page) {
      try {
        const { data } = await this.$axios.get(
          `orders/status?status=${this.tab}&page=${page || this.current}`
        );
        this.orders = data.items;
        this.paginationMeta = data.meta;
        this.current = data.meta.currentPage;
      } catch (error) {
        throw error;
      }
    },
    async getCustomers() {
      try {
        const { data } = await this.$axios.get(`/customers`);

        const filteredData = data.items.map(({ username, id }) => ({
          username,
          customerId: id,
        }));

        this.customers = filteredData;
      } catch (error) {
        throw error;
      }
    },

    async makeEdit(orderId) {
      try {
        const { data } = await this.$axios.get(`/orders/${orderId}`);
        this.orderData = data;
      } catch (error) {
        throw error;
      }
    },

    async deleteOrder(orderId) {
      try {
        await this.$axios.delete(`/orders/${orderId}`);
        this.getOrdersByStatus();
      } catch (error) {
        throw error;
      }
    },

    async editOrder(editOrderData) {
      try {
        delete editOrderData.createdAt;
        delete editOrderData.updatedAt;
        editOrderData.price = Number(editOrderData.price);
        editOrderData.quantity = Number(editOrderData.quantity);
        await this.$axios.patch(`/orders/${editOrderData.id}`, editOrderData);
        this.closeDialog();
        this.getOrdersByStatus();
      } catch (error) {
        throw error;
      }
    },

    async createOrder(orderData) {
      try {
        orderData.price = Number(orderData.price);
        orderData.quantity = Number(orderData.quantity);
        await this.$axios.post("/orders/create", orderData);
        this.tab = "Pending";
        this.getOrdersByStatus();
        this.closeDialog();
      } catch (error) {
        throw error;
      }
    },
  },

  created() {
    this.getCustomers();
    this.getOrdersByStatus();
  },

  watch: {
    tab() {
      this.getOrdersByStatus();
    },
    current(newVal) {
      this.getOrdersByStatus(newVal);
    },
  },

  data() {
    return {
      customers: [],
      orders: [],
      tab: "Pending",
      dialogOpen: false,
      dialogMode: "create",
      paginationMeta: {},
      current: 1,
      orderData: {
        name: "",
        quantity: 1,
        price: 0,
        status: "Pending",
        customerId: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  div {
    min-width: 100px;
    h6 {
      margin: 0 0 5px 0;
      text-align: center;
    }
    div {
      margin: 0;
      font-size: 18px;
      text-align: center;
    }
  }
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
