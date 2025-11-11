import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { orders, users, getStaffNameById } from '@/lib/data';

export function RecentOrders() {
  const recentOrders = orders.slice(0, 5);

  const getAvatarForStaff = (staffId: string) => {
    const user = users.find((u) => u.id === staffId);
    return user ? user.avatar : 'https://picsum.photos/seed/placeholder/100/100';
  };

  const getInitialsForStaff = (staffId: string) => {
    const name = getStaffNameById(staffId);
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={getAvatarForStaff(order.assignedStaffId)}
              alt="Avatar"
            />
            <AvatarFallback>
              {getInitialsForStaff(order.assignedStaffId)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.id}</p>
            <p className="text-sm text-muted-foreground">
              Assigned to {getStaffNameById(order.assignedStaffId)}
            </p>
          </div>
          <div className="ml-auto font-medium">+{order.quantity} units</div>
        </div>
      ))}
    </div>
  );
}
