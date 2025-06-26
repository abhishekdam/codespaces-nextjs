export type Task = {
  id: string;
  text: string;
  completed: boolean;
  tags: string[];
};

export type Filter = "all" | "pending" | "completed";
