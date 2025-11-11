
export type UserRole = 'Admin' | 'Supervisor' | 'Cutter' | 'Machine' | 'Packing';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
};

export type OrderStatus =
  | 'Cutting'
  | 'Machine'
  | 'Ready for Packing'
  | 'Packed'
  | 'Ready to Deliver';

export const orderStatusFlow: OrderStatus[] = [
  'Cutting',
  'Machine',
  'Ready for Packing',
  'Packed',
  'Ready to Deliver',
];

export type Order = {
  id: string;
  fabricType: string;
  fabricQuality: string;
  quantity: number;
  assignedStaffId: string;
  status: OrderStatus;
  startDate: Date;
  completionDate?: Date;
  deliveryDate?: Date;
};

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@sirahadn.com',
    role: 'Admin',
    avatar: 'https://picsum.photos/seed/1/100/100',
  },
  {
    id: '2',
    name: 'Supervisor Sam',
    email: 'supervisor@sirahadn.com',
    role: 'Supervisor',
    avatar: 'https://picsum.photos/seed/2/100/100',
  },
  {
    id: '4',
    name: 'Cutter Carl',
    email: 'carl@sirahadn.com',
    role: 'Cutter',
    avatar: 'https://picsum.photos/seed/4/100/100',
  },
  {
    id: '5',
    name: 'Machine Operator Sarah',
    email: 'sarah@sirahadn.com',
    role: 'Machine',
    avatar: 'https://picsum.photos/seed/5/100/100',
  },
  {
    id: '6',
    name: 'Packer Pete',
    email: 'pete@sirahadn.com',
    role: 'Packing',
    avatar: 'https://picsum.photos/seed/6/100/100',
  },
];

export let fabricQualities: string[] = ['40x40', '40x60', '60x60'];

export const addFabricQuality = (quality: string) => {
  if (!fabricQualities.includes(quality)) {
    fabricQualities.push(quality);
  }
}

export const orders: Order[] = [
  {
    id: 'SF-1001',
    fabricType: 'Cotton',
    fabricQuality: '40x60',
    quantity: 1200,
    assignedStaffId: '4',
    status: 'Cutting',
    startDate: new Date('2024-07-20T09:00:00Z'),
  },
  {
    id: 'SF-1002',
    fabricType: 'Linen',
    fabricQuality: '60x60',
    quantity: 500,
    assignedStaffId: '5',
    status: 'Machine',
    startDate: new Date('2024-07-19T11:30:00Z'),
  },
  {
    id: 'SF-1003',
    fabricType: 'Silk',
    fabricQuality: '40x40',
    quantity: 800,
    assignedStaffId: '6',
    status: 'Ready for Packing',
    startDate: new Date('2024-07-18T14:00:00Z'),
    completionDate: new Date('2024-07-21T10:00:00Z'),
  },
  {
    id: 'SF-1004',
    fabricType: 'Cotton',
    fabricQuality: '40x40',
    quantity: 2500,
    assignedStaffId: '6',
    status: 'Packed',
    startDate: new Date('2024-07-17T08:00:00Z'),
    completionDate: new Date('2024-07-20T17:00:00Z'),
  },
  {
    id: 'SF-1005',
    fabricType: 'Polyester',
    fabricQuality: '40x60',
    quantity: 750,
    assignedStaffId: '4',
    status: 'Ready to Deliver',
    startDate: new Date('2024-07-15T10:00:00Z'),
    completionDate: new Date('2024-07-18T12:00:00Z'),
    deliveryDate: new Date('2024-07-19T09:00:00Z'),
  },
  {
    id: 'SF-1006',
    fabricType: 'Cotton',
    fabricQuality: '60x60',
    quantity: 1500,
    assignedStaffId: '5',
    status: 'Machine',
    startDate: new Date('2024-07-21T09:30:00Z'),
  },
];

export const getStaffNameById = (id: string) => {
  const user = users.find((u) => u.id === id);
  return user ? user.name : 'Unassigned';
};
