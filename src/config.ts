/**
 * Configurações globais do site Aegon v4.
 * ⚠️ Substitua o número do WhatsApp antes de publicar (formato internacional, só dígitos).
 */
export const WHATSAPP_NUMBER = '5500000000000'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá, Aegon! Vim pelo site e gostaria de conversar sobre um desafio do meu negócio.'

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const VIDEO_SRC = '/assets/video/world.mp4'

