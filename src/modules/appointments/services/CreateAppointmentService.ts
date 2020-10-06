import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  date: Date;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentdate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentdate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentdate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
