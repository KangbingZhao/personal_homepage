import { ReactNode } from "react";
import classNames from "classnames";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={classNames(
        "rounded-2xl shadow p-4 bg-white hover:shadow-md transition",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
