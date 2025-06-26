import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '';
import { Toaster } from '';
import { TaskProvider } from '';

export const metadata: Metadata = {
  title: 'Dam-Task',
  description: 'Manage your tasks with AI-powered suggestions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TaskProvider>
            {children}
            <Toaster />
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
