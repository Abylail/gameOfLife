import Vue from "vue";

class _WorkerService {
    constructor() {

    }

}

Vue.prototype.$calculations = {
    _workerService: new _WorkerService(),
    createEmpty(num) {
        console.log("num", num);
    }
};
