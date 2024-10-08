"use client";

import React, { createContext, useContext } from 'react';

// Create the context
const PageContext = createContext();

// Custom hook for using the context
export const usePageContext = () => {
    return useContext(PageContext);
  };
// Provider component
export const PageProvider = ({ children, page, contact }) => (
  <PageContext.Provider value={{ page, contact }}>
    {children}
  </PageContext.Provider>
);
