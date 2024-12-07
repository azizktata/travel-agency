"use client";

import React, { createContext, useContext } from 'react';

const PageContext = createContext();

export const usePageContext = () => {
    return useContext(PageContext);
  };
export const PageProvider = ({ children, page, contact }) => (
  <PageContext.Provider value={{ page, contact }}>
    {children}
  </PageContext.Provider>
);

