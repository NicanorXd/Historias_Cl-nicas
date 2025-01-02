import { Repository } from 'typeorm';
import { MedicalConsultationMysqlSchema } from '../../schema/medical-consultation-mysql.schema';
import { MedicalConsultationFindParams } from 'src/modules/medical-consultation/domain/medical-consultation.params';

export class MedicalConsultationSelectMysqlQuery {
  constructor(private repository: Repository<MedicalConsultationMysqlSchema>) {}

  public query(params: MedicalConsultationFindParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('m')
      .innerJoinAndSelect('m.patient', 'p')
      .innerJoinAndSelect('m.service', 's')
      .innerJoinAndSelect('m.worker', 'w')
      .innerJoinAndSelect('p.insuredType', 'i')
      .orderBy('m.date', 'DESC');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`m.id = '${params.id}'`);
    }

    if (params.workerId) {
      queryBuilder.andWhere(`m.workerId = '${params.workerId}'`);
    }

    if (typeof params.state != 'undefined') {
      queryBuilder.andWhere(`m.state = ${params.state}`);
    }
    // response
    return queryBuilder;
  }
}
