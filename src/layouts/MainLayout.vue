<template>
    <div class="main-layout">
        <div class="main-layout__tools">
            <h1 class="main-layout__title">Игра "жизнь"</h1>
        </div>
        <div class="main-layout__automata">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
        }

        &__title {
            margin: 6px 0;
            padding: 0 20px;
        }
    }
</style>