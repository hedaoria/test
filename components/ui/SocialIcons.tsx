export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.6h2.56l.38-2.98h-2.94V8.53c0-.86.24-1.45 1.47-1.45h1.57V4.42C16.2 4.33 15.29 4.25 14.25 4.25c-2.17 0-3.66 1.32-3.66 3.76v2.41H8.02v2.98h2.57V21h2.91z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.68 1.68 0 100 3.36A1.68 1.68 0 005.5 4zM20 13.28c0-3.1-1.66-4.54-3.87-4.54a3.34 3.34 0 00-3.03 1.67V8.5H10.2c.04.85 0 12 0 12h2.9v-6.7c0-.36.03-.72.13-.98.29-.72.96-1.47 2.08-1.47 1.47 0 2.06 1.12 2.06 2.76V20H20v-6.72z" />
    </svg>
  );
}
