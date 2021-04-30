export const formattedNullData: any = (list: any, labels: any) => {
  return labels.map((label: any) => {
    return {
      name: label.name,
      data: list.map((datum) => datum[label.key] || null),
    }
  })
}
