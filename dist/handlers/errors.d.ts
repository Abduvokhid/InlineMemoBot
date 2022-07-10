import { Bot } from 'grammy';
import { MyContext } from '../types';
declare function setup(bot: Bot<MyContext>): Promise<void>;
declare const _default: {
    setup: typeof setup;
};
export default _default;
