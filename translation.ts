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
        content: '<b>⬆ This is how your post will look like.</b>\n\nPlease, customize if needed. Then confirm the post creation.\n\nMoreover, you can add link buttons right here by sending one or more links in the following format: <code>[Text + Link]</code>. To add several link buttons in a row, write links in the same line. To add several rows, separate them with a new line.\n\nPS: Click the added button to remove it from the post.',
        placeholder: 'Customize or confirm...'
      },
      confirm_post: {
        content: '<b>⬆ Your post has been created!</b>\n\nUse the given code to send the post anywhere.'
      }
    }
  },
  ru: {
    errors: {
      invalid_tags: '<b>Пожалуйста, отправьте правильный текст/заголовок с HTML тегами или вместо него отправьте форматированный текст/заголовок!</b>'
    },
    buttons: {
      go_back: '⬅ Назад',
      remove_caption: '♻ Удалить заголовок',
      disable_preview: '🌐 Отключить превью ссылок',
      enable_preview: '🌐 Включить превью ссылок',
      add_buttons: '➕ Добавить кнопки',
      confirm_post: '✅ Подтвердить'
    },
    inline: {
      create_post: 'Создать пост',
      result_title: 'Нажмите сюда',
      result_description: 'Пост будет отправлен сюда от вашего имени'
    },
    menu: {
      create_post: '📝 Создать пост',
      about_us: '📖 О нас',
      sponsors: '✨ Спонсоры'
    },
    sections: {
      main: {
        content: '<b>Добро пожаловать в @InlineMemoBot!</b>\n\nПожалуйста, выберите кнопку из меню или перешлите любое сообщение, чтобы начать создание поста.',
        placeholder: 'Выберите кнопку из меню...'
      },
      sponsors: {
        content: '<b>Список наших спонсоров:</b>',
        list: sponsors
      },
      about: {
        content: '<b>@InlineMemoBot</b> — помогает создавать посты, чтобы потом отправлять их в любой чат, не создавая их заново. Бот поддерживает текст, фото, видео, аудио, голос, GIF и документы. Просто введите <code>@InlineMemoBot</code> и ID поста в любом чате, чтобы отправить созданный пост в чат от вашего имени.\n\nСвяжитесь со мной с предложениями и отзывами: @Developer616'
      },
      create_post: {
        content: '<b>Отправьте контент вашего поста.</b>\n\n<i>Это может быть текст, фото, аудио, видео, документ, гифка или голосовое сообщение. Все остальные типы постов не принимаются.</i>\n\nДобавьте нужные заголовки перед отправкой поста. Форматированные тексты/заголовки и HTML теги поддерживаются.',
        placeholder: 'Отправьте контент...'
      },
      enhance_post: {
        content: '<b>⬆ Это превью вашего поста.</b>\n\nПожалуйста, кастомизируйте и потом подтвердите создание поста.\n\nКроме того, вы можете добавлять кнопки (ссылки) прямо здесь отправляя одну или несколько кнопок в формате [Текст + Ссылка]. Чтобы добавлять несколько кнопок в один ряд, напишите ссылки в одной строке. Если хотите добавлять кнопки на несколько рядов, напишите их с новой строкой.\n\nPS: Нажмите на добавленные кнопки, чтобы удалить их с поста.',
        placeholder: 'Редактируйте или подтвердите...'
      },
      confirm_post: {
        content: '<b>⬆ Ваш пост создан!</b>\n\nИспользуйте код поста, чтобы отправить его в любой чат.'
      }
    }
  }
}

export type TranslationKey = keyof typeof translation
export type Translation = typeof translation[TranslationKey]
export default translation
