'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/auth-context';
import { generateSummaryAction } from '@/app/actions';
import { Loader2, Sparkles } from 'lucide-react';

export default function SummaryPage() {
  const { user } = useAuth();
  const [dailyReport, setDailyReport] = useState('');
  const [weeklyReport, setWeeklyReport] = useState('');
  const [monthlyReport, setMonthlyReport] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyReport && !weeklyReport && !monthlyReport) {
      setError('Please provide at least one report.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');

    const result = await generateSummaryAction({
      dailyReport,
      weeklyReport,
      monthlyReport,
    });

    if (result.success && result.data) {
      setSummary(result.data.summary);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }

    setIsLoading(false);
  };

  if (!user || (user.role !== 'Admin' && user.role !== 'Supervisor')) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You do not have permission to view this page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>AI-Powered Report Summary</CardTitle>
            <CardDescription>
              Input your production reports to generate an intelligent summary. The
              AI will include sensitive staff performance data only for Admins.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="daily-report">Daily Report</Label>
              <Textarea
                id="daily-report"
                placeholder="Paste your daily production report here..."
                value={dailyReport}
                onChange={(e) => setDailyReport(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weekly-report">Weekly Report</Label>
              <Textarea
                id="weekly-report"
                placeholder="Paste your weekly production report here..."
                value={weeklyReport}
                onChange={(e) => setWeeklyReport(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly-report">Monthly Report</Label>
              <Textarea
                id="monthly-report"
                placeholder="Paste your monthly production report here..."
                value={monthlyReport}
                onChange={(e) => setMonthlyReport(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Summary
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Generated Summary</CardTitle>
          <CardDescription>
            The AI-generated insights will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-foreground dark:prose-invert">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Generating summary...</p>
            </div>
          ) : summary ? (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          ) : (
            <p className="text-muted-foreground">
              Your summary will be displayed here once generated.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
