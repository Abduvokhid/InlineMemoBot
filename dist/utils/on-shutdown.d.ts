import { Bot } from 'grammy';
import { MyContext } from '../types';
declare function onShutdown(bot: Bot<MyContext>): Promise<void>;
export default onShutdown;
