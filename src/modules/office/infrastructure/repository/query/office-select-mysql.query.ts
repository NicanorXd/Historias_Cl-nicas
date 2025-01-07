import { Repository } from 'typeorm';
import { OfficeMysqlSchema } from '../../schema/office-mysql.schema';
import { OfficeFindParams } from 'src/modules/office/domain/office.params';

export class OfficeSelectMysqlQuery {
  constructor(private repository: Repository<OfficeMysqlSchema>) {}

  public query(params: OfficeFindParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('o')
      .innerJoinAndSelect('o.attention', 'att')
      .innerJoinAndSelect('att.medicalConsultation', 'm')
      .innerJoinAndSelect('m.patient', 'p')
      .innerJoinAndSelect('m.service', 's')
      .innerJoinAndSelect('m.worker', 'w')
      .innerJoinAndSelect('w.profession', 'pro')
      .innerJoinAndSelect('p.insuredType', 'i')
      .leftJoinAndSelect('o.anamnesis', 'a')
      .leftJoinAndSelect('o.diagnosis', 'd')
      .leftJoinAndSelect('d.diagnosis', 'od')
      .leftJoinAndSelect('o.tratamientos', 't')
      .orderBy('o.datetime', 'DESC');
    // filters
    if (params.documentNumber) {
      queryBuilder.andWhere(`p.documentNumber LIKE '${params.documentNumber}'`);
    }

    if (params.historyNumber) {
      queryBuilder.andWhere(`p.historyNumber LIKE '${params.historyNumber}'`);
    }

    if (params.workerId) {
      queryBuilder.andWhere(`m.workerId = '${params.workerId}'`);
    }

    if (params.patientId) {
      queryBuilder.andWhere(`m.patientId = '${params.patientId}'`);
    }

    if (params.id) {
      queryBuilder.andWhere(`o.id = ${params.id}`);
    }
    // response
    return queryBuilder;
  }
}
