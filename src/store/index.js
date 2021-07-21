import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // settings
        rules: {
            1: [2, 3], // if we have 2, 3 lives cell will live
            0: [3] // if we have 3 lives cell will live
        },
        minSize: 4, // minimum table size
        maxSize: 1000, // minimum table size

        // dynamic
        data: [], // active table data

        size: 100, // size of table
        showGrid: false, // show grid or no

        isAuto: true, // is it going automaticaly
        frequency: .1, // how frequently rendering in seconds
        randomVariety: .5, // random variety

        timeout: null,
    },
    getters: {
        getData: state => state.data,
        getSize: state => state.size,
        getShowGrid: state => state.showGrid,
        getIsAuto: state => state.isAuto,
        isSizeMatches: state => state.data.length === state.size,
    },
    mutations: {
        setData(state, value) {
            state.data = value;
        },
        createTimeout(state, callback) {
            clearTimeout(state.timeout);
            state.timeout = setTimeout(callback, state.frequency * 1000);
        },
        clearTimeout(state) {
          clearTimeout(state.timeout);
        },
        set(state, [namespace, value]) {
            state[namespace] = value;
        }
    },
    actions: {
        generateRandomData({ dispatch, state, getters, commit }) {
            let newData = [];
            for(let row = 0; row < state.size; row++) {
                let rowData = [];
                for(let cell = 0; cell < state.size; cell++) {
                    const cellValue = Math.random() < state.randomVariety;
                    rowData.push(cellValue);
                }
                newData.push(rowData);
            }
            state.data = newData;


            // run is auto playing
            const canDoNext = state.isAuto && getters.isSizeMatches;
            commit("createTimeout", () => {
                if(canDoNext) dispatch("generateData")
            })
        },
        // generating next data by active data
        generateData({ state, dispatch, getters, commit }) {
            let nextData = [];
            state.data.forEach((row, rowIndex) => {
                let newRow = [];
                row.forEach((cell, cellIndex) => {
                    let activeCellAround = 0;
                    const prevRowIndex = rowIndex - 1;
                    const prevCellIndex = cellIndex - 1;
                    for(let i = prevRowIndex; i < prevRowIndex + 3; i++) {
                        if(i >= 0 && state.data[i]) {
                            for(let j = prevCellIndex; j < prevCellIndex + 3; j++) {
                                const isSamePosition = i === rowIndex && j === cellIndex;
                                if(!isSamePosition && j >= 0 && state.data[i][j]) {
                                    activeCellAround++;
                                }
                            }
                        }
                    }

                    const cellNextValue = state.rules[+cell].includes(activeCellAround);
                    newRow.push(cellNextValue);
                })
                nextData.push(newRow);
            });
            state.data = nextData;



            /// run is auto playing
            const canDoNext = state.isAuto && getters.isSizeMatches;
            commit("createTimeout", () => {
                if(canDoNext) dispatch("generateData")
            })
        },
        toggleIsAuto({ commit, dispatch, state }) {
            commit("set", ["isAuto", !state.isAuto]);
            if(state.isAuto) dispatch("generateData");
        }
    }
})