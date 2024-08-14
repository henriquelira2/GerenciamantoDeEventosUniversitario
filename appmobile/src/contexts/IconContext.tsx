/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState } from "react";

type IconContextData = {
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
};

const IconContext = createContext<IconContextData>({
  selectedItem: null,
  setSelectedItem: () => {},
});

export const IconProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <IconContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </IconContext.Provider>
  );
};

export const useIcon = () => useContext(IconContext);
