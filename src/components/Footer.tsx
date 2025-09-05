import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "#features" },
        { name: "Pricing", path: "/pricing" },
        { name: "About", path: "/about" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "#docs" },
        { name: "Blog", path: "#blog" },
        { name: "Support", path: "#support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie-policy" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.svg" 
                alt="InkCopilot Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-muted-foreground">
              Empowering creators with AI-driven content automation, making writing effortless and efficient.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} InkCopilot. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
