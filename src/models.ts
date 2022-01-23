export interface IDataList extends Array<{ team: number; points: number }> {}

export interface IEventTBA {
  // see Event schema at https://www.thebluealliance.com/apidocs/v3
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  district?: { any };
  city?: string;
  state_prov?: string;
  country?: string;
  start_date: string;
  end_date: string;
  year: number;
  short_name?: number;
  event_type_string: string;
  week?: number;
  address?: string;
  postal_code?: string;
  gmaps_place_id?: string;
  gmaps_url?: string;
  lat?: number;
  lng?: number;
  location_name?: string;
  timezone?: string;
  website?: string;
  first_event_id?: string;
  first_event_code?: string;
}

export interface IMatchTBA {
  // see Match schema at https://www.thebluealliance.com/apidocs/v3
  key: string;
  comp_level: string;
  set_number: number;
  match_number: number;
  alliances?: {
    red?: IMatchAlliance;
    blue?: IMatchAlliance;
  };
  winning_alliance?: string;
  event_key: string;
  time?: number;
  actual_time?: number;
  predicted_time?: number;
  post_result_time?: number;
  score_breakdown?: { any };
  videos?: Array<any>;
}

export interface IEvent {
  id: string;
  name: string;
  location?: string;
  start_date?: string;
  week: number;
  matches: IMatchSchedule;
}

export interface IMatchSchedule extends Array<IMatch> {}

export interface IMatch {
  id: string;
  matchType: "qm" | "ef" | "qf" | "sf" | "f";
  matchNumber: number;
  time?: number;
  winning_alliance?: "red" | "blue";
  isVerified: boolean;
  isAllDataEntered: boolean;
  isDataUploaded: boolean;
  alliances: {
    red: IMatchAlliance;
    blue: IMatchAlliance;
  };
}

export interface IMatchAlliance {
  score?: number;
  teams: Array<number>;
  data: Array<ITeamData>; 
}

export interface ITeamData {
  id: string;
  teamNumber: number;
  taxi: boolean;
  autoLow: number;
  autoHigh: number;
  telopLow: number;
  telopHigh: number;
  climb: number;
}
