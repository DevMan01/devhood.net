import Layout from '../components/Layout';
import Portrait from '../components/Portrait';
import SocialLinks from '../components/SocialLinks';

export default function Home() {
  return (
    <Layout bare>
      <section
        aria-label="Tim Chaffin — landing"
        className="
          min-h-dvh w-full
          flex items-center justify-center
          px-4 sm:px-6
          py-8
        "
      >
        <article
          className="
            glass-card
            w-full max-w-md
            sm:max-w-lg
            rounded-2xl
            px-6 py-8 sm:px-10 sm:py-12
            flex flex-col items-center
            gap-6 sm:gap-8
            text-center
          "
        >
          <Portrait src="/profile.jpeg" alt="Tim Chaffin" />

          <header className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Tim Chaffin
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              Engineer · Photographer · Hiker
            </p>
          </header>

          <SocialLinks />
        </article>
      </section>
    </Layout>
  );
}
