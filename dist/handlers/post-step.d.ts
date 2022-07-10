import { MyPrivateContext } from '../types';
declare function postStep(ctx: MyPrivateContext): Promise<true | void>;
export default postStep;
