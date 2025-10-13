function test() {
  for (let i = 0; i < 1000000000; i++) {
    console.log(i);
  }
}
onmessage = (evt) => {
  if (evt.data === "test") test();
};
