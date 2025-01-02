import * as Edge from 'edge.js';
import { ReportEntity } from '../../domain/report.entity';
import { ReportRepository } from '../../domain/report.repository';
import { resolve } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportEdgeRepository implements ReportRepository {
  constructor() {
    this.edge = new Edge.Edge({ cache: false });
    this.edge.mount(resolve(__dirname, '../../../../../src/modules'));
  }

  private edge: Edge.Edge;

  async render<T>(path: string, data: T): Promise<ReportEntity> {
    const content = await this.edge.render(path, data);

    return {
      type: 'text/html',
      buffer: Buffer.from(content),
    };
  }
}
