"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInlineKeyboard = exports.generateKeyboard = exports.isValidUrl = void 0;
const grammy_1 = require("grammy");
function isValidUrl(urlString) {
    if (urlString.startsWith('tg://user?id='))
        return true;
    const urlPattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return urlPattern.test(urlString);
}
exports.isValidUrl = isValidUrl;
function generateKeyboard(buttons, token) {
    const url = `${process.env.BUTTON_DOMAIN}${process.env.BUTTON_PATH}`;
    const keyboard = new grammy_1.InlineKeyboard();
    buttons.forEach((buttonsRow, index) => {
        buttonsRow.forEach((button, index2) => keyboard.text(button.name, `remove_button:${index}-${index2}`));
        keyboard.webApp('+', `${url}?row=${index}&token=${token}`).row();
    });
    keyboard.webApp('+', `${url}?token=${token}`).row();
    return keyboard;
}
exports.generateKeyboard = generateKeyboard;
function generateInlineKeyboard(buttons, post_id) {
    const keyboard = new grammy_1.InlineKeyboard();
    buttons.forEach((buttonsRow) => {
        buttonsRow.forEach((button) => {
            switch (button.type) {
                case 'link':
                    keyboard.url(button.name, button.link);
                    break;
                case 'message_box':
                    keyboard.text(button.name, `r:${button.message}`);
                    break;
                case 'share':
                    keyboard.url(button.name, `https://t.me/share/url?url=${encodeURIComponent(button.message)}`);
                    break;
                case 'share_post':
                    keyboard.switchInline(button.name, post_id);
                    break;
            }
        });
        keyboard.row();
    });
    return keyboard;
}
exports.generateInlineKeyboard = generateInlineKeyboard;
//# sourceMappingURL=misc.js.map