import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product, ProductDto} from "./product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  getAll(): Promise<Product[]> {
      return this.productRepository.find();
  }

  create(data: ProductDto) {
      return this.productRepository.insert(data);
  }

  update(id: number, body: ProductDto) {
      return this.productRepository.update(id, body);
  }

  delete(id: number){
    return this.productRepository.delete(id);
  }
}
