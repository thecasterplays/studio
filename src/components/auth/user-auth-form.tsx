'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { users } from '@/lib/data';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { login } = useAuth();
  const [email, setEmail] = React.useState(users[0].email);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      login(email);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Select User (for demo)</Label>
            <Select value={email} onValueChange={setEmail}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user to log in as" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.email}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="px-1 text-xs text-muted-foreground">
              In a real app, this would be an email and password field.
            </p>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
