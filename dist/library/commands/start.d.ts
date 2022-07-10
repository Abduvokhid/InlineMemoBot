import { MyContext } from '../../types';
declare function start(ctx: MyContext): Promise<void>;
declare function startCustom(ctx: MyContext, text?: string | undefined): Promise<void>;
export { startCustom };
export default start;
