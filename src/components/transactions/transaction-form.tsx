'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { transactionsApi } from '@/lib/api';

const transactionSchema = z.object({
  amount: z.coerce.number(),
  type: z.enum(['income', 'expense']),
  date: z.string(),
  description: z.string().min(1),
});

type TransactionFormProps = {
  onSuccess?: () => void;
  initialData?: z.infer<typeof transactionSchema> & { _id: string };
};

export function TransactionForm({ onSuccess, initialData }: TransactionFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData || {
      amount: 0,
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      description: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    try {
      if (initialData?._id) {
        await transactionsApi.update(initialData._id, data);
      } else {
        await transactionsApi.create(data);
      }
      toast({
        title: 'Success',
        description: `Transaction ${initialData ? 'updated' : 'created'} successfully!`,
      });
      if (onSuccess) onSuccess();
      if (!initialData) form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to save transaction. ${error}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Transaction
        </Button>
      </form>
    </Form>
  );
}
