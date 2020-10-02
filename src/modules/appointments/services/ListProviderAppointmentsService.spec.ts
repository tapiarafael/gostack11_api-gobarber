import 'reflect-metadata';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments of a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 12),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'fakeUser_id1',
      date: new Date(2020, 6, 10, 13),
    });

    const availability = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 10,
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
