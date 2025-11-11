
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { orders } from '@/lib/data';

const getOverviewData = () => {
    const statusCounts: { [key: string]: number } = {
        'Cutting': 0,
        'Machine': 0,
        'Ready for Packing': 0,
        'Packed': 0,
        'Ready to Deliver': 0,
    };

    orders.forEach(order => {
        if (statusCounts.hasOwnProperty(order.status)) {
            statusCounts[order.status]++;
        }
    });

    return Object.keys(statusCounts).map(status => ({
        name: status,
        total: statusCounts[status],
    }));
};


export function Overview() {
    const data = getOverviewData();
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
            contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))'
            }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
