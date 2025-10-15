import { changeLocaleData } from "./local-data.js";

export function deleteElementLocal(data, id) {
  const result = data.filter((el) => el.id !== id);
  changeLocaleData(result);
}

export function addElementLocal(data, newData) {
  const result = [newData, ...data];
  changeLocaleData(result);
}

export function editElementLocal(data, editedData) {
  const result = data.map((el) => {
    if (el.id === editedData.id) {
      return editedData;
    } else {
      return el;
    }
  });
  changeLocaleData(result);
}
