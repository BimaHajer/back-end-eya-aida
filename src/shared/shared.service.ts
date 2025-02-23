/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
const cloudinary = require('cloudinary').v2

@Injectable()
export class SharedService {


    async uploadImgCloudinary(createImage: any){
        if (createImage.path) {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            })
            return  new Promise(async (resolve, reject) => {
                await cloudinary.uploader.upload(createImage.path, {eager: [{ fetch_format: 'auto', quality:'auto'}] , folder: createImage.folder,  public_id: createImage.customName}, async function (error: any, result: any) {
                 if(error) return reject(error);
                resolve({ path: `${result.eager[0].url}`});
               })
           })
            .catch(err => console.error(err))
        }
    }
    
}


export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
},
);


