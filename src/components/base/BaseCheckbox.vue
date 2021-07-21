<template>
  <div class="checkbox">
    <div class="checkbox__value" :class="{'checkbox__value-active': value}" @click="checkboxHandle"/>
    <span class="checkbox__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    value: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    checkboxHandle() {
      this.$emit("input", !this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    align-items: center;
    margin: 10px 0;

    &__value {
      height: 30px;
      width: 30px;
      border-radius: 3px;
      border: 1px solid black;
      cursor: pointer;

      &-active {
        background: cadetblue;
      }
    }

    &__title {
      margin-left: 10px;
    }
  }
</style>