"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sponsors = [{ name: 'Telegram', link: 'https://t.me/telegram' }];
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
            result_title: 'Click here to send'
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
                content: '<b>Coming soon!</b>'
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
};
exports.default = translation;
//# sourceMappingURL=translation.js.map