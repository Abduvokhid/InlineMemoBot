import { MyPrivateContext } from '../types';
declare function enhanceStep(ctx: MyPrivateContext): Promise<true | undefined>;
export default enhanceStep;
