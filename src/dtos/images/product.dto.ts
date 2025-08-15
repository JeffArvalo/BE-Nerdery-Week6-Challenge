import { IsUUID, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsInt  } from 'class-validator';

export class GetImageDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export class CreateImageDto {
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
  productId!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  assetId!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  path!: string;
}