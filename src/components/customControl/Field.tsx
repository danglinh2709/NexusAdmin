export function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="text-[12px] font-semibold tracking-widest text-slate-400 mb-2">
        {label}
      </div>
      {children}
      {error ? (
        <div className="text-xs text-red-500 ml-1 mt-0.5">{error}</div>
      ) : null}
    </div>
  );
}
