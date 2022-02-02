import {Injectable, UnprocessableEntityException} from '@nestjs/common';
require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async upload(dataString: string) {
    try {
      console.log('service data', dataString);
      const url = await cloudinary.uploader.upload(dataString, {
        upload_preset: 'ml_default',
      });
      console.log('service', url);
      return url;
    } catch (error) {
      throw new UnprocessableEntityException('ESTO NO, EH!?');
    }
  }
}
