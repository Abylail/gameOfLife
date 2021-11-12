import Vue from "vue";

import CreateEmpty from "worker-loader!@/workers/CreateEmpty";
import NextStep from "worker-loader!@/workers/NextStep";

class WorkerService {
    _value = null;
    _taskStack = []; // { value, resolver }
    _resolver = null;
    _status = "FREE"; // FREE OR PENDING

    constructor(worker) {
        this._worker = worker();
        this._worker.onmessage = mes => this._onmessage(mes);
    }

    _isFree() {
        return this._status === "FREE";
    }

    _onmessage({data}) {
        this._value = data;
        this.onchange(this._value);
        if (this._resolver) this._resolver(data);

        if (!this._taskStack.length) {
            this._status = "FREE";
            this._resolver = null;
        }
        else {
            const nextTask = this._taskStack.shift();
            this._resolver = nextTask.resolver;
            this.set(nextTask.value);
        }
    }

    get() {
        return this._value;
    }
    set(val) {
        if (!Array.isArray(val)) this._worker.postMessage(val);
        else this._worker.postMessage(val, new ArrayBuffer());
    }
    onchange() {}

    async promise(val) {
        const _this = this;
        return await new Promise((res) => {
            if (_this._isFree()) {
                _this.set(val);
                _this._status = "PENDING";
                _this._resolver = res;
            }
            else {
                _this._taskStack.push({
                    value: val,
                    resolver: res
                });
            }
        })
    }
}


const calc = {
    install(Vue) {
        Vue.prototype.$calc = {
            createEmpty: new WorkerService(CreateEmpty),
            nextStep: new WorkerService(NextStep),
        }
    }
}



Vue.use(calc);