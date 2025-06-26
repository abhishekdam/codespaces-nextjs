'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Task, Filter } from '@/types';

interface TaskContextType {
  tasks: Task[];
  filter: Filter;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<Filter>('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'completed'>) => {
      const newTask: Task = {
        ...task,
        id: new Date().getTime().toString(),
        completed: false,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const tasksToRender = useMemo(() => {
    if (!isClient) {
      return [];
    }
    return tasks;
  }, [isClient, tasks]);

  const filteredTasks = useMemo(() => {
    if (!isClient) {
      return [];
    }
    const sortedTasks = [...tasks].sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
    switch (filter) {
      case 'completed':
        return sortedTasks.filter((task) => task.completed);
      case 'pending':
        return sortedTasks.filter((task) => !task.completed);
      case 'all':
      default:
        return sortedTasks;
    }
  }, [tasks, filter, isClient]);

  const value = {
    tasks: tasksToRender,
    filter,
    setTasks: setTasks as (tasks: Task[]) => void,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    filteredTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
