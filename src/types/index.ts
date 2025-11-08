// Type definitions for the Sportify app

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Sport {
  idSport: string;
  strSport: string;
  strFormat: string;
  strSportThumb?: string;
  strSportDescription?: string;
}

export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
  strBadge?: string;
  strLogo?: string;
  strBanner?: string;
  strDescriptionEN?: string;
}

export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge?: string;
  strTeamBanner?: string;
  strDescriptionEN?: string;
  intFormedYear?: string;
  strStadium?: string;
  strLocation?: string;
}

export interface SportsState {
  sports: Sport[];
  leagues: League[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}

export interface FavouritesState {
  items: (Sport | League | Team)[];
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Details: {
    item: Sport | League | Team;
    type: 'sport' | 'league' | 'team';
  };
};

export type MainTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Profile: undefined;
};
