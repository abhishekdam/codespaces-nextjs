'use client';

import { forwardRef, memo } from 'react';
import type { Task } from '@/types';
import { useTasks } from '@/components/providers/task-provider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TaskItemProps extends React.HTMLAttributes<HTMLLIElement> {
  task: Task;
  isOverlay?: boolean;
  isDragging?: boolean;
}

const TaskItemWithRef = forwardRef<HTMLLIElement, TaskItemProps>(
  ({ task, isOverlay = false, isDragging = false, ...props }, ref) => {
    const { toggleTask, deleteTask } = useTasks();

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    return (
      <motion.li
        ref={ref}
        layoutId={task.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDragging ? 0.3 : 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'flex items-center p-3 gap-3 transition-colors bg-card border rounded-lg',
          'hover:bg-muted/50',
          {
            'shadow-sm cursor-grab active:cursor-grabbing': !isOverlay,
            'shadow-lg cursor-grabbing': isOverlay,
          }
        )}
        {...props}
      >
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => toggleTask(task.id)}
          aria-label={`Mark task as ${task.completed ? 'pending' : 'completed'}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        />
        <div className="flex-1">
          <div
            className={cn(
              'font-medium transition-all',
              task.completed && 'line-through text-muted-foreground'
            )}
          >
            {task.text}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          aria-label="Delete task"
          className="text-muted-foreground hover:text-destructive"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </motion.li>
    );
  }
);
TaskItemWithRef.displayName = 'TaskItem';

export const TaskItem = memo(TaskItemWithRef);
