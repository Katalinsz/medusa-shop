import { cn } from "./utils";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl disabled:opacity-50", className)}
      {...props}
    />
  );
}