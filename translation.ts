const sponsors = [{ name: 'Обзорчик+', link: 'https://t.me/ObzorchikPlus' }]

const translation = {
  en: {
    errors: {
      invalid_tags: '<b>Please, send valid text/caption with HTML tags or send formatted text/caption instead!</b>'
    },
    buttons: {
      go_back: '⬅ Go back',
      remove_caption: '♻ Remove caption',
      disable_preview: '🌐 Disable link preview',
      enable_preview: '🌐 Enable link preview',
      add_buttons: '➕ Add buttons',
      confirm_post: '✅ Confirm'
    },
    inline: {
      create_post: 'Create a post',
      result_title: 'Click here to send',
      result_description: 'The post will be sent here on your behalf'
    },
    menu: {
      create_post: '📝 Create a post',
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
        content: '<b>@InlineMemoBot</b> — helps to create posts to send them later to any chat without re-creating it. Bot supports text, photo, video, audio, voice, GIF and document. Just type <code>@InlineMemoBot</code> and post ID in any chat to send created post.\n\nContact me with suggestions and feedback: @Developer616'
      },
      create_post: {
        content: '<b>Now send the content of the post.</b>\n\n<i>It might be one of text, photo, audio, video, document, animation/GIF or voice. All other types of content is not accepted.</i>\n\nInclude captions if you need one. Already formatted text/caption is accepted or you can send text/caption with HTML tags.',
        placeholder: 'Send the content...'
      },
      enhance_post: {
        content: '<b>⬆ This is how your post will look like.</b>\n\nPlease, customize if needed. Then confirm the post creation.\n\nClick the added button to remove it from the post.',
        placeholder: 'Customize or confirm...'
      },
      confirm_post: {
        content: '<b>⬆ Your post has been created!</b>\n\nUse the given code to send the post anywhere.'
      }
    }
  }
}

export type TranslationKey = keyof typeof translation
export type Translation = typeof translation[TranslationKey]
export default translation
