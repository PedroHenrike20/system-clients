export interface ReqClientListDTO {
    page: number,
    limit: number,
}

export interface ResClientDTO {
    clients: ClientDTO[],
    totalPages: number;
    currentPage: number;
}

export interface ClientDTO {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
    createdAt: Date;
    updatedAt: Date;
}