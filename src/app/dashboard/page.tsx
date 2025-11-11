
'use client';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { Overview } from '@/components/dashboard/overview';
import { RecentOrders } from '@/components/dashboard/recent-orders';
import { orders, getStaffNameById, orderStatusFlow } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const renderAdminSupervisorDashboard = () => (
    <>
      <div className="space-y-4">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );

  const renderStaffDashboard = () => {
    const assignedOrders = orders.filter(
      (order) => order.assignedStaffId === user.id && order.status !== 'Ready to Deliver'
    );

    const handleUpdateStatus = (orderId: string, currentStatus: string) => {
      // In a real app, this would trigger a Firestore update.
      const currentIndex = orderStatusFlow.findIndex(s => s === currentStatus);
      if (currentIndex < orderStatusFlow.length - 1) {
        const newStatus = orderStatusFlow[currentIndex + 1];
        console.log(`Updating order ${orderId} from ${currentStatus} to ${newStatus}`);
        alert(`Order ${orderId} status updated to "${newStatus}"! (simulated)`);
      } else {
        console.log(`Order ${orderId} is at the final stage.`);
        alert(`Order ${orderId} is already at the final stage. (simulated)`);
      }
    };
    
    const renderCreateTaskButton = () => {
      if (user.role === 'Cutter' || user.role === 'Packing') {
        return (
          <Button asChild>
            <Link href="/dashboard/create-task">
              Create New Task <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        );
      }
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome, {user.name.split(' ')[0]}
          </h2>
          {renderCreateTaskButton()}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Assigned Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedOrders.length > 0 ? (
              <div className="space-y-4">
                {assignedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4"
                  >
                    <div className="mb-4 sm:mb-0">
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.quantity} units of {order.fabricType} ({order.fabricQuality})
                      </p>
                       <p className="text-sm font-medium">Current Stage: <span className="text-primary">{order.status}</span></p>
                    </div>
                    <Button onClick={() => handleUpdateStatus(order.id, order.status)}>
                      Mark as Complete <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No active tasks assigned to you. Great job!</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div>
      {user.role === 'Admin' || user.role === 'Supervisor'
        ? renderAdminSupervisorDashboard()
        : renderStaffDashboard()}
    </div>
  );
}
