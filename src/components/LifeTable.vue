<template>
<!--    <table class="life-table"-->
<!--           :class="{'life-table__disable': !isSizeMatches}"-->
<!--           :border="tableBorder"-->
<!--           @mousedown="mouseDown"-->
<!--           @mouseup="mouseUp"-->
<!--           @mouseleave="mouseUp"-->
<!--    >-->

<!--        <tr v-for="(rowData, i) in data" :key="i">-->
<!--            <td-->
<!--                v-for="(isActive, j) in rowData"-->
<!--                :key="j"-->
<!--                class="life-table__cell"-->
<!--                :class="{'life-table__active': isActive}"-->
<!--                @mouseover="overCell(i, j)"-->
<!--                @mousedown="selectCell([i, j])"-->
<!--            />-->
<!--        </tr>-->

<!--    </table>-->
  <div class="life-table" :class="{'life-table--show-border': showGrid}" @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseUp">
    <div class="life-table__row" v-for="(rowData, i) in data" :key="i">
      <div class="life-table__cell"
           v-for="(isActive, j) in rowData" :key="j"
           :class="{'life-table__active': isActive}"
           @mouseover="overCell(i, j)"
           @mousedown="selectCell([i, j])"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    data:() => ({
      isMouseDown: false
    }),
    computed: {
      ...mapGetters({
          size: "getSize",
          showGrid: "getShowGrid",
          data: "getData",
      }),
      isSizeMatches() {
          return this.data.length === this.size;
      },
      tableBorder() {
          return +this.showGrid;
      }
    },
    methods: {
      ...mapMutations({
        selectCell: "setCellData"
      }),
      mouseDown() {
        this.isMouseDown = true;
      },
      mouseUp() {
        this.isMouseDown = false;
      },
      overCell(i, j) {
        if(this.isMouseDown) {
          this.selectCell([i, j])
        }
      }

    }
}
</script>

<style lang="scss" scoped>
    .life-table {
      width: 100%;
      height: 100%;
      border-spacing: 0;
      cursor: pointer !important;
      display: grid;
      grid-auto-rows: auto;

      &__row {
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
      }

      &__cell {
        height: inherit;
        width: 100%;
        //border: 1px solid black;
      }

        &__cell:hover {
          background-color: #d4d4d4;
        }

        &--show-border {
          .life-table__cell { border: 1px solid black}
        }

        &__disable {
            opacity: .3;
            pointer-events: none;
        }

        &__active {
            background-color: black;
          &:hover {background-color: #595959
          }
        }
    }
</style>