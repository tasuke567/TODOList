/* app/page.tsx */
import TodoBoard from "@/components/TodoBoard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">📝 Auto-Delete Todo List</h1>
      <TodoBoard />
    </main>
  );
}
