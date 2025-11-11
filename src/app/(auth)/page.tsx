import { UserAuthForm } from '@/components/auth/user-auth-form';
import { StitchFlowLogo } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center text-center">
      <StitchFlowLogo className="mb-4 h-12 w-12 text-primary" />
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome to StitchFlow
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
