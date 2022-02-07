import {
  ConflictException,
  NotFoundException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Review} from '../../entities/review.entity';
import {Repository} from 'typeorm';
import {VeggieService} from '../../services/user/veggie.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private veggieService: VeggieService,
  ) {}

  async findOneByCondition(condition: any): Promise<Review> {
    try {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.products', 'product')
        .leftJoinAndSelect('review.shopping', 'shop')
        .leftJoinAndSelect('review.eating', 'eat')
        .leftJoinAndSelect('review.user', 'veggie')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Fav doesn't exist");
    }
  }

  async createOne(
    rating: number,
    userPic: string,
    text: string,
    username: string,
  ): Promise<Review> {
    try {
      const user = await this.veggieService.findOneByCondition({
        username: username,
      });
      const newReview = await this.reviewRepository.create({
        text: text,
        userPic: userPic,
        rating: rating,
        user: user,
      });
      return this.reviewRepository.save(newReview);
    } catch (error) {
      throw new UnprocessableEntityException('Request data not processable');
    }
  }

  async updateOne(userId, itemId): Promise<Review> {
    return new Review();
  }

  async deleteOneByCondition(condition: any): Promise<Review> {
    try {
      const review = await this.findOneByCondition(condition);
      return await this.reviewRepository.remove(review);
    } catch (error) {
      throw new NotFoundException(error, "Couldn't delete, entry not found.");
    }
  }

  // ONLY FOR DEVELOPMENT
  async deleteAll(): Promise<void> {
    await this.reviewRepository
      .createQueryBuilder()
      .delete()
      .from(Review)
      .execute();
  }
}
