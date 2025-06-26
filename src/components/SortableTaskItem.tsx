'use client';
import type { Task } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskItem } from './TaskItem';
import { memo } from 'react';

export const SortableTaskItem = memo(({ task }: { task: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskItem
      ref={setNodeRef}
      style={style}
      task={task}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
});

SortableTaskItem.displayName = 'SortableTaskItem';
