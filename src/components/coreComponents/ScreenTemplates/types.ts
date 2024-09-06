import React from 'react';

type ScreenBackButtonProp = {
  nav?: () => void;
  title?: string | null;
  children: React.ReactNode;
};

export type {ScreenBackButtonProp};
