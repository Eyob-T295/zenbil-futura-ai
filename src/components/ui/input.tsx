import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary/20 selection:text-primary border-primary/10 h-11 w-full min-w-0 rounded-2xl border bg-primary/5 px-4 py-2 text-sm transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 focus:shadow-xl",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
