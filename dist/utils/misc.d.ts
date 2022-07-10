import { InlineKeyboard } from 'grammy';
import { Button } from '../types';
export declare function isValidUrl(urlString: string): boolean;
export declare function generateKeyboard(buttons: Button[][], token: string): InlineKeyboard;
export declare function generateInlineKeyboard(buttons: Button[][], post_id: string): InlineKeyboard;
