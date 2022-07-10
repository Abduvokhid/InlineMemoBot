import { MyGeneralContext, MyPrivateContext } from '../types';
declare function isPrivate(ctx: MyGeneralContext): ctx is MyPrivateContext;
export default isPrivate;
