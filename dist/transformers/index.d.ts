import { Bot } from 'grammy';
import { MyApi, MyContext } from '../types';
declare function setup(bot: Bot<MyContext, MyApi>): Promise<void>;
declare const _default: {
    setup: typeof setup;
};
export default _default;
