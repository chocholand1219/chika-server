const objToTd = (obj): string =>
  Object.keys(obj)
    .map(
      (key) =>
        `<td style="border: 1px solid #444; padding: 5px;">${obj[key]}</td>`
    )
    .join('')

export default (descriptions): string => {
  return `<table style="border: 1px solid #444;">${descriptions
    .map((desc) => `<tr style="border: 1px solid #444;">${objToTd(desc)}</tr>`)
    .join('')}</table>`
}
