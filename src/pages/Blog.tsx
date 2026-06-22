import Layout from '../components/Layout';

export default function Blog() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-16">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
          Blog
        </h1>
        <p className="mt-4 text-white/70">
          Coming soon. This route is wired up so future posts can be dropped in
          without touching the rest of the site.
        </p>
      </section>
    </Layout>
  );
}
