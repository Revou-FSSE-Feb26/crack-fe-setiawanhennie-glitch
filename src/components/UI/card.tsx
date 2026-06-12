import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "outlined" | "glass";
}

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  variant = "default",
}: CardProps) {
  const variants = {
    default: "bg-surface dark:bg-neutral-800 border border-border",
    elevated: "bg-surface dark:bg-neutral-800 shadow-xl border border-transparent",
    outlined: "bg-transparent border-2 border-primary-200 dark:border-primary-800",
    glass: "glass",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        rounded-2xl transition-all duration-200
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? "card-hover" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}