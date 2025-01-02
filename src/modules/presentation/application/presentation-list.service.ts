import { PresentationRepository } from '../domain/presentation.repository';

export class PresentationListService {
  constructor(private presentationRepository: PresentationRepository) {}

  async execute() {
    return this.presentationRepository.listPresentations();
  }
}
