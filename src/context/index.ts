import React from "react";
// this file just defines some contexts (global states), mostly boilerplate code
// because it's named index.js we can import this file as './context'

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
