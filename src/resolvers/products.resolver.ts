import { gql } from "apollo-server-express";
import { ImageService, ProductService } from "../services/products.service";
import { Conflict } from "http-errors";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import {
  CreateProductDto,
  DeleteProductDto,
  UpdateProductDto,
} from "../dtos/products/product.dto";
import { validateDto } from "../utils/validations";
import { GraphQLUpload } from "graphql-upload-ts";
import cloudinary from "cloudinary";
import { CreateImageDto, GetImageDto } from "../dtos/images/product.dto";

type Product = {
  id: String | Number;
  name: String;
  description: String;
  stock: Number;
  price: Number;
  clientId?: String | Number;
  createdAt: String;
  updatedAt: String;
};

// GraphQL typeDefs
export const typeDefs = gql`
  scalar Upload

  type Product {
    id: ID!
    name: String!
    description: String
    stock: Int!
    price: Float!
    clientId: ID!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Image {
    id: ID!
    name: String!
    productId: String!
    assetId: String!
    path: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProductById(id: ID!): Product
    getImageById(id: ID!): Image
    getImagesByProductId(id: ID!): [Image]
  }

  type Mutation {
    createProduct(product: CreateProductInput): Product
    updateProduct(id: ID!, product: UpdateProductInput): Product
    deleteProduct(id: ID!): Product
    enableProduct(id: ID!): Product
    disableProduct(id: ID!): Product
    uploadImage(id: ID!, image: Upload!): String
  }

  input CreateProductInput {
    id: ID
    name: String!
    description: String
    stock: Int!
    price: Float!
    clientId: ID
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  input UpdateProductInput {
    id: ID
    name: String
    description: String
    stock: Int
    price: Float
    clientId: ID
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }
`;

function validateApiKey(context: any) {
  const apiKey = context.apiKey;
  if (!apiKey) {
    throw new Error("Missing or invalid API key");
  }
  return apiKey;
}

// Resolvers
export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    async getProductById(_: any, args: { id: string }, context: any) {
      const apiKey = validateApiKey(context);
      const product = await ProductService.getByIdAndClient(
        args.id,
        apiKey.clientId
      );

      return product;
    },
    async getImagesByProductId(_: any, args: { id: string }, context: any) {
      validateApiKey(context);
      const images = await ImageService.getByProduct(args.id);

      return images;
    },
  },
  Mutation: {
    async createProduct(_: any, args: { product: Product }, context: any) {
      const apiKey = validateApiKey(context);
      const product = await validateDto(CreateProductDto, args.product);
      const productCreated = await ProductService.createProduct(
        product,
        apiKey.clientId
      );
      return productCreated;
    },
    async updateProduct(
      _: any,
      args: { id: string; product: Product },
      context: any
    ) {
      const apiKey = validateApiKey(context);
      const product = await validateDto(UpdateProductDto, args.product);

      return await ProductService.updateProduct(
        args.id,
        product,
        apiKey.clientId
      );
    },
    async deleteProduct(_: any, args: { id: string }, context: any) {
      const apiKey = validateApiKey(context);
      const productDto = await validateDto(DeleteProductDto, args.id);

      const productDeleted = await ProductService.deleteProduct(
        productDto.id,
        apiKey.clientId
      );
      return productDeleted;
    },
    async disableProduct(_: any, args: { id: string }, context: any) {
      const apiKey = validateApiKey(context);
      return await ProductService.changeActiveProduct(
        args.id,
        false,
        apiKey.clientId
      );
    },
    async enableProduct(_: any, args: { id: string }, context: any) {
      const apiKey = validateApiKey(context);
      return await ProductService.changeActiveProduct(
        args.id,
        true,
        apiKey.clientId
      );
    },
    async uploadImage(_: any, args: { id: string; image: any }, context: any) {
      validateApiKey(context);
      const { createReadStream, mimetype } = await args.image;

      if (mimetype !== "image/jpeg" && mimetype !== "image/png")
        throw new Conflict("The file is not an image");

      const uploadedImage = (await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "image", folder: "week-6" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        createReadStream().pipe(stream);
      })) as any;

      const productImage = {
        productId: args.id,
        name: uploadedImage.display_name,
        assetId: uploadedImage.asset_id,
        path: uploadedImage.secure_url,
      };

      const validedImage = await validateDto(CreateImageDto, productImage);

      const imageCreated = await ImageService.createImage(validedImage);

      return imageCreated.path;
    },
  },
};
