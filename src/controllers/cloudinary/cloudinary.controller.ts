import {Body, Controller, Post} from '@nestjs/common';
import {CloudinaryService} from '../../services/cloudinary/cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  getCloudinaryUrl(@Body() dataString: any) {
    const url = this.cloudinaryService.upload(dataString.data);
    console.log('controller', url);
    return url;
  }
}
