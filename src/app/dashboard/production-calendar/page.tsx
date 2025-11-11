
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { orders, Order } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function ProductionCalendarPage() {
  const { user, loading } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (loading || !user || (user.role !== 'Admin' && user.role !== 'Supervisor')) {
    return <p>Access Denied</p>;
  }

  const getOrdersForDate = (selectedDate: Date): Order[] => {
    return orders.filter(order => {
        const orderDate = new Date(order.startDate);
        return orderDate.getFullYear() === selectedDate.getFullYear() &&
               orderDate.getMonth() === selectedDate.getMonth() &&
               orderDate.getDate() === selectedDate.getDate();
    });
  }

  const selectedDayOrders = date ? getOrdersForDate(date) : [];

  return (
    <div className="grid gap-6 md:grid-cols-5">
       <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Production Calendar</CardTitle>
          <CardDescription>
            Select a date to view production reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>
       <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>
            Daily Report for {date ? format(date, 'PPP') : '...'}
          </CardTitle>
          <CardDescription>
            List of orders started on this day.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {selectedDayOrders.length > 0 ? (
                <ul className="space-y-4">
                    {selectedDayOrders.map(order => (
                        <li key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-3">
                             <div className="mb-2 sm:mb-0">
                                <p className="font-semibold">{order.id} - {order.fabricType}</p>
                                <p className="text-sm text-muted-foreground">{order.quantity} units of quality {order.fabricQuality}</p>
                            </div>
                            <Badge>{order.status}</Badge>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-muted-foreground py-8">
                    No production started on this day.
                </p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
