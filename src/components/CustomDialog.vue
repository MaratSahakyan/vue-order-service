<template>
  <q-dialog v-model="dialogVisible" @hide="onDialogClose">
    <q-card>
      <slot name="dialogContent"></slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CustomDialog",
  props: ["open", "closeDialog"],
  data() {
    return {
      dialogVisible: this.open,
    };
  },
  watch: {
    open(newVal) {
      this.dialogVisible = newVal;
    },
  },
  methods: {
    onDialogClose() {
      this.$emit("closeDialog");
    },
  },
};
</script>
