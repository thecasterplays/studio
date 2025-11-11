'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { orders, getStaffNameById, Order } from '@/lib/data';

const getBadgeVariant = (
  status: Order['status']
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Ready to Deliver':
    case 'Packed':
      return 'default';
    case 'Stitching':
    case 'Ready for Packing':
      return 'secondary';
    case 'Cutting':
      return 'outline';
    default:
      return 'outline';
  }
};

export default function OrdersPage() {
  const { user } = useAuth();
  if (!user) return null;

  const userOrders =
    user.role === 'Staff'
      ? orders.filter((order) => order.assignedStaffId === user.id)
      : orders;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          A list of all orders in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fabric</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
              <TableHead className="hidden md:table-cell">
                Assigned Staff
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.fabricType} - {order.fabricQuality}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {order.quantity}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getStaffNameById(order.assignedStaffId)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {user.role === 'Admin' && (
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      )}
                      {user.role === 'Admin' && (
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
