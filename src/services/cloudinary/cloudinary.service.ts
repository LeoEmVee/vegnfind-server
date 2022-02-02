import {Injectable} from '@nestjs/common';
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
    return await cloudinary.uploader.upload(dataString, {
      upload_preset: 'ml_default',
    });
  }
}
