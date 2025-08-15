import { GetImageDto } from "../dtos/images/product.dto";
import {
  CreateProductDto,
  UpdateProductDto,
} from "../dtos/products/product.dto";
import prisma from "../prisma";

export class ProductService {
  static async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  static async getByIdAndClient(id: string, clientId: string) {
    return prisma.product.findFirst({
      where: { id, clientId },
    });
  }

  static async createProduct(product: CreateProductDto, clientId: string) {
    try {
      return prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          clientId,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  static async updateProduct(
    id: string,
    product: UpdateProductDto,
    clientId: string
  ) {
    try {
      return prisma.product.update({
        where: { id, clientId },
        data: {
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          clientId,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  static async deleteProduct(id: string, clientId: string) {
    try {
      return prisma.product.delete({
        where: { id, clientId },
      });
    } catch (e) {
      throw e;
    }
  }

  static async changeActiveProduct(
    id: string,
    isActive: boolean,
    clientId: string
  ) {
    try {
      return prisma.product.update({
        where: { id, clientId },
        data: {
          isActive,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
export class ImageService {
  static async getById(id: string) {
    return prisma.image.findUnique({
      where: { id },
    });
  }

  static async getByProduct(productId: string) {
    return prisma.image.findMany({
      where: { productId },
    });
  }

  static async createImage(image: any) {
    try {
      return prisma.image.create({
        data: {
          assetId: image.assetId,
          name: image.name,
          productId: image.productId,
          path: image.path,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
