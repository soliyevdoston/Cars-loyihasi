export function getFormData(form) {
  const formData = new FormData(form);
  const result = {};
  formData.forEach((value, key) => {
    const bracketMatch = key.match(/^(\w+)\[(\w+)\]$/);
    if (bracketMatch) {
      const parent = bracketMatch[1];
      const child = bracketMatch[2];
      if (!result[parent] || typeof result[parent] !== "object") {
        result[parent] = {};
      }
      result[parent][child] = value;
    } else {
      result[key] = value;
    }
  });
  return result;
}
