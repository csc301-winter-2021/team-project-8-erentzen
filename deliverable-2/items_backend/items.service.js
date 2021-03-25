module.exports = {
    getAll
}

async function getAll() {
    const initiallySortedRows = [
        [1, "UofT hoodie", "White, S", 34, 2, 59.99],
        [2, "UofT hoodie", "White, L", 52, 1, 59.99],
        [3, "UofT hat", "Blue", 15, 0, 32.99],
        [4, "UofT T-Shirt", "Black", 0, 0, 27.99],
        [5, "UofT T-Shirt", "White", 1, 0, 27.99]
      ]
    console.log("reached backend")
    return initiallySortedRows
}
