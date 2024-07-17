import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

@Entity('products')
export class Product {

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @ApiProperty()
    description: string;

    @Column()
    @IsInt()
    @ApiProperty()
    quantity: number;

    @Column()
    @IsString()
    @ApiProperty()
    sku: string;

    @Column()
    @IsString()
    @ApiProperty()
    store: string;
}

export class ProductDto extends OmitType(Product, ['createdAt', 'updatedAt', 'deletedAt', 'id'] as const) {}
