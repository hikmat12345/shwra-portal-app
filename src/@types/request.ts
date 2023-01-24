// ----------------------------------------------------------------------

export type IRequestStatus = 'WAITING_ASSING' | 'ACTICE' | 'WAITING_REPLY' | 'COMPLETE';

export enum RequestStatus {
  WAITING_ASSING = 'بإنتظار تعيين محامي ',
  ACTICE = 'نشطة',
  WAITING_REPLY = 'بإنتظار رد العميل',
  COMPLETE = 'مكتملة'
}

/**
 * @SERVICE_TYPE_OPTION
 */
export enum ServiceType {
  CONTRACT = 'عقد',
  CONSULT = 'استشارة',
  CASE = 'قضية'
}

/**
 * @SERVICE_STANDARD_OPTION
 */
export enum ServiceStandard {
  NORMAL = 'عادي',
  URGENT = 'مستعجل',
  VERY_URGENT = 'مستعجل جدا'
}

export type RequestManager = {
  requestId: string;
  subject: string;
  details: string;
  status: string;
  type: null | string;
  standard: null | string;
  client: Request['client'];
  createdBy: string;
  createdDate: string;
};

export type RequestState = {
  isLoading: boolean;
  error: boolean;
  isAssigning: boolean;

  requestList: RequestManager[];
  //request: null| Request;
  request: any;
  requestStandardList: {
    requestStandardId: number;
    name: string;
    arabicName: string;
    arabicDescription: string;
  }[];

  requestTypeList: {
    requestTypeId: number;
    arabicName: string;
  }[];
  /*
  requestSubTypes: {
      requestSubTypeId: number,
      name: string;
  }[];
*/
  requestActionList: {
    id: number;
    name: string;
  }[];

  requestStatus: any;
};

export type RequestUser = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type ReplyComment = {
  id: string;
  userId: string;
  message: string;
  postedAt: Date;
  tagUser?: string;
};

export type RequestComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date | string | number;
  //replyTicket: ReplyComment[];
};

export type Request = {
  requestId: string;
  subject: string;
  details: string;
  status: string;
  type: string;
  subType?: string;
  standard: string;
  attachedFilesUrls: string[];
  client: {
    clientId: string;
    firstName: string;
    lastName: string;
    company: string;
  };
  lawyer: {
    lawyerId: string;
    firstName: string;
    lastName: string;
  };
  comments: [
    {
      commentId: string;
      body: string;
      createdBy: Date | string | number;
      createdDate: Date | string | number;
      lastModifiedBy: Date | string | number;
      lastModifiedDate: Date | string | number;
      attachedFilesUrls: string[];
      user: any;
    }
  ];
};
