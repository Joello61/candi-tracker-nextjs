import Link from 'next/link';
import { Zap } from 'lucide-react';

interface FooterProps {
  applicationName?: string;
}

export const LandingFooter: React.FC<FooterProps> = ({ applicationName = 'JobTracker' }) => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">{applicationName}</span>
          </div>

          <div className="flex space-x-6 text-sm text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Conditions
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400">
          <p>&copy; 2024 {applicationName}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};