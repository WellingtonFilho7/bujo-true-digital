function crc16(str: string): string {
  let crc = 0xffff
  for (const char of str) {
    crc ^= char.charCodeAt(0) << 8
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
}

function f(id: string, value: string): string {
  return `${id}${String(value.length).padStart(2, '0')}${value}`
}

/** Gera payload EMV estático para QR Code Pix (sem valor fixo). */
export function pixPayload(key: string, name: string, city = 'Gurinhm'): string {
  const n = name.normalize('NFD').replace(/\p{Mn}/gu, '').trim().slice(0, 25)
  const c = city.normalize('NFD').replace(/\p{Mn}/gu, '').trim().slice(0, 15)
  const merchantAccount = f('00', 'BR.GOV.BCB.PIX') + f('01', key)
  const additionalData = f('05', '***')
  const body = [
    f('00', '01'),
    f('26', merchantAccount),
    f('52', '0000'),
    f('53', '986'),
    f('58', 'BR'),
    f('59', n),
    f('60', c),
    f('62', additionalData),
    '6304',
  ].join('')
  return body + crc16(body)
}
