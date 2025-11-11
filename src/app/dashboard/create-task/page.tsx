
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { orders, fabricQualities } from '@/lib/data';

export default function CreateTaskPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [fabricType, setFabricType] = useState('');
  const [fabricQuality, setFabricQuality] = useState(fabricQualities[0]);
  const [quantity, setQuantity] = useState('');

  if (!user || (user.role !== 'Cutter' && user.role !== 'Packing')) {
    // Or a more user-friendly "access denied" component
    return <p>Access Denied</p>;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
        id: `SF-${orders.length + 1001}`,
        fabricType,
        fabricQuality,
        quantity: parseInt(quantity),
        assignedStaffId: user.id,
        status: user.role === 'Cutter' ? 'Cutting' : 'Packed',
        startDate: new Date(),
    };
    
    // In a real application, you would send this to your backend
    orders.push(newOrder);
    console.log('New Task Created:', newOrder);
    alert('New task created successfully! (simulated)');
    router.push('/dashboard/orders');
  }

  const renderCutterForm = () => (
     <>
        <div className="grid gap-2">
            <Label htmlFor="fabric-type">Fabric Type</Label>
            <Input id="fabric-type" placeholder="e.g., Cotton, Silk" value={fabricType} onChange={(e) => setFabricType(e.target.value)} required/>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="fabric-quality">Fabric Quality</Label>
            <Select value={fabricQuality} onValueChange={(value) => setFabricQuality(value)}>
                <SelectTrigger id="fabric-quality">
                    <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                    {fabricQualities.map((quality) => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="e.g., 500" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
    </>
  );

  const renderPackingForm = () => (
    <>
        <div className="grid gap-2">
            <Label htmlFor="order-id">Order ID</Label>
            <Input id="order-id" placeholder="e.g., SF-1001" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity Packed</Label>
            <Input id="quantity" type="number" placeholder="e.g., 500" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
    </>
  );

  return (
    <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle>Create New Task</CardTitle>
                <CardDescription>
                    Enter the details for the new production task.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {user.role === 'Cutter' && renderCutterForm()}
                {user.role === 'Packing' && renderPackingForm()}
            </CardContent>
            <CardFooter>
                <Button type="submit">Create Task</Button>
            </CardFooter>
        </form>
    </Card>
  );
}
