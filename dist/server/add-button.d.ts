import { Request, Response } from 'express';
declare function addButton(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export default addButton;
