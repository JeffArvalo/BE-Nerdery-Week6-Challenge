import { IsUUID, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsInt  } from 'class-validator';

export class GetProductDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export class CreateProductDto {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description!: string;

  @IsInt()
  @IsNotEmpty()
  stock!: number

  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  price!: number

  @IsBoolean()
  @IsOptional()
  isActive!: Boolean

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  clientId!: string;
}

export class UpdateProductDto {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description!: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  stock!: number

  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  @IsOptional()
  price!: number

  @IsBoolean()
  @IsOptional()
  isActive!: Boolean

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  clientId!: string;
}

export class DeleteProductDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
