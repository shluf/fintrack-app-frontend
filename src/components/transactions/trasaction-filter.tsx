'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, ArrowUp, Filter, Search } from 'lucide-react';

interface TransactionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
}

export function TransactionsFilters({ 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter 
}: TransactionsFiltersProps) {
  return (
    <div className="flex justify-between px-4 py-8 border rounded-lg">
      <div className="flex sm:flex-row flex-col w-full gap-4 items-center">
        <div className="relative">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" border-slate-700 sm:w-64 w-full focus:ring-emerald-500 focus:border-emerald-500 pl-10"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="relative border-slate-700 w-[180px]">
            <SelectValue placeholder="Filter by type" />
            <Filter className="h-4 w-4 ml-2 absolute right-10 text-slate-500" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4 text-emerald-400" />
                Income
              </div>
            </SelectItem>
            <SelectItem value="expense">
              <div className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4 text-red-400" />
                Expense
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h3 className="hidden md:block font-semibold text-2xl text-green-button text-end">
        &quot;Easily track your transactions&quot;
      </h3>
    </div>
  );
}