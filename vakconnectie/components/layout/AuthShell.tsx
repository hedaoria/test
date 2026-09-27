export function AuthShell({ title, intro, children, aside }: { title: string; intro?: React.ReactNode; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="bg-[#faf8f5]">
      <div className="container-page flex flex-col items-center py-10 sm:py-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          {intro && <div className="mt-2 text-stone-600">{intro}</div>}
          <div className="card mt-6 p-6 sm:p-8">{children}</div>
          {aside}
        </div>
      </div>
    </div>
  );
}
