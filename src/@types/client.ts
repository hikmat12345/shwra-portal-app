

export type Client = {
    clientId: string,
    firstName: string;
    lastName: string;
    requestsCount: number;
    newRequestsCount: number;

    isApproved: boolean;
    phone: string|null;
    address: string|null;
    company: string|null;
    isCompleted: boolean;
    status: string;
}

export type IClientList = {
    count: number;
    clients: Client[],
    page: number;
    size: number;
}

export type ClientState = {
    isLoading: boolean;
    error: boolean;
    clientList: IClientList;
    
    statusList: {
        id: number;
        name: string;
    }[];

    clientRequestList: {
        requestId: string;
        subject: string;
        details: string;
        status: string;
        type: null|string,
        standard: null|string
    }[];

    client: null| Client;

    isOpenModal: boolean,
    clientRegister: ''
};