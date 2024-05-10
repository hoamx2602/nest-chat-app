import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadOptions } from './upload-options.interface';

@Injectable()
export class S3Service {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = configService.get('S3_ACCESS_KEY');
    const secretAccessKey = configService.get('S3_SECRET_KEY');

    const clientConfig: S3ClientConfig = {};

    if (accessKeyId && secretAccessKey) {
      clientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
      };
      clientConfig.region = configService.get('S3_REGION');
    }

    this.client = new S3Client(clientConfig);
  }

  async upload({ key, file }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: key,
        Body: file,
      }),
    );
  }

  getObjectUrl(key: string) {
    return `https://${this.configService.get('S3_BUCKET')}.s3.amazonaws.com/${key}`;
  }
}
