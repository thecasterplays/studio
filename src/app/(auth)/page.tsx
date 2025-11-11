import { SirahAndAdnLogo } from '@/components/icons';
import { UserAuthForm } from '@/components/auth/user-auth-form';

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center text-center">
      <SirahAndAdnLogo className="mb-4 h-12 w-12 text-primary" />
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome to Sirah&Adn
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
      <UserAuthForm />
      <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );
}
