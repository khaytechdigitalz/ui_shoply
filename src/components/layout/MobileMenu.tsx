import { Link } from "react-router-dom";
import { Phone, Mail, LogOut } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Logo } from "@/components/ui/Logo";
import { Accordion } from "@/components/ui/Accordion";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/BrandIcons";
import { useStore } from "@/store/StoreContext";
import { categories } from "@/data/content";
import { getImageSrc } from "@/lib/utils";

export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen, isAuthenticated, profile, setLogoutModalOpen } = useStore();

  const close = () => setMobileMenuOpen(false);

  return (
    <Drawer open={mobileMenuOpen} onClose={close} side="left" widthClassName="max-w-sm">
      <div className="border-gray-tertiary/24 flex items-center justify-between border-b px-5 py-4">
        <Logo />
      </div>
      <div className="p-5">
        <Accordion
          defaultOpenId="shop"
          items={[
            {
              id: "home",
              title: "Home",
              content: (
                <Link onClick={close} to="/" className="text-primary-main text-sm font-medium">
                  Go to homepage
                </Link>
              ),
            },
            {
              id: "shop",
              title: "Shop",
              content: (
                <ul className="space-y-3">
                  {[
                    ["Product Details", "/product-details-1"],
                    ["Wishlist", "/wishlist"],
                    ["Cart", "/cart-single-vendor"],
                    ["Checkout", "/checkout-1"],
                    ["Order Success", "/order-success"],
                    ["Compare", "/compare-list"],
                    ["Empty Cart", "/empty-cart-screen"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link onClick={close} to={href} className="text-gray-secondary hover:text-primary-main text-sm">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "sellers",
              title: "Sellers",
              content: (
                <ul className="space-y-3">
                  <li>
                    <Link onClick={close} to="/vendor-list" className="text-gray-secondary hover:text-primary-main text-sm">
                      All Vendors
                    </Link>
                  </li>
                  <li>
                    <Link onClick={close} to="/vendor-profile" className="text-gray-secondary hover:text-primary-main text-sm">
                      Vendor Profile
                    </Link>
                  </li>
                </ul>
              ),
            },
            {
              id: "categories",
              title: "Categories",
              content: (
                <ul className="grid grid-cols-2 gap-3">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        onClick={close}
                        to={`/products?category=${c.id}`}
                        className="text-gray-secondary hover:text-primary-main text-sm"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "pages",
              title: "Pages",
              content: (
                <ul className="space-y-3">
                  {[
                    ["FAQ", "/faq"],
                    ["Contact Us", "/contact"],
                    ["My Account", "/account"],
                    ["Privacy Policy", "/privacy-policy"],
                    ["Terms & Conditions", "/term-and-conditions"],
                    ["Coming Soon", "/coming-soon"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link onClick={close} to={href} className="text-gray-secondary hover:text-primary-main text-sm">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "blog",
              title: "Blog",
              content: (
                <ul className="space-y-3">
                  <li>
                    <Link onClick={close} to="/blog-list" className="text-gray-secondary hover:text-primary-main text-sm">
                      Blog List
                    </Link>
                  </li>
                  <li>
                    <Link onClick={close} to="/blog-details" className="text-gray-secondary hover:text-primary-main text-sm">
                      Blog Details
                    </Link>
                  </li>
                </ul>
              ),
            },
          ]}
        />

        <Link
          onClick={close}
          to="/contact"
          className="text-gray-primary mt-4 block text-base font-medium"
        >
          Contact
        </Link>

        <div className="mt-6 rounded-xl border border-gray-300 p-4">
          {isAuthenticated ? (
            <div className="mb-3 flex items-center gap-3">
              <div className="bg-primary-lighter size-11 shrink-0 overflow-hidden rounded-full">
                <img src={getImageSrc(profile.avatar)} alt={profile.firstName} className="size-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-gray-primary text-sm font-semibold">
                  {profile.firstName} {profile.lastName}
                </p>
                <Link onClick={close} to="/account" className="text-primary-main text-xs font-medium">
                  View Dashboard
                </Link>
              </div>
              <button
                onClick={() => {
                  setLogoutModalOpen(true);
                  close();
                }}
                className="text-error-dark cursor-pointer"
                aria-label="Log out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Link
                onClick={close}
                to="/login"
                className="bg-primary-main text-success-light flex h-10 items-center justify-center rounded-full text-sm font-medium"
              >
                Log In
              </Link>
              <Link
                onClick={close}
                to="/register"
                className="border-gray-tertiary/32 text-gray-primary flex h-10 items-center justify-center rounded-full border text-sm font-medium"
              >
                Register
              </Link>
            </div>
          )}
          <div className="text-gray-secondary flex items-center gap-2 text-sm">
            <Phone className="size-4" /> (480) 555-0103
          </div>
          <div className="text-gray-secondary mt-2 flex items-center gap-2 text-sm">
            <Mail className="size-4" /> help@company.com
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-gray-primary mb-3 text-sm font-bold">Follow us</h4>
          <div className="flex items-center gap-3">
            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-secondary hover:text-primary-main hover:border-primary-main flex size-9 items-center justify-center rounded-full border border-gray-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
