'use client';

import { useTasks } from '@/components/providers/task-provider';
import { TaskItem } from './TaskItem';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

export function TaskList() {
  const { filteredTasks } = useTasks();

  if (filteredTasks.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>You're all caught up!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0 h-full">
        <ScrollArea className="h-full">
          <LayoutGroup>
            <ul className="space-y-2 p-4">
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </ul>
          </LayoutGroup>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
