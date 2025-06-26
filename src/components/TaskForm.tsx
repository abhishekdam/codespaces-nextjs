'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTasks } from '@/components/providers/task-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(3, 'Task must be at least 3 characters.'),
});

export function TaskForm() {
  const { addTask } = useTasks();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTask({ text: values.text });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="What needs to be done?"
                    {...field}
                    className="py-6 text-lg pl-4 pr-16 md:pr-28"
                  />
                  <Button
                    type="submit"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:inline">Add Task</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
