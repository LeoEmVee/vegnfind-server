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
    let val = str[i].charAt(0);
    val = str[i].charAt(0).toUpperCase();
    str[i] = str[i].replace(str[i].charAt(0), val);
  }
  return str.join(' ');
}
