import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiSearch } from "react-icons/fi";
import { FiFeather } from "react-icons/fi";

import { Button } from "@/components/common";

const sidebarLinks = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/search", label: "Link 2", icon: FiSearch }
];

export const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <aside className="flex w-16 flex-col items-center justify-between bg-slate-950 py-4 text-white lg:w-[250px] lg:items-start">
      <div className="flex w-full flex-col items-center lg:items-start lg:px-2">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 lg:ml-3" />
        </Link>

        <nav className="mt-8 space-y-2">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center rounded-full p-3 text-sm transition-all hover:bg-slate-700 lg:space-x-4 lg:pr-8",
                {
                  "text-white": pathname === href,
                  "text-gray-200": pathname !== href
                }
              )}
            >
              <Icon size={24} />
              <span
                className={clsx("hidden text-xl lg:block", {
                  "font-semibold": pathname === href
                })}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 w-full px-2">
          <Button href="/tweet/create" size="lg" fullWidth className="px-0">
            <FiFeather size={24} className="lg:hidden" />
            <span className="ml-2 hidden lg:block">Tweet</span>
          </Button>
        </div>
      </div>

      <div className="flex cursor-default items-center rounded-full p-3 transition-all hover:bg-slate-700 lg:w-full lg:space-x-4">
        <img src="/images/pfp.jpg" alt="Profile" className="block h-10 w-10 rounded-full" />
        <div className="hidden lg:block">
          <p className="text-lg font-semibold">oomf</p>
          <p className="text-sm text-gray-300">@voodoodeedoo</p>
        </div>
      </div>
    </aside>
  );
};
