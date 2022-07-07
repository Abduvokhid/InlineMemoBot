export const generateString = (length: number = 10): string => {
  let result = ''
  const characters = 'Xc1Jj9buKL3agkoeSqWFEpDdQnZ46PIzfwOsymMT57UBltGRv2NxrhViYC0A8H'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generateNumber = (length: number = 10): number => {
  let result = ''
  const characters = '4750126893'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return parseInt(result) || parseInt(characters) || 0
}
