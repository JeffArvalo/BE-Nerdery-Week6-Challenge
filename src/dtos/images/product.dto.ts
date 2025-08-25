import { IsUUID, IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, IsInt  } from 'class-validator';

export class GetImageDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export class CreateImageDto {
  @IsUUID()
  @IsOptional()
  readonly id!: string;

  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly productId!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly assetId!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly path!: string;
}