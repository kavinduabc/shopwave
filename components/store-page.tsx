type StorePageProps = {
  title: string;
  description: string;
  action?: string;
};

export function StorePage({ title, description, action }: StorePageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
          ShopWave
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        {action && (
          <a
            href="/shop"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            {action}
          </a>
        )}
      </section>
    </main>
  );
}
