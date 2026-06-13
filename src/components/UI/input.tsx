"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none text-foreground">
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        
        <input
          className={`flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${leftIcon ? "pl-10" : ""} ${error ? "border-destructive focus-visible:ring-destructive" : ""} ${className}`}
          {...props}
        />
      </div>
      
      {error ? (
        <p className="text-xs text-destructive flex items-center gap-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}