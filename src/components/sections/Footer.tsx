import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground space-y-3">
        <div className="flex justify-center gap-6 text-sm">
          <Link 
            to="/remerciements" 
            className="hover:text-primary transition-colors duration-300"
          >
            Remerciements
          </Link>
        </div>
        <p>© 2025 HANTAN Agossou Fred Hugues. Tous droits réservés.</p>
        <p className="text-sm">Site entièrement conçu et développé par mes soins</p>
      </div>
    </footer>
  );
};
