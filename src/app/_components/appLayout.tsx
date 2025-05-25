'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Home, Text, AudioLines, Menu } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Diagrams', href: '/diagram', icon: Text },
  { title: 'Text Editor', href: '/text-editor', icon: Text },
  { title: 'Voice Recorder', href: '/voice-recorder', icon: AudioLines },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const memoizedNavItems = useMemo(
    () =>
      navItems.map(item => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton asChild>
              <a className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )),
    [],
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar className="hidden md:block">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">My App</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{memoizedNavItems}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <p className="text-sm text-muted-foreground">v1.0.0</p>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Sidebar Trigger */}
        <div className="fixed left-4 top-4 z-50 md:hidden">
          <SidebarTrigger>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
