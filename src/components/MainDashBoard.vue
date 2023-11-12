<template>
  <div>
    <q-layout view="lHh Lpr lff" container style="height: 100vh">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <RouterLink to="/customers" class="text-black"
              ><q-item
                @click="handleChangeSelectedTab('customers')"
                :active="selectedItem === 'customers'"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-tie" />
                </q-item-section>

                <q-item-section> Customers </q-item-section>
              </q-item>
            </RouterLink>

            <RouterLink to="/orders" class="text-black">
              <q-item
                @click="handleChangeSelectedTab('orders')"
                :active="selectedItem === 'orders'"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-list-check" />
                </q-item-section>

                <q-item-section> Orders </q-item-section>
              </q-item>
            </RouterLink>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">{{ userData?.username }}</div>
          </div>
        </q-img>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getUserData } from "src/providers/authProvider";

export default {
  name: "MainDashBoard",

  components: { RouterLink },

  async created() {
    const userData = await getUserData();
    this.userData = userData;
  },

  setup() {
    return {
      drawer: ref(false),
    };
  },

  methods: {
    handleChangeSelectedTab(item) {
      this.selectedItem = item;
    },
  },

  data() {
    return {
      userData: {},
      selectedItem: "customers",
    };
  },
};
</script>
