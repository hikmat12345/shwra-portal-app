export type Attachment = {
  id: string;
  name: string;
  url: string;
};

export type Appointment = {
  id: string;
  date: string;
  category: string;
  cost: number;
  notes: string;
  attachments: Attachment[];
};

export type AppointmentDetails = {
  appointmentId: string;
  statusId: number;
  statusName: string;
  appointmentDate: string;
  appointmentTime?: string;
  createdDate: string;
  categoryId: number;
  categoryName: string;
  customerName: string | null;
  customerNumber: string;
  customerGender?: number;
  customerImage?: string;
  lawyerName: string | null;
  lawyerNumber: string;
  lawyerImage?: string;
  lawyerGender?: number;
  paymentAmount?: number;
  paymentStatus?: string;
  details?: string;
  paymentDiscount?: number;
  attachedFiles: string[];
  totalAmount?: number;
  isCallRequested?: boolean
};

export type AdminAppointment = {
  totalCount: number;
  page: number;
  size: number;
  appointment: AppointmentDetails[];
};
export type LawyerAppointment = {
  totalCount: number;
  page: number;
  size: number;
  appointments: AppointmentDetails[];
};

export type AppointmentStatus = {
  id: number;
  name: string;
}

export type AppointmentState = {
  isLoading: boolean;
  error: boolean;
  commingAppointmentList: Appointment[];
  lastAppointmentList: Appointment[];
  adminAppointmentsList: AdminAppointment;
  appointmentDetails: AppointmentDetails;
  appointmentStatus: AppointmentStatus[];
  lawyerAppointments: LawyerAppointment;
  appointmentCallStatus: any;
  changeAppointmentLawyerStatus:any;
};
