export function toLowercaseValues(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj;
}

export function toTitleCase(str) {
  str = str.toLowerCase();
  str = str.split(' ');

  for (let i = 0; i < str.length; i++) {
    str[i].charAt(0).toUpperCase();
  }

  return str.join(' ');
}
