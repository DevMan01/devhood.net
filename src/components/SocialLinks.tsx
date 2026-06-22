import { socials } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export default function SocialLinks() {
  return (
    <ul
      className="
        grid grid-cols-3 gap-3
        sm:grid-cols-6 sm:gap-4
        w-full
      "
      aria-label="Social profiles"
    >
      {socials.map((s) => (
        <li key={s.id} className="flex justify-center">
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            data-testid={`social-${s.id}`}
            className="
              group
              flex h-12 w-12 items-center justify-center
              rounded-tesla
              text-white/85
              hover:text-white
              hover:bg-white/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
              transition-colors duration-tesla ease-tesla
            "
          >
            <SocialIcon
              icon={s.icon}
              className="h-6 w-6 transition-transform duration-tesla ease-tesla group-hover:scale-110"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
