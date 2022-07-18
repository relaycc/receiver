import type { NextApiRequest, NextApiResponse } from 'next';
declare type Data = {
    name: string;
};
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void;
export {};
