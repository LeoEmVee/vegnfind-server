const cloudinary = require('../utils/cloudinary');
import {Injectable} from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async upload(dataString: string) {
    return await cloudinary.uploader.upload(dataString, {
      upload_preset: 'ml_default',
    });
  }
}
