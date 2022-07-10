import { Composer } from 'grammy';
import { MyPrivateContext } from '../types';
declare function setup(bot: Composer<MyPrivateContext>): Promise<void>;
declare const _default: {
    setup: typeof setup;
};
export default _default;
