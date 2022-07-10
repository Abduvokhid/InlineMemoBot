import { MyContext } from '../types';
import { Bot } from 'grammy';
declare function setup(bot: Bot<MyContext>): Promise<void>;
declare const _default: {
    setup: typeof setup;
};
export default _default;
