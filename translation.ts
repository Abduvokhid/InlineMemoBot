const sponsors = [{ name: 'Telegram', link: 'https://t.me/telegram' }]

const translation = {
  en: {
    buttons: {
      go_back: '⬅ Go back',
      remove_caption: '♻ Remove caption',
      disable_preview: '🌐 Disable link preview',
      enable_preview: '🌐 Enable link preview',
      add_buttons: '➕ Add buttons',
      confirm_post: '✅ Confirm'
    },
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
      },
      about: {
        content: '<b>Coming soon!</b>'
      },
      create_post: {
        content: '<b>Now send the content of the post.</b>\n\n<i>It might be one of text, photo, audio, video, document, animation/GIF or voice. All other types of content is not accepted.</i>\n\nInclude captions if you need one. Already formatted text/caption is accepted or you can send text/caption with HTML tags.',
        placeholder: 'Send the content...'
      },
      enhance_post: {
        content: "⬆ This is how your post will look like.\n\nPlease, customize if needed. Then confirm the post creation.",
        placeholder: 'Customize or confirm...'
      }
    }
  }
}

export type TranslationKey = keyof typeof translation
export type Translation = typeof translation[TranslationKey]
export default translation
