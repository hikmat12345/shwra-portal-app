export type Lawyer = {
  lawyerId: any;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  type: any;
  categories: any;
  files: any;
  password: any;
  phone: string;
  status: string;
  statusId: number;
  createdAt?: any;
  createdDate?: any;
  lastModifiedDate: any;
  educationalCertificates?:string[]
};
export type ILawyerList = {
  count: number;
  lawyersDtos: Lawyer[];
  page: number;
  size: number;
};
export type LawyerState = {
  isLoading: boolean;
  statusLoading?: boolean;
  error: boolean;
  lawyerList: ILawyerList;
  lawyer: null | Lawyer;
  lawyerRequestList: {
    requestId: string;
    subject: string;
    details: string;
    status: string;
    type: null | string;
    standard: null | string;
  }[];
  isOpenModal: boolean;
  isLawyerDeleted: boolean;
  isLawyerCreated: boolean;
  lawyerStatus: { success?: boolean; message?: string };
};

export type LawyerStatus = 'Approved' | 'Pending' | 'Blocked';

export type lawyerAssignment = {
  lawyerId: string;
  lawyerName: string;
  lawyerStatus: LawyerStatus;
  lawyerStatusId: number;
  lastAppointment: string;
  totalAppointments: number;
  income: number;
};
