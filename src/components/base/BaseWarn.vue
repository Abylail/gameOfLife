<template>
  <span class="warn"><slot/></span>
</template>

<script>
export default {
  name: "BaseWarm"
}
</script>

<style lang="scss" scoped>
.warn {
  color: red;
  font-size: 14px;
}
</style>