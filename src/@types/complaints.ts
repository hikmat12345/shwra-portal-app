export type Complaint = {
  webMessageId: string;
  name: string;
  email: string;
  phoneNumber: string;
  detail: string;
  type: string;
  createdDate: string;
  updatedDate?: string;
};
export type ComplaintCRUD = {};

export type ComplaintsState = {
  isLoading: boolean;
  error: boolean;
  complaintsList: { result: { data: Complaint[]; totalCount?: any } };
  complaintDetails: Complaint;
  deleteComplaintStatus:any;
};
