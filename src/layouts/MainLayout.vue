<template>
  <div class="main-layout">
    <div class="main-layout__tools">
      <h1 class="main-layout__title">Игра "жизнь"</h1>
      <div class="main-layout__checkboxes">
        <BaseCheckbox
          title="Показать сетку"
          :value="showGrid"
          @input="val => set(['showGrid', val])"
        />
        <BaseCheckbox
          title="Автоматически"
          :value="isAuto"
          @input="toggleIsAuto"
        />
        <BaseButton class="block" @click="generateData">Следующий кадр</BaseButton>
        <BaseButton class="block" @click="generateRandomData">Рандом</BaseButton>
      </div>
    </div>
    <div class="main-layout__automata">
      <slot/>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "../components/base/BaseCheckbox";
import BaseButton from "../components/base/BaseButton";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {BaseCheckbox, BaseButton},
  computed: {
    ...mapGetters({
      showGrid: "getShowGrid",
      isAuto: "getIsAuto",
    })
  },
  methods: {
    ...mapActions({
      toggleIsAuto: "toggleIsAuto",
      generateData: "generateData",
      generateRandomData: "generateRandomData",
    }),
    ...mapMutations({
      set: "set"
    })
  }
}
</script>

<style lang="scss" scoped>

    .block {
      display: block;
    }

    .main-layout {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: grid;
      grid-template-columns: 400px 1fr;
      grid-template-areas: "tools automata";

      &__tools {
        // left side
        grid-area: tools;
        border-right: 1px solid black;
      }

      &__automata {
        // right side
        grid: automata;
        overflow: hidden;
      }

      &__title {
        margin: 6px 0;
        padding: 0 20px;
      }

      &__checkboxes {
        margin-top: 40px;
        padding: 0 10px;
      }
    }
</style>