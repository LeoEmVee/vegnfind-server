import {Body, Controller, Post} from '@nestjs/common';
import {CloudinaryService} from '../../services/cloudinary/cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  getCloudinaryUrl(@Body() dataString: string) {
    return this.cloudinaryService.upload(dataString);
  }
}
