<template>
  <button @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
}
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
    margin: 10px 0;
    background-color: cadetblue;
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px 25px;
    color: white;
    font-size: 20px;
    transition: .15s;
    user-select: none;

    &:active {opacity: .5}
    &:hover {opacity: .7}
  }
</style>