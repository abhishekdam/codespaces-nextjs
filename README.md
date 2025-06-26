### **Product Requirements Document: Dam-Tasks**

**1. Objective**

To create a modern, intuitive task management application named **Dam-Tasks**. The application will help users organize their daily tasks efficiently, featuring a clean interface, smart functionality, and a delightful user experience.

**2. Core Features**

*   **Task Management:** Users will be able to add, delete, and toggle the completion status of tasks.
*   **Drag-and-Drop:** Users will be able to reorder tasks and move them between "Pending" and "Completed" states with a smooth drag-and-drop interface.
*   **Persistent Storage:** Tasks will be saved to the browser's Local Storage, so they are not lost when the user closes the tab.
*   **Responsive Design:** The app will provide an optimal viewing experience on both desktop and mobile devices.
*   **Theme Toggle:** Users will be able to switch between a light and dark theme.

**3. Style & UX Guidelines**

*   **Color Palette:** A calming and professional theme will be implemented using Muted Teal (primary), Dark Gray (background), and Soft Gold (accent).
*   **Typography:** 'Inter' will be used for body text and 'Space Grotesk' for headlines to ensure a modern and readable interface.
*   **Animations:** Subtle, fluid animations using `framer-motion` will be integrated for actions like adding, completing, and reordering tasks to make the UI feel responsive and engaging.

**4. Technical Implementation Plan**

Here is a step-by-step plan detailing the development tasks:

*   **Phase 1: Project Scaffolding & Foundation**
    1.  **Initialize Project:** A new **Next.js** application will be created.
    2.  **Configure Stack:** **TypeScript** for type safety and **Tailwind CSS** for styling will be configured from the start.
    3.  **Integrate UI Library:** **ShadCN** will be added to the project, populating `src/components/ui` with a core set of accessible and themeable components (Buttons, Cards, Inputs, etc.).

*   **Phase 2: State Management & Core Architecture**
    1.  **Build Layout:** The main application shell will be defined in `src/app/layout.tsx`, including global styles, fonts, and theme providers.
    2.  **Implement State Management:** **React's Context API** will be used to create a `TaskProvider`. This will manage the global state of the task list, making it accessible throughout the component tree.
    3.  **Enable Persistence:** A `useLocalStorage` custom hook will be developed to automatically save tasks to and retrieve them from the browser's local storage.

*   **Phase 3: Develop Core UI Components**
    1.  **Create Task Form:** A `TaskForm` component will be built to handle the creation of new tasks.
    2.  **Design Task Item:** A `TaskItem` component will be created to display an individual task, a completion checkbox, and a delete button.
    3.  **Construct Main Views:** A responsive layout will be built. For desktop, a two-column `TaskBoard` ("Pending" and "Completed") will be implemented. For mobile, this will switch to a single `TaskList` with filter controls.

*   **Phase 4: Implement Advanced Interactivity**
    1.  **Add Drag-and-Drop:** The `@dnd-kit` library will be integrated to allow for reordering tasks.
    2.  **Enable Sorting:** The `TaskItem` will be wrapped in a `SortableTaskItem` component.
    3.  **Configure Drag Context:** The `TaskBoard` will be wrapped in a `DndContext` to manage drag events, including reordering and moving tasks between the pending and completed columns.

*   **Phase 5: Refine User Experience with Animations**
    1.  **Install Animation Library:** The `framer-motion` library will be added to the project.
    2.  **Implement Layout Animations:** `LayoutGroup` and other `framer-motion` features will be used to create smooth animations for when tasks are added, deleted, or change status, providing a fluid and satisfying user experience.

*   **Phase 6: Final Polish & Optimization**
    1.  **Bug Squashing:** The application will be tested to find and fix common issues, such as event propagation conflicts in draggable items and Next.js hydration errors.
    2.  **Performance Tuning:** Components like `TaskItem` will be wrapped in `React.memo` to prevent unnecessary re-renders and ensure the app remains fast, even with many tasks.

---

This PRD will serve as the guiding document for the development of the Dam-Tasks application.
