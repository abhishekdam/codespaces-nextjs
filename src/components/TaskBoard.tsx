'use client';
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTasks } from '@/components/providers/task-provider';
import { useMemo, useState } from 'react';
import { TaskColumn } from './TaskColumn';
import type { Task } from '@/types';
import { TaskItem } from './TaskItem';
import { LayoutGroup } from 'framer-motion';

export function TaskBoard() {
  const { tasks, setTasks, toggleTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const taskColumns = useMemo(() => {
    const pending = tasks.filter((task) => !task.completed);
    const completed = tasks.filter((task) => task.completed);
    return { pending, completed };
  }, [tasks]);
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (active.id === over.id) return;

    if (activeContainer !== overContainer) {
      toggleTask(active.id as string);
    } else {
      const taskList =
        activeContainer === 'pending'
          ? taskColumns.pending
          : taskColumns.completed;
      const oldIndex = taskList.findIndex((t) => t.id === active.id);
      const newIndex = taskList.findIndex((t) => t.id === over.id);

      if (oldIndex !== newIndex) {
        const newOrderedTasksForColumn = arrayMove(taskList, oldIndex, newIndex);
        const otherColumnTasks =
          activeContainer === 'pending'
            ? taskColumns.completed
            : taskColumns.pending;
        
        const newTasks =
          activeContainer === 'pending'
            ? [...newOrderedTasksForColumn, ...otherColumnTasks]
            : [...otherColumnTasks, ...newOrderedTasksForColumn];
        
        setTasks(newTasks);
      }
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <TaskColumn
            id="pending"
            title="Pending"
            tasks={taskColumns.pending}
          />
          <TaskColumn
            id="completed"
            title="Completed"
            tasks={taskColumns.completed}
          />
        </div>
      </LayoutGroup>
      <DragOverlay>
        {activeTask ? <TaskItem task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
