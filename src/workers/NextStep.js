self.addEventListener("message", e => {
    const _rules = {
            1: [2, 3], // if we have 2, 3 lives cell will live
            0: [3] // if we have 3 lives cell will live
    };

    let array = e.data;
    let _array = [];

    array.forEach((row, rowIndex) => {
        let newRow = [];
        row.forEach((cell, cellIndex) => {
            let activeCellAround = 0;
            const prevRowIndex = rowIndex - 1;
            const prevCellIndex = cellIndex - 1;
            for(let i = prevRowIndex; i < prevRowIndex + 3; i++) {
                if(i >= 0 && array[i]) {
                    for(let j = prevCellIndex; j < prevCellIndex + 3; j++) {
                        const isSamePosition = i === rowIndex && j === cellIndex;
                        if(!isSamePosition && j >= 0 && array[i][j]) {
                            activeCellAround++;
                        }
                    }
                }
            }

            const cellNextValue = _rules[+cell].includes(activeCellAround);
            newRow.push(cellNextValue);
        })
        _array.push(newRow);
    })

    array = _array;

    self.postMessage(array);
})