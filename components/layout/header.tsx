import { Search, HelpCircle, Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { AutoComplete } from '../ui/autocomplete';
import { usePipelineStore } from '@/store/pipelinestore';
import { useBorrowerDetailStore } from '@/store/borrowerDetailsStore';
import { JSX, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const NAV_ITEMS = [
  {
    label: "Borrowers",
    links: [
      {
        name: "All Borrowers",
        href: "#",
        description: "Browse or search all borrower profiles",
      },
      {
        name: "New Applications",
        href: "#",
        description: "Recently submitted borrower requests",
      },
    ],
  },
  {
    label: "Brokers",
    links: [
      {
        name: "Broker List",
        href: "#",
        description: "See all registered brokers",
      },
      {
        name: "Performance Analytics",
        href: "#",
        description: "Approval rates and deal stats",
      },
    ],
  },
  {
    label: "Workflows",
    links: [
      {
        name: "Onboarding Steps",
        href: "#",
        description: "Track onboarding progress and steps",
      },
      {
        name: "Escalations",
        href: "#",
        description: "Review items sent to credit committee",
      },
    ],
  },
];

interface Notification {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, JSX.Element> = {
  bell: <Bell className="h-4 w-4 text-blue-500" />,
  'check-circle': <CheckCircle className="h-4 w-4 text-green-500" />,
  'alert-triangle': <AlertTriangle className="h-4 w-4 text-yellow-500" />,
};

export function Header() {
  const [searchString, setSearchString] = useState("");
  const { getAllBorrowers, loading } = usePipelineStore();
  const { selectBorrower } = useBorrowerDetailStore();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications');
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">DemoApp</h1>
        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            {NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger className="whitespace-nowrap">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 bg-white shadow-md rounded-md w-64">
                  <ul className="space-y-3">
                    {item.links.map((link) => (
                      <li key={link.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block hover:bg-gray-100 p-2 rounded transition-colors whitespace-nowrap"
                          >
                            <div className="text-sm font-medium text-gray-900">
                              {link.name}
                            </div>
                            {link.description && (
                              <div className="text-xs text-muted-foreground">
                                {link.description}
                              </div>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <AutoComplete
            selectedValue={
              getAllBorrowers().length > 0 ? getAllBorrowers()[0].id : ""
            }
            onSelectedValueChange={(value) => {
              const borrower = getAllBorrowers().find(b => b.id === value);
              if (borrower) {
                selectBorrower(borrower);
              }
              setSearchString("");
            }}
            searchValue={searchString}
            onSearchValueChange={(data) => { setSearchString(data) }}
            items={getAllBorrowers().map((borrower) => ({
              value: borrower.id,
              label: borrower.name,
              description: `${borrower.loan_type} - $${borrower.amount.toLocaleString()}`
            }))}
            isLoading={loading}
            emptyMessage="No items found."
            placeholder="Search Borrower ..."
          />

          <Button variant="ghost" size="sm">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Notifications</h3>
              <ul className="space-y-3">
                {notifications.map((n) => (
                  <li key={n.id} className="flex items-start space-x-3">
                    <div>{iconMap[n.icon]}</div>
                    <div>
                      <div className="text-sm font-semibold">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>


        </div>
      </div>
    </header>
  );
}