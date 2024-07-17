import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from './product.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {Product, ProductDto} from "./product.entity";
import {DeleteResult, InsertResult, UpdateResult} from "typeorm";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import * as csv from "csvtojson";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File): Promise<Product[]> {
        const data: ProductDto[] = await csv()
            .fromString(file.buffer.toString())
            .then(function (data) {
                return data
            })

        for (const item of data) {
            await this.productService.create(item);
        }

        return this.productService.getAll();
    }


    @Post('')
    async create(@Body() body: ProductDto): Promise<Product[]> {
        const created =  await this.productService.create(body);
        return this.productService.getAll();
    }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productService.getAll();
    }

    @Put(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: ProductDto): Promise<Product[]> {
        const updated = await this.productService.update(id, body);
        return this.productService.getAll();
    }

    @Delete(':id')
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product[]> {
        const deleted = await this.productService.delete(id);
        return this.productService.getAll();
    }
}
