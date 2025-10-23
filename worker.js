// function test() {
//   for (let i = 0; i < 1000000000; i++) {
//     console.log(i);
//   }
// }
// onmessage = (evt) => {
//   if (evt.data === "test") test();
// };

function fiterByType(data, type) {
  const types = data.map((el) => el[type]);
  const result = Array.from(new Set(types));
  return result;
}

function search(data, key) {
  const result = [];
  data.forEach((el) => {
    if (el.name.toLowerCase().includes(key.toLowerCase())) {
      result.push(el);
    }
  });
  return result;
}

const actions = {
  fiterByType,
  search,
};

onmessage = (evt) => {
  const func = evt.data.functionName;
  const params = evt.data.params;
  const result = actions[func](...params);
  postMessage({ result, target: func });
};
