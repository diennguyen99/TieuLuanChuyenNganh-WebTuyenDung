import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { PackagesModule } from './packages/packages.module';
import { Package } from './packages/entities/package.entity';
import { Payment } from './payments/entities/payment.entity';
import { City } from './cities/entities/city.entity';
import { CompaniesModule } from './companies/companies.module';
import { ResumesModule } from './resumes/resumes.module';
import { Company } from './companies/entities/company.entity';
import { Resume } from './resumes/entities/resume.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Verification } from './users/entities/verification.entity';
import { MailgunModule } from './mailgun/mailgun.module';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';
import { JobType } from './jobs/entities/job-type.entity';
import { JobSector } from './jobs/entities/job-sector.entity';
import { ResumeType } from './resumes/entities/resume-type.entity';
import { ResumeOpen } from './resumes/entities/resume-open.entity';
import { CitiesModule } from './cities/cities.module';
import { SearchModule } from './search/search.module';
import { SearchCampaign } from './search/entities/ search-campaign.entity';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';
import { JobPosition } from './jobs/entities/job-position.entity';
import { UploadCvModule } from './upload-cv/upload-cv.module';
import { AppliedJob } from './upload-cv/entities/applied-job.entity';
import { ResumePropertiesModule } from './resume-properties/resume-properties.module';
import { School } from './resume-properties/entities/school.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [
        User,
        Verification,
        Skill,
        Package,
        Payment,
        City,
        Company,
        ResumeType,
        Resume,
        ResumeOpen,
        School,
        JobPosition,
        JobType,
        JobSector,
        Job,
        AppliedJob,
        SearchCampaign,
      ],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
      cors: {
        origin: true,
        credentials: true,
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    CloudinaryModule.forRoot({
      cloudName: process.env.CLOUDINARY_NAME,
      apiKey: process.env.CLOUDINARY_KEY,
      apiSecret: process.env.CLOUDINARY_SECRET,
    }),
    MailgunModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
      domain: process.env.MAILGUN_DOMAIN,
    }),
    AuthModule,
    CommonModule,
    UsersModule,
    PackagesModule,
    CompaniesModule,
    ResumesModule,
    PaymentsModule,
    JobsModule,
    CitiesModule,
    SearchModule,
    SkillsModule,
    UploadCvModule,
    ResumePropertiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
