import React from "react";

export const SelectedWeek = React.createContext<any>({
  week: 1,
  setWeek: () => {},
});
export const SelectedEvent = React.createContext<any>({
  selectedEvent: 1,
  setSelectedEvent: () => {},
});
export const HasData = React.createContext<any>({
  hasData: [],
  setHasData: () => {},
});
