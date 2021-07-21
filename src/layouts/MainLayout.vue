<template>
  <div class="main-layout">
    <div class="main-layout__tools">
      <h1 class="main-layout__title">Игра "жизнь"</h1>
      <h2 class="main-layout__description">Клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году.</h2>

      <p class="main-layout__text-devider">Правила</p>
      <p class="main-layout__description">1) В мёртвой клетке, рядом с которой ровно три живые клетки, <strong>зарождается жизнь</strong></p>
      <p class="main-layout__description">2) Если у живой клетки соседей меньше двух или больше трёх, <strong>клетка умирает</strong> («от одиночества» или «от перенаселённости»)</p>

      <div class="main-layout__checkboxes">

        <p class="main-layout__text-devider">Управление</p>
        <BaseButton class="block" @click="toggleIsAuto" stretch>{{ playStopTitle }}</BaseButton>
        <BaseButton class="block" @click="generateData" stretch>Следующий кадр</BaseButton>
        <BaseButton class="block" @click="generateRandomData" stretch>Рандом</BaseButton>

        <p class="main-layout__text-devider">Настройки</p>
        <BaseCheckbox
            title="Показать сетку"
            :value="showGrid"
            @input="val => set(['showGrid', val])"
        />
        <BaseRange
          title="Размер таблицы"
          :value="size"
          :min="10"
          :max="200"
          @input="setSize"
        />
        <BaseRange
          title="Частота появления (рандом в процентах)"
          :value="randomVariety * 100"
          @input="val => set(['randomVariety', val/100])"
        />

        <div :class="{disable: isAuto}">
          <p class="main-layout__text-devider">Создай сам</p>
          <BaseWarn v-if="isAuto">Что бы использовать нужно поставить паузу</BaseWarn>
          <div class="main-layout__row">
            <BaseButton :class="{disable: drawType}" @click="set(['drawType', true])">Выделять</BaseButton>
            <BaseButton :class="{disable: !drawType}" @click="set(['drawType', false])">Удалять</BaseButton>
            <BaseButton @click="setSize">Очитить</BaseButton>
          </div>
        </div>
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
import BaseRange from "../components/base/BaseRange";
import BaseWarn from "../components/base/BaseWarn";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {BaseCheckbox, BaseButton, BaseRange,BaseWarn},
  computed: {
    ...mapGetters({
      showGrid: "getShowGrid",
      isAuto: "getIsAuto",
      size: "getSize",
      randomVariety: "getRandomVariety",
      drawType: "getDrawType"
    }),
    playStopTitle() {
      return this.isAuto ? "Пауза" : "Начать";
    }
  },
  methods: {
    ...mapActions({
      toggleIsAuto: "toggleIsAuto",
      generateData: "generateData",
      generateRandomData: "generateRandomData",
    }),
    ...mapMutations({
      set: "set",
      setSize: "setSize"
    })
  }
}
</script>

<style lang="scss" scoped>

    .block {
      display: block;
    }

    .disable {
      opacity: .3;
      pointer-events: none;
    }

    .main-layout {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      display: grid;
      grid-template-columns: 500px 1fr;
      grid-template-areas: "tools automata";

      &__description {
        font-size: 16px;
      }

      &__row {
        display: flex;
        justify-content: space-between;
      }

      &__tools {
        // left side
        grid-area: tools;
        border-right: 1px solid black;
        padding: 0 15px;
        overflow: auto;
      }

      &__automata {
        // right side
        grid: automata;
        overflow: hidden;
      }

      &__title {
        font-size: 22px;
        margin: 30px 0 10px 0;
        padding: 0 20px;
      }

      &__checkboxes {
        margin-top: 40px;
      }

      &__text-devider {
        margin-top: 30px;
        margin-bottom: 10px;
      }
    }
</style>