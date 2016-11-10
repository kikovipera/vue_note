export const filterPhone = (phone) => {
  let code = phone.replace(/[^0-9]+/g, '')
  const len = code.length
  if (len < 11) {
    if (len <= 3) {
      return code
    }
    if (len <= 7) {
      code = code.substring(0, 3) + ' ' + code.substring(3, len)
    } else {
      code = code.substring(0, 3) + ' ' + code.substring(3, 7) + ' ' + code.substring(7, len)
    }
  } else {
    code = code.substring(0, 3) + ' ' + code.substring(3, 7) + ' ' + code.substring(7, 11)
  }
  return code
}