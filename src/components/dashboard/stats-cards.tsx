import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, CircleDashed } from 'lucide-react';
import { orders } from '@/lib/data';

export function StatsCards() {
  const totalOrders = orders.length;
  const inProgressOrders = orders.filter(
    (order) => order.status !== 'Ready to Deliver' && order.status !== 'Packed'
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === 'Ready to Deliver' || order.status === 'Packed'
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">All-time orders</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <CircleDashed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressOrders}</div>
          <p className="text-xs text-muted-foreground">Orders currently in production</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedOrders}</div>
          <p className="text-xs text-muted-foreground">Packed or ready to deliver</p>
        </CardContent>
      </Card>
    </div>
  );
}
