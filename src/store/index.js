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

        // dynamic
        data: [], // active table data

        size: 40, // size of table
        showGrid: true, // show grid or no

        isAuto: true, // is it going automaticaly
        frequency: .1, // how frequently rendering in seconds
        randomVariety: .5, // random variety

        timeout: null,

        drawType: true,
    },
    getters: {
        getData: state => state.data,
        getSize: state => state.size,
        getShowGrid: state => state.showGrid,
        getIsAuto: state => state.isAuto,
        getRandomVariety: state => state.randomVariety,
        getDrawType: state => state.drawType,
        isSizeMatches: state => state.data.length === state.size,
    },
    mutations: {
        setCellData(state, [i, j]) {
            if(state.isAuto) return null;
            let data = state.data.slice();
            data[i][j] = state.drawType;
            state.data = data;
        },
        setData(state, value) {
            state.data = value;
        },
        setSize(state, val) {
            const value = val || state.size;
            state.isAuto = false;
            state.size = value;

            let data = [];
            for (let i = 0; i < value; i++) {
                let row = [];
                for (let j = 0; j< value; j++) {
                    row.push(false)
                }
                data.push(row)
            }
            state.data = data;
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