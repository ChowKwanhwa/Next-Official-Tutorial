'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { ComponentType, SVGProps } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Define the type for our icon components
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// Map of links to display in the side navigation.
const links = [
  { name: 'Home', href: '/dashboard', iconName: 'HomeIcon' },
  { name: 'Invoices', href: '/dashboard/invoices', iconName: 'DocumentDuplicateIcon' },
  { name: 'Customers', href: '/dashboard/customers', iconName: 'UserGroupIcon' },
];

const iconComponents: { [key: string]: IconType } = {
  HomeIcon: dynamic(() => import('@heroicons/react/24/outline/HomeIcon')),
  DocumentDuplicateIcon: dynamic(() => import('@heroicons/react/24/outline/DocumentDuplicateIcon')),
  UserGroupIcon: dynamic(() => import('@heroicons/react/24/outline/UserGroupIcon')),
};

export default function NavLinks() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = iconComponents[link.iconName];
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            {mounted && LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}