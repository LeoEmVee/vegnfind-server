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
import {Eat} from 'src/entities/eat.entity';
import {Shop} from 'src/entities/shop.entity';
import {Product} from 'src/entities/product.entity';
import {Veggie} from 'src/entities/veggie.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private veggieService: VeggieService,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Eat)
    private eatRepository: Repository<Eat>,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOneByCondition(condition: any): Promise<Review> {
    try {
      return await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.product', 'product')
        .leftJoinAndSelect('review.shop', 'shop')
        .leftJoinAndSelect('review.eat', 'eat')
        // .leftJoinAndMapOne(
        //   'review.user',
        //   Veggie,
        //   'veggie',
        //   'review.user_id=veggie.id',
        // )
        .leftJoinAndSelect('review.user', 'veggie')
        .where(condition)
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException(error, "This Review doesn't exist");
    }
  }

  async createOne(
    rating: number,
    userPic: string,
    text: string,
    username: string,
    itemId: string,
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

      // look for the item in tables and include it in the correct array
      const isEat = await this.eatRepository.findOne(itemId);
      const isShop = await this.shopRepository.findOne(itemId);
      const isProduct = await this.productRepository.findOne(itemId);

      if (isEat) newReview.eat = isEat;
      if (isShop) newReview.shop = isShop;
      if (isProduct) newReview.product = isProduct;

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
