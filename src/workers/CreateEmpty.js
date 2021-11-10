self.addEventListener("message", e => {
    const data = e.data;
    console.log("CREATE EMPTY");
    self.postMessage(data);
})