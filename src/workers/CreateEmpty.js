self.addEventListener("message", e => {
    const _num = e.data;

    let _array = [];

    for (let i = 0; i<_num; i++) {
        _array.push(new Array(_num).fill(0));
    }

    self.postMessage(_array);
})