<template>
  <div id="app">
    <MainLayout>
      <LifeTable/>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import LifeTable from "@/components/LifeTable";

export default {
  components: { MainLayout, LifeTable },
  mounted() {
    this.$store.dispatch("generateRandomData");
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
