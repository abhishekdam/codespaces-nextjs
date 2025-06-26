'use client';

import { useTasks } from '@/components/providers/task-provider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Filter } from '@/types';

export function FilterControls() {
  const { filter, setFilter } = useTasks();

  return (
    <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
