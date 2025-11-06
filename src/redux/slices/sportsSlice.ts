// Redux slice for sports data
// Student Index: 225024

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SportsState, Sport, League, Team } from '../../types';

const initialState: SportsState = {
  sports: [],
  leagues: [],
  teams: [],
  isLoading: false,
  error: null,
};

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    fetchSportsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSportsSuccess: (state, action: PayloadAction<Sport[]>) => {
      state.isLoading = false;
      state.sports = action.payload;
    },
    fetchLeaguesSuccess: (state, action: PayloadAction<League[]>) => {
      state.isLoading = false;
      state.leagues = action.payload;
    },
    fetchTeamsSuccess: (state, action: PayloadAction<Team[]>) => {
      state.isLoading = false;
      state.teams = action.payload;
    },
    fetchSportsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSportsStart,
  fetchSportsSuccess,
  fetchLeaguesSuccess,
  fetchTeamsSuccess,
  fetchSportsFailure,
} = sportsSlice.actions;

export default sportsSlice.reducer;
