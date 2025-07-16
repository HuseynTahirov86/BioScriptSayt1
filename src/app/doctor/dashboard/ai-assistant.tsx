'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';

import { generatePrescriptionSuggestions, type GeneratePrescriptionSuggestionsOutput } from '@/ai/flows/generate-prescription-suggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { Patient } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  currentSymptoms: z.string().min(10, 'Please describe symptoms in at least 10 characters.'),
});

type AIAssistantProps = {
  patient: Patient;
};

export function AIAssistant({ patient }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<GeneratePrescriptionSuggestionsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSymptoms: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const patientAge = new Date().getFullYear() - new Date(patient.dob).getFullYear();
      const result = await generatePrescriptionSuggestions({
        ...values,
        patientHistory: patient.history,
        patientAge,
      });
      setSuggestions(result);
    } catch (e) {
      setError('Failed to get AI suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-secondary/50 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-primary">AI-Powered Suggestions</CardTitle>
                <CardDescription>Get prescription recommendations based on patient data.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm p-4 mb-4 bg-background rounded-lg border">
            <p className="font-bold">Patient History:</p>
            <p className="text-muted-foreground">{patient.history}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentSymptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Symptoms</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Persistent cough, fever, headache for 3 days." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get AI Suggestions'
              )}
            </Button>
          </form>
        </Form>

        {error && <Alert variant="destructive" className="mt-4"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {suggestions && (
          <div className="mt-6 space-y-4">
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle className="font-headline">AI Recommendations</AlertTitle>
              <AlertDescription>
                The following are AI-generated suggestions. Always use your professional medical judgment.
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{suggestions.suggestedPrescriptions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{suggestions.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
