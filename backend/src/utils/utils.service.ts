import { BadRequestException } from '@nestjs/common';

export const imageFilter: any = (req: any, file: { mimetype: string; }, callback: (arg0: any, arg1: boolean) => void): any =>
{
    const validExtension: Array<string> = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (validExtension.includes(file.mimetype))
    {
        callback(null, true);
    } else
    {
        return callback(new BadRequestException(['Only image files are allowed']), false);
    }
};
