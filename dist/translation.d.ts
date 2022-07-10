declare const translation: {
    en: {
        errors: {
            invalid_tags: string;
        };
        buttons: {
            go_back: string;
            remove_caption: string;
            disable_preview: string;
            enable_preview: string;
            add_buttons: string;
            confirm_post: string;
        };
        inline: {
            create_post: string;
            result_title: string;
        };
        menu: {
            create_post: string;
            about_us: string;
            sponsors: string;
        };
        sections: {
            main: {
                content: string;
                placeholder: string;
            };
            sponsors: {
                content: string;
                list: {
                    name: string;
                    link: string;
                }[];
            };
            about: {
                content: string;
            };
            create_post: {
                content: string;
                placeholder: string;
            };
            enhance_post: {
                content: string;
                placeholder: string;
            };
            confirm_post: {
                content: string;
            };
        };
    };
};
export declare type TranslationKey = keyof typeof translation;
export declare type Translation = typeof translation[TranslationKey];
export default translation;
