'use client';

import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { FilterControls } from './FilterControls';
import { ThemeToggle } from './ThemeToggle';
import { Separator } from './ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { TaskBoard } from './TaskBoard';

export function DamTasksApp() {
  const isMobile = useIsMobile();
  
  if (isMobile === undefined) {
    return null; 
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 h-screen flex flex-col">
      <header className="flex items-center justify-between pt-8 md:pt-12 mb-8 flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Dam-Tasks
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex-grow flex flex-col min-h-0 space-y-6">
        <section className="flex-shrink-0">
          <TaskForm />
        </section>

        <Separator />
        
        {isMobile ? (
            <section className="flex-grow flex flex-col min-h-0 space-y-4">
              <FilterControls/>
              <div className="flex-grow min-h-0">
                <TaskList/>
              </div>
            </section>
          ) : (
            <section className="flex-grow min-h-0 pb-4">
              <TaskBoard />
            </section>
        )}
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm flex-shrink-0">
        <p>Streamline your day with Dam-Tasks.</p>
      </footer>
    </div>
  );
}
