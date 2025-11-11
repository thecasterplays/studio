export type UserRole = 'Admin' | 'Supervisor' | 'Staff';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
};

export type OrderStatus =
  | 'Cutting'
  | 'Stitching'
  | 'Ready for Packing'
  | 'Packed'
  | 'Ready to Deliver';

export const orderStatusFlow: OrderStatus[] = [
  'Cutting',
  'Stitching',
  'Ready for Packing',
  'Packed',
  'Ready to Deliver',
];

export type Order = {
  id: string;
  fabricType: string;
  fabricQuality: 'Standard' | 'Premium' | 'Deluxe';
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
    email: 'admin@stitchflow.com',
    role: 'Admin',
    avatar: 'https://picsum.photos/seed/1/100/100',
  },
  {
    id: '2',
    name: 'Supervisor Sam',
    email: 'supervisor@stitchflow.com',
    role: 'Supervisor',
    avatar: 'https://picsum.photos/seed/2/100/100',
  },
  {
    id: '3',
    name: 'Staff Steve',
    email: 'staff@stitchflow.com',
    role: 'Staff',
    avatar: 'https://picsum.photos/seed/3/100/100',
  },
    {
    id: '4',
    name: 'Cutter Carl',
    email: 'carl@stitchflow.com',
    role: 'Staff',
    avatar: 'https://picsum.photos/seed/4/100/100',
  },
    {
    id: '5',
    name: 'Stitcher Sarah',
    email: 'sarah@stitchflow.com',
    role: 'Staff',
    avatar: 'https://picsum.photos/seed/5/100/100',
  },
];

export const orders: Order[] = [
  {
    id: 'SF-1001',
    fabricType: 'Cotton',
    fabricQuality: 'Premium',
    quantity: 1200,
    assignedStaffId: '4',
    status: 'Cutting',
    startDate: new Date('2024-07-20T09:00:00Z'),
  },
  {
    id: 'SF-1002',
    fabricType: 'Linen',
    fabricQuality: 'Deluxe',
    quantity: 500,
    assignedStaffId: '5',
    status: 'Stitching',
    startDate: new Date('2024-07-19T11:30:00Z'),
  },
  {
    id: 'SF-1003',
    fabricType: 'Silk',
    fabricQuality: 'Standard',
    quantity: 800,
    assignedStaffId: '3',
    status: 'Ready for Packing',
    startDate: new Date('2024-07-18T14:00:00Z'),
    completionDate: new Date('2024-07-21T10:00:00Z')
  },
  {
    id: 'SF-1004',
    fabricType: 'Cotton',
    fabricQuality: 'Standard',
    quantity: 2500,
    assignedStaffId: '3',
    status: 'Packed',
    startDate: new Date('2024-07-17T08:00:00Z'),
    completionDate: new Date('2024-07-20T17:00:00Z')
  },
  {
    id: 'SF-1005',
    fabricType: 'Polyester',
    fabricQuality: 'Premium',
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
    fabricQuality: 'Deluxe',
    quantity: 1500,
    assignedStaffId: '5',
    status: 'Stitching',
    startDate: new Date('2024-07-21T09:30:00Z'),
  },
];

export const getStaffNameById = (id: string) => {
  const user = users.find(u => u.id === id);
  return user ? user.name : 'Unassigned';
};
