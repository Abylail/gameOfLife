<template>
    <table class="life-table"
           :class="{'life-table__disable': !isSizeMatches}"
           :border="tableBorder"
           @mousedown="mouseDown"
           @mouseup="mouseUp"
           @mouseleave="mouseUp"
    >

        <tr v-for="(rowData, i) in data" :key="i">
            <td
                v-for="(isActive, j) in rowData"
                :key="j"
                class="life-table__cell"
                :class="{'life-table__active': isActive}"
                @mouseover="overCell(i, j)"
                @mousedown="selectCell([i, j])"
            />
        </tr>

    </table>
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

        &__cell:hover {
          background-color: #d4d4d4;
        }

        &__disable {
            opacity: .3;
            pointer-events: none;
        }

        &__active {
            background-color: black;
        }
    }
</style>