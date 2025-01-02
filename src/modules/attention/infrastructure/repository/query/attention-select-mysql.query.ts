import { Repository, SelectQueryBuilder } from 'typeorm';
import { AttentionMysqlSchema } from '../../schema/attention-mysql.schema';
import { AttentionListParams } from 'src/modules/attention/domain/attention.params';
import { officeEntityName } from 'src/modules/office/domain/office.constans';

export class AttentionSelectMysqlQuery {
  constructor(private repository: Repository<AttentionMysqlSchema>) {}

  public query(params: AttentionListParams) {
    const queryBuilder = this.repository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.medicalConsultation', 'm')
      .innerJoinAndSelect('m.patient', 'p')
      .innerJoinAndSelect('m.service', 's')
      .innerJoinAndSelect('m.worker', 'w')
      .innerJoinAndSelect('p.insuredType', 'i')
      .orderBy('createdAt', 'DESC');
    // filters
    if (params.id) {
      queryBuilder.andWhere(`a.id = '${params.id}'`);
    }

    if (typeof params.state != 'undefined') {
      queryBuilder.andWhere(`a.state = ${params.state}`);
    }

    if (params.workerId) {
      queryBuilder.andWhere(`m.workerId = '${params.workerId}'`);
    }

    if (params.serviceId) {
      queryBuilder.andWhere(`m.serviceId = ${params.serviceId}`);
    }

    if (!!params.hasOffice) {
      this.hasOffice(queryBuilder);
    }

    // response
    return queryBuilder;
  }

  public hasOffice(queryBuilder: SelectQueryBuilder<AttentionMysqlSchema>) {
    queryBuilder.andWhere(
      `EXISTS (SELECT * FROM ${officeEntityName} WHERE attentionId = a.id)`,
    );
  }
}
