import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  variant?: 'light' | 'dark';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'light',
  className,
}: SectionHeaderProps) {
  const wrap = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left';
  const isDark = variant === 'dark';

  return (
    <div className={cn('mb-12 md:mb-16', wrap, className)}>
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
            isDark
              ? 'border-white/25 bg-white/10 text-white/90 backdrop-blur-sm'
              : 'border-[#1a3c6e]/15 bg-white/80 text-[#1a3c6e]/80 shadow-sm backdrop-blur-sm'
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem] lg:leading-tight',
          isDark ? 'text-white' : 'text-[#0f2847]'
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-relaxed md:text-lg',
            isDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
