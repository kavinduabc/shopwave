
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  Heart,
  UserRound,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];

const categories = [
  { label: "Electronics", href: "/categories/electronics" },
  { label: "Fashion", href: "/categories/fashion" },
  { label: "Home & Living", href: "/categories/home-living" },
  { label: "Accessories", href: "/categories/accessories" },
];

export default function SiteHeader() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Search products using the URL query string.
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main header row */}
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                    className="text-violet-600 hover:bg-violet-50 hover:text-violet-700"
                  />
                }
              >
                <Menu className="size-6" />
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-violet-700">ShopWave</SheetTitle>
                  <SheetDescription className="text-slate-500">
                    Discover products you love.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-3 font-semibold text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="px-3 py-3 font-semibold text-fuchsia-700">
                    Categories
                  </div>

                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg py-2 pl-6 text-sm font-medium text-fuchsia-700 hover:bg-fuchsia-50 hover:text-fuchsia-900"
                    >
                      {category.label}
                    </Link>
                  ))}

                  <div className="my-3 border-t" />

                  <Link
                    href="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <Heart className="size-5 text-rose-500" />
                    Wishlist
                  </Link>

                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-sky-600 hover:bg-sky-50"
                  >
                    <UserRound className="size-5 text-sky-500" />
                    My Account
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-emerald-600 hover:bg-emerald-50"
                  >
                    <ShoppingCart className="size-5 text-emerald-500" />
                    Shopping Cart
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="ShopWave home"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-500 text-white shadow-md shadow-violet-200">
              <ShoppingBag className="size-7 drop-shadow-sm" />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-indigo-700 sm:text-2xl">
              Shop<span className="bg-gradient-to-r from-fuchsia-600 to-rose-500 bg-clip-text text-transparent">Wave</span>
            </span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="mx-4 hidden max-w-xl flex-1 md:flex"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-fuchsia-500" />

              <Input
                type="search"
                placeholder="Search products, brands and more..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
                className="h-11 rounded-l-full rounded-r-none border-fuchsia-200 bg-fuchsia-50/40 pl-10 text-indigo-900 placeholder:text-fuchsia-400 focus-visible:border-fuchsia-400 focus-visible:ring-fuchsia-200"
              />
            </div>

            <Button
              type="submit"
              className="h-11 rounded-l-none rounded-r-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 text-white shadow-sm hover:from-violet-700 hover:to-fuchsia-700"
            >
              Search
            </Button>
          </form>

          {/* User actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden text-rose-500 hover:bg-rose-50 hover:text-rose-600 sm:inline-flex"
              render={<Link href="/wishlist" aria-label="Wishlist" />}
            >
              <Heart className="size-5" />
            </Button>

            {/* Account dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Account menu"
                    className="hidden text-sky-500 hover:bg-sky-50 hover:text-sky-600 sm:inline-flex"
                  />
                }
              >
                <UserRound className="size-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem render={<Link href="/login" />}>
                  Login
                </DropdownMenuItem>

                <DropdownMenuItem render={<Link href="/register" />}>
                  Create Account
                </DropdownMenuItem>

                <DropdownMenuItem render={<Link href="/orders" />}>
                  My Orders
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shopping cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
              render={<Link href="/cart" aria-label="Shopping cart, 3 items" />}
            >
              <ShoppingCart className="size-6" />
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-[11px] font-bold text-white">
                  3
                </span>
            </Button>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden h-12 items-center justify-center gap-8 lg:flex"
        >
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-indigo-700 transition-colors hover:text-fuchsia-600"
            >
              {link.label}
            </Link>
          ))}

          {/* Categories dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                      className="gap-1 text-sm font-semibold text-fuchsia-700 hover:bg-fuchsia-50 hover:text-fuchsia-600"
                />
              }
            >
                Categories
                <ChevronDown className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.href}
                  render={<Link href={category.href} />}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-rose-700 transition-colors hover:text-rose-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile search */}
        <form onSubmit={handleSearch} role="search" className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-fuchsia-500" />

            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
              className="h-11 rounded-full border-fuchsia-200 bg-fuchsia-50/40 pl-10 pr-16 text-indigo-900 placeholder:text-fuchsia-400 focus-visible:border-fuchsia-400 focus-visible:ring-fuchsia-200"
            />

            <Button
              type="submit"
              variant="ghost"
              size="icon"
              aria-label="Submit search"
              className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-fuchsia-600 hover:bg-fuchsia-50"
            >
              <Search className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </header>
  );
}
