import { MyPrivateContext } from '../types';
import { NextFunction } from 'grammy';
declare function userSetup(ctx: MyPrivateContext, next: NextFunction): Promise<void>;
export default userSetup;
