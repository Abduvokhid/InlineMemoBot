const sponsors = [{ name: 'Telegram', link: 'https://t.me/telegram' }]

const translation = {
  en: {
    menu: {
      create_post: '✏ Create a post',
      about_us: '📖 About us',
      sponsors: '✨ Sponsors'
    },
    sections: {
      main: {
        content: '<b>Welcome to @InlineMemoBot!</b>\n\nPlease, select the necessary menu item to continue or forward me any message to proceed with creating a post.',
        placeholder: 'Select the menu item...'
      },
      sponsors: {
        content: '<b>The list of our sponsors:</b>',
        list: sponsors
      }
    }
  }
}

export type TranslationKey = keyof typeof translation
export type Translation = typeof translation[TranslationKey]
export default translation
