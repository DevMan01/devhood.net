import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto max-w-xl px-6 pt-32 pb-16 text-center">
        <h1 className="text-4xl font-medium tracking-tight text-white">404</h1>
        <p className="mt-4 text-white/70">
          That page doesn’t exist.{' '}
          <Link to="/" className="text-accent hover:underline">
            Go home.
          </Link>
        </p>
      </section>
    </Layout>
  );
}
