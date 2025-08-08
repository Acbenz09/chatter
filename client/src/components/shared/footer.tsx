import { RiMailFill } from "@remixicon/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-16">
      <div className="container mx-auto mb-12 grid gap-8 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center space-x-1.5">
            <div className="bg-primary flex items-center justify-center rounded-lg p-1.5">
              <RiMailFill className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">DAAK</span>
          </div>
          <p className="mt-3 font-medium">
            The modern newsletter platform for creators who demand excellence.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Product</h3>
          <ul className="text-muted-foreground space-y-3">
            <li>
              <Link to="#" className="hover:transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Templates
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Analytics
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Integrations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Company</h3>
          <ul className="text-muted-foreground space-y-3">
            <li>
              <Link to="#" className="hover:transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Support</h3>
          <ul className="text-muted-foreground space-y-3">
            <li>
              <Link to="#" className="hover:transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                API Reference
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:transition-colors">
                Status
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between pt-8 md:flex-row">
          <p className="mb-4 text-sm md:mb-0">
            © 2024 daak. All rights reserved.
          </p>
          <div className="text-muted-foreground flex space-x-6">
            <Link to="#" className="hover:transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
