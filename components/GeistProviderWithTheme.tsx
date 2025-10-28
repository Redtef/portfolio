'use client';

import { GeistProvider } from '@geist-ui/core';
import { useTheme } from 'next-themes';
import React from 'react';

export default function GeistProviderWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <GeistProvider themeType={resolvedTheme as any}>{children}</GeistProvider>
  );
}
