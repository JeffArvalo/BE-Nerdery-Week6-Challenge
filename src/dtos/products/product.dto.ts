import { IsUUID, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsInt  } from 'class-validator';

export class GetProductDto {
  @IsUUID()
  readonly id!: string;
}

export class CreateProductDto {
  @IsUUID()
  @IsOptional()
  readonly id!: string;

  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description!: string;

  @IsInt()
  readonly stock!: number

  @IsNumber({maxDecimalPlaces: 2})
  readonly price!: number

  @IsBoolean()
  @IsOptional()
  isActive!: Boolean

  @IsUUID()
  @IsOptional()
  clientId!: string;
}

export class UpdateProductDto {
  @IsUUID()
  @IsOptional()
  readonly id!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description!: string;

  @IsInt()
  @IsOptional()
  readonly stock!: number

  @IsNumber({maxDecimalPlaces: 2})
  @IsOptional()
  readonly price!: number

  @IsBoolean()
  @IsOptional()
  readonly isActive!: Boolean

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  readonly clientId!: string;
}

export class DeleteProductDto {
  @IsUUID()
  readonly id!: string;
}
