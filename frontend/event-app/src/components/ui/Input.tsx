import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm text-slate-500 font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-white border rounded-lg px-4 py-2.5 text-slate-800 placeholder-muted focus:outline-none transition-colors ${
          error ? 'border-red-400 focus:border-red-400' : 'border-border focus:border-accent'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}