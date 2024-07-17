import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from "./product/product.entity";
import {ProductModule} from "./product/product.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'zapp-test',
            entities: [Product],
            synchronize: true,
        }),
        ProductModule
    ]
})
export class AppModule {}
