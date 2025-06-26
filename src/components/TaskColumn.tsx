'use client';
import type { Task } from '@/types';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { SortableTaskItem } from './SortableTaskItem';
import { AnimatePresence } from 'framer-motion';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function TaskColumn({ id, title, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className="flex-grow p-4 bg-muted/50 rounded-b-lg"
      >
        <ScrollArea className="h-full pr-4">
          <SortableContext
            id={id}
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              <AnimatePresence>
                {tasks.map((task) => (
                  <SortableTaskItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
              {tasks.length === 0 && (
                <div className="flex items-center justify-center h-24 text-muted-foreground">
                  <p>Drag tasks here</p>
                </div>
              )}
            </ul>
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
