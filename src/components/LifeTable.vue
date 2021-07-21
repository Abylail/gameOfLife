<template>
    <table class="life-table" :class="{'life-table__disable': !isSizeMatches}" :border="tableBorder">
        <tr v-for="(rowData, i) in data" :key="i">
            <td
                v-for="(isActive, j) in rowData"
                :key="j"
                :class="{'life-table__active': isActive}"
            />
        </tr>
    </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    }
}
</script>

<style lang="scss" scoped>
    .life-table {
      width: 100%;
      height: 100%;
      border-spacing: 0;

        &__disable {
            opacity: .3;
            pointer-events: none;
        }

        &__active {
            background-color: black;
        }
    }
</style>