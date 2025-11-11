'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/dashboard/overview';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { users, orders } from '@/lib/data';

const getStaffPerformanceData = () => {
    const staffPerformance: { [key: string]: { name: string, completed: number } } = {};

    users.filter(u => u.role === 'Staff').forEach(staff => {
        staffPerformance[staff.id] = { name: staff.name, completed: 0 };
    });

    orders.forEach(order => {
        if (order.status === 'Ready to Deliver' && staffPerformance[order.assignedStaffId]) {
            staffPerformance[order.assignedStaffId].completed++;
        }
    });

    return Object.values(staffPerformance);
};


export default function ReportsPage() {
  const { user } = useAuth();
  if (!user) return null;

  const staffPerformanceData = getStaffPerformanceData();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        {user.role === 'Admin' && (
          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Staff Performance</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottleneck Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Overview</CardTitle>
              <CardDescription>
                A summary of orders in each production stage.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>
                Number of completed orders by each staff member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={staffPerformanceData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }} />
                    <Legend />
                    <Bar dataKey="completed" name="Completed Orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bottlenecks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bottleneck Analysis</CardTitle>
              <CardDescription>
                Identifying potential bottlenecks in the production line.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Bottleneck analysis feature coming soon. This section will highlight stages where orders are taking longer than average to complete.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
