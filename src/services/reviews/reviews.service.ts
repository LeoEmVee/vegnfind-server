import {ConflictException, NotFoundException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Review} from '../../entities/review.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
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

  async createOne(review: Review): Promise<Review> {
    const reviewExists = await this.reviewRepository.findOne(review.id);
    if (reviewExists) {
      throw new ConflictException('This review already exists!');
    }
    const newReview = await this.reviewRepository.create({...review});
    return this.reviewRepository.save(newReview);
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
