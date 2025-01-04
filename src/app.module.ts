import { Module } from '@nestjs/common';
import { ConfigModule as EnvModule } from '@nestjs/config';
import { QueueModule } from './shared/queue/queue.module';
import { PersistenceModule } from './shared/persistence/persistence.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { RoleModule } from './modules/role/role.module';
import { DiagnosisModule } from './modules/diagnosis/diagnosis.module';
import { WorkerModule } from './modules/worker/worker.module';
import { PatientModule } from './modules/patient/patient.module';
import { ServiceModule } from './modules/service/service.module';
import { InsuredTypeModule } from './modules/insured-type/insured-type.module';
import { ProfessionModule } from './modules/profession/profession.module';
import { MedicalConsultationModule } from './modules/medical-consultation/medical-consultation.module';
import { AttentionModule } from './modules/attention/attention.module';
import { PresentationModule } from './modules/presentation/presentation.module';
import { AdministrationModule } from './modules/administration/administration.module';
import { OfficeModule } from './modules/office/office.module';
import { DiagnosisDetailModule } from './modules/diagnosis-detail/diagnosis-detail.module';
import { TratamientoModule } from './modules/tratamiento/tratamiento.module';
import { AnamnesisModule } from './modules/anamnesis/anamnesis.module';
import { ReportsModule } from './modules/reports/report.module';

@Module({
  imports: [
    QueueModule,
    PersistenceModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    EnvModule.forRoot({ envFilePath: ['.env'] }),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        wach: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UserModule,
    RoleModule,
    DiagnosisModule,
    WorkerModule,
    PatientModule,
    ServiceModule,
    InsuredTypeModule,
    ProfessionModule,
    MedicalConsultationModule,
    AttentionModule,
    AdministrationModule,
    PresentationModule,
    OfficeModule,
    AnamnesisModule,
    DiagnosisDetailModule,
    TratamientoModule,
    ReportsModule,
  ],
})
export class AppModule {}
