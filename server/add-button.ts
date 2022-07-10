import { Request, Response } from 'express'
import { SessionModel } from '../models/Session'
import bot from '../bot'
import { generateKeyboard, isValidUrl } from '../utils/misc'

const INVALID_REQUEST = { error: 'Invalid request' }
const INVALID_URL = { error: 'Invalid url' }
const INVALID_USER_SESSION = { error: 'Invalid session' }
const INVALID_TOKEN = { error: 'Invalid token' }
const INVALID_POST = { error: 'Invalid post' }

async function addButton (req: Request, res: Response) {
  const { button_data, token, user } = req.body
  if (!button_data || !token || !user) return res.status(404).json(INVALID_REQUEST)

  if (button_data.button.type === 'link' && !isValidUrl(button_data.button.link)) return res.status(404).json(INVALID_URL)

  const session_document = await SessionModel.findOne({ key: user.id })
  if (!session_document) return res.status(404).json(INVALID_USER_SESSION)

  const credentials = session_document.value.credentials
  if (!credentials || token !== credentials.token) return res.status(404).json(INVALID_TOKEN)

  if (!session_document.value.post) return res.status(404).json(INVALID_POST)
  const post = session_document.value.post

  if (button_data.row && post.buttons[button_data.row]) {
    post.buttons[button_data.row].push(button_data.button)
  } else {
    post.buttons.push([button_data.button])
  }

  await SessionModel.updateOne({ key: user.id }, { value: session_document.value })

  await bot.api.editMessageReplyMarkup(
    session_document.key,
    parseInt(post.preview_id!),
    { reply_markup: generateKeyboard(post.buttons, token) }
  )

  return res.status(200).json(session_document.value.post)
}

export default addButton
