import React from 'react';
import { SectionType } from '../types';

interface FooterProps {
  onSelectSection: (section: SectionType) => void;
  onOpenSubscribe: () => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenSubscribe,
  onGoHome
}) => {
  return (
    <footer className="max-w-[1280px] mx-auto px-4 lg:px-8 border-t-2 border-black pt-6 pb-20 font-sans text-xs text-gray-700" data-purpose="site-footer">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-nyt">
        <button
          onClick={onGoHome}
          className="font-masthead text-3xl font-normal text-nyt-ink mb-3 md:mb-0 hover:opacity-80 transition-opacity"
        >
          The New York Times
        </button>

        <div className="flex flex-wrap gap-4 text-xs font-semibold">
          <button onClick={() => onSelectSection('World')} className="hover:underline">
            NEWS
          </button>
          <button onClick={() => onSelectSection('Opinion')} className="hover:underline">
            OPINION
          </button>
          <button onClick={() => onSelectSection('Arts')} className="hover:underline">
            ARTS
          </button>
          <button onClick={() => onSelectSection('Lifestyle')} className="hover:underline">
            LIVING
          </button>
          <button onClick={() => onSelectSection('Business')} className="hover:underline">
            LISTINGS &amp; MORE
          </button>
          <button onClick={() => onSelectSection('Cooking')} className="hover:underline">
            COOKING
          </button>
          <button onClick={() => onSelectSection('Games')} className="hover:underline">
            GAMES
          </button>
        </div>
      </div>

      {/* Legal, Disclaimers, and Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-nyt-grayText space-y-3 md:space-y-0">
        <p>© 2026 The New York Times Company. Authentic Broadsheet Edition.</p>
        <nav aria-label="Footer Legal Links" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a className="hover:underline" href="#nytco">NYTCo</a>
          <a className="hover:underline" href="#contact">Contact Us</a>
          <a className="hover:underline" href="#accessibility">Accessibility</a>
          <a className="hover:underline" href="#careers">Work with us</a>
          <a className="hover:underline" href="#advertise">Advertise</a>
          <a className="hover:underline" href="#tbrand">T Brand Studio</a>
          <a className="hover:underline" href="#adchoices">Your Ad Choices</a>
          <a className="hover:underline" href="#privacy">Privacy Policy</a>
          <a className="hover:underline" href="#terms">Terms of Service</a>
          <a className="hover:underline" href="#terms-sale">Terms of Sale</a>
          <a className="hover:underline" href="#sitemap">Site Map</a>
          <button onClick={onOpenSubscribe} className="hover:underline text-nyt-blueBtn font-semibold">
            Subscriptions
          </button>
        </nav>
      </div>
    </footer>
  );
};
