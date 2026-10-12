import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-sans">
      <div className="bg-white max-w-md w-full rounded-[2px] shadow-2xl border border-nyt p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="font-masthead text-3xl text-nyt-ink block mb-2">
            The New York Times
          </span>
          <h3 className="font-serif text-2xl font-bold text-nyt-ink">
            Independent journalism for an interconnected world.
          </h3>
          <p className="text-xs text-gray-600 mt-2">
            Subscribe today for just <strong className="text-black">$1/week</strong> billed monthly. Cancel anytime.
          </p>
        </div>

        {subscribed ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h4 className="font-serif text-xl font-bold text-black">
              Welcome to All Access
            </h4>
            <p className="text-xs text-gray-600">
              We’ve activated your complimentary digital broadsheet subscription for <strong>{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-nyt-ink text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded"
            >
              Start Reading
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3.5 rounded border border-nyt">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Unlimited News, Opinion & International Investigations</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>The NYT Audio app & daily headline briefings</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Full access to Wordle, Connections, & Cooking</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs p-3 border border-nyt rounded focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-nyt-blueBtn hover:bg-nyt-blueHover text-white py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow"
            >
              Continue with $1/week Offer
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure checkout. Special introductory promotional rate.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
