import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentdate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentdate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already create.');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentdate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
