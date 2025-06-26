'use client';

import { useState, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTasks } from '@/components/providers/task-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles } from 'lucide-react';
import { suggestTags } from '@/ai/flows/suggest-tags';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  text: z.string().min(3, 'Task must be at least 3 characters.'),
});

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export function TaskForm() {
  const { addTask } = useTasks();
  const [tags, setTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, startSuggestionTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: '' },
  });

  // const debouncedSuggestTags = useCallback(debounce(async (taskDescription: string) => {
  //   if (taskDescription.length < 5) {
  //     setSuggestedTags([]);
  //     return;
  //   }
  //   startSuggestionTransition(async () => {
  //     try {
  //       const result = await suggestTags({ taskDescription });
  //       setSuggestedTags(result.tags.filter(tag => !tags.includes(tag)));
  //     } catch (error) {
  //       console.error("Failed to suggest tags:", error);
  //       toast({
  //         variant: "destructive",
  //         title: "AI Error",
  //         description: "Could not fetch AI-powered tag suggestions.",
  //       });
  //     }
  //   });
  // }, 500), [tags, toast]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   form.setValue('text', e.target.value);
  //   debouncedSuggestTags(e.target.value);
  // };
  
  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setSuggestedTags(suggestedTags.filter(t => t !== tag));
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTask({ text: values.text, tags });
    form.reset();
    setTags([]);
    setSuggestedTags([]);
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
                    // onChange={handleInputChange} 
                    className="py-6 text-lg pl-4 pr-16 md:pr-28"
                  />
                  <Button type="submit" className="absolute top-1/2 right-2 -translate-y-1/2" size="sm">
                    <Plus className="h-4 w-4"/>
                    <span className="hidden md:inline">Add Task</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(tags.length > 0 || suggestedTags.length > 0 || isSuggesting) && (
          <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag}
                  <span className="ml-2 text-xs font-light">x</span>
                </Badge>
              ))}
              {isSuggesting && <Sparkles className="h-4 w-4 animate-pulse text-accent" />}
              {suggestedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent/20" onClick={() => addTag(tag)}>
                   {tag}
                </Badge>
              ))}
          </div>
        )}
      </form>
    </Form>
  );
}
