export interface IEvent {
  id: string;
  name: string;
  week: number;
}

export interface IMatchSchedule extends Array<IMatch> {}

export interface IMatch {
  id: string;
  matchType: "qm" | "ef" | "qf" | "sf" | "f";
  matchNumber: number;
  alliances: {
    red: Array<number>;
    blue: Array<number>;
  };
  hasData: Array<boolean>;
}

export interface ITeamData {
  id: string;
  teamNumber: number;
  taxi: boolean;
  autoLow: number;
  autoHigh: number;
  telopLow: number;
  telopHigh: number;
  defense: number;
  climb: number;
  notes: string;
}
