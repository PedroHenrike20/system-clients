import { ClientDTO } from "../app-home/models/client.model";

export const MOCK_CLIENTS = [
    {
        id: 1,
        name: 'Cliente 1',
        companyValuation: 1000000,
        salary: 1000,
        createdAt: new Date('2025-03-01'),
        updatedAt: new Date('2025-01-01'),
    },
    {
        id: 2,
        name: 'Cliente 2',
        companyValuation: 2000000,
        salary: 2000,
        createdAt: new Date('2025-03-01'),
        updatedAt: new Date('2025-02-01'),
    },
    {
        id: 3,
        name: 'Cliente 3',
        companyValuation: 3000000,
        salary: 3000,
        createdAt: new Date('2025-02-01'),
        updatedAt: new Date('2025-02-01'),
    },
    {
        id: 4,
        name: 'Cliente 4',
        companyValuation: 4000000,
        salary: 4000,
        createdAt: new Date('2025-04-01'),
        updatedAt: new Date('2025-04-01'),
    },
    {
        id: 5,
        name: 'Cliente 5',
        companyValuation: 5000000,
        salary: 5000,
        createdAt: new Date('2025-04-01'),
        updatedAt: new Date('2025-04-01'),
    },
    {
        id: 6,
        name: 'Cliente 6',
        companyValuation: 5000000,
        createdAt: new Date('2025-03-01'),
        updatedAt: new Date('2025-03-01'),
        salary: 5000,
    },
] as ClientDTO[];