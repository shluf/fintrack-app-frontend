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
import { Transaction, transactionsApi } from '@/lib/api';
import { NotepadText, Sparkles, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

const transactionSchema = z.object({
  amount: z.coerce.number(),
  type: z.enum(['income', 'expense']),
  date: z.string(),
  description: z.string().min(1),
});

type TransactionFormProps = {
  onSuccess?: (newTransaction: Transaction) => void;
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
      let newTransaction;

      if (initialData?._id) {
        const response = await transactionsApi.update(initialData._id, data);
        newTransaction = response.data.transaction
      } else {
        const response = await transactionsApi.create(data);
        newTransaction = response.data.transaction
      }
      toast({
        title: 'Success',
        description: `Transaction ${initialData ? 'updated' : 'created'} successfully!`,
      });
      if (onSuccess) onSuccess(newTransaction);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Amount</FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-2">
                <span className='bg-emerald-400/80 py-1.5 px-2 border-slate-200  rounded-lg font-medium text-white shadow-inner'>Rp</span>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    className="bg-slate-900 border-slate-700 text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 no-spinner"
                  />
                  <Wallet className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 hover:border-emerald-500">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="income" className="hover:bg-slate-700/50 text-slate-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      Income
                    </div>
                  </SelectItem>
                  <SelectItem value="expense" className="hover:bg-slate-700/50 text-slate-100">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-purple-400" />
                      Expense
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Date</FormLabel>
              <div className="relative">
                <Input
                  type="date"
                  {...field}
                  className="bg-slate-900 border-slate-700 text-slate-100 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300">Description</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    {...field}
                    className="bg-slate-900 border-slate-700 text-slate-100 focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px]"
                  />
                  <NotepadText className="h-5 w-5 absolute right-3 top-3 text-slate-500" />
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
        >
          {initialData ? "Update" : "Add"} Transaction
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
