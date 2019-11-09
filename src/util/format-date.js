// Formats date by replacing month field according to month number
// Month index format (for intl plugin) is "months.MM"
// Given date format MUST be "MM DD, YYY"
export default (intl, date) => {
  const monthNum = date.substring(0, 2)
  const monthString = intl.messages[`months.${monthNum}`]
  const restString = date.substring(2)
  return `${monthString}${restString}`
}
