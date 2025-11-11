
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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { users, fabricQualities, addFabricQuality, UserRole, User } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [newQuality, setNewQuality] = useState('');
  const [qualities, setQualities] = useState(fabricQualities);
  const [userList, setUserList] = useState(users);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Cutter');

  useEffect(() => {
    if (!loading && user?.role !== 'Admin') {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user?.role !== 'Admin') {
    return null;
  }

  const getBadgeVariant = (
    role: string
  ): 'default' | 'secondary' | 'outline' => {
    if (role === 'Admin') return 'default';
    if (role === 'Supervisor') return 'secondary';
    return 'outline';
  };

  const handleAddQuality = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuality.trim()) {
      addFabricQuality(newQuality.trim());
      setQualities([...fabricQualities]);
      setNewQuality('');
      alert(`Quality "${newQuality.trim()}" added!`);
    }
  };

  const openEditDialog = (userToEdit: User) => {
    setSelectedUser(userToEdit);
    setSelectedRole(userToEdit.role);
    setIsEditDialogOpen(true);
  };

  const handleRoleChange = () => {
    if (selectedUser) {
      // In a real app, this would be an API call
      const updatedUsers = userList.map(u => 
        u.id === selectedUser.id ? { ...u, role: selectedRole } : u
      );
      setUserList(updatedUsers);
      console.log(`Updated ${selectedUser.name}'s role to ${selectedRole}`);
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all user accounts and their roles.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1" disabled>
              <PlusCircle className="h-4 w-4" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userList.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={u.avatar} alt="Avatar" />
                          <AvatarFallback>
                            {u.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{u.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(u.role)}>{u.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {u.email}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(u)}>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" disabled>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fabric Qualities</CardTitle>
            <CardDescription>
              Manage the available fabric qualities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {qualities.map((q) => (
                <li
                  key={q}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add New Quality</CardTitle>
            <CardDescription>
              Add a new fabric quality to the list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddQuality} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="new-quality">New Quality Name</Label>
                <Input
                  id="new-quality"
                  placeholder="e.g., 80x80"
                  value={newQuality}
                  onChange={(e) => setNewQuality(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Add Quality</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role for {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Select a new role for this user. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
                <SelectItem value="Cutter">Cutter</SelectItem>
                <SelectItem value="Machine">Machine</SelectItem>
                <SelectItem value="Packing">Packing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRoleChange}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
