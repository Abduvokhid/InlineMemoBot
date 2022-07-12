import { InlineKeyboard } from 'grammy'
import { Button } from '../types'

export function isValidUrl (urlString: string) {
  if (urlString.startsWith('tg://user?id=')) return true
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i') // validate fragment locator
  return urlPattern.test(urlString)
}

export function generateKeyboard (buttons: Button[][], token: string) {
  const url = `${process.env.WEBAPP_DOMAIN}/buttons/add`
  const keyboard = new InlineKeyboard()
  buttons.forEach((buttonsRow, index) => {
    buttonsRow.forEach((button, index2) => keyboard.text(button.name, `remove_button:${index}-${index2}`))
    keyboard.webApp('+', `${url}?row=${index}&token=${token}`).row()
  })
  keyboard.webApp('+', `${url}?token=${token}`).row()
  return keyboard
}

export function generateInlineKeyboard (buttons: Button[][], post_id: string) {
  const keyboard = new InlineKeyboard()
  buttons.forEach((buttonsRow) => {
    buttonsRow.forEach((button) => {
      switch (button.type) {
        case 'link':
          keyboard.url(button.name, button.link!)
          break
        case 'message_box':
          keyboard.text(button.name, `r:${button.message!}`)
          break
        case 'share':
          keyboard.url(button.name, `https://t.me/share/url?url=${encodeURIComponent(button.message!)}`)
          break
        case 'share_post':
          keyboard.switchInline(button.name, post_id)
          break
      }
    })
    keyboard.row()
  })
  return keyboard
}


