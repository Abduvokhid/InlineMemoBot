import { Composer } from 'grammy';
import { MyContext } from '../types';
declare function setup(bot: Composer<MyContext>): Promise<void>;
declare const _default: {
    setup: typeof setup;
};
export default _default;
