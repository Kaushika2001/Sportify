// Redux slice for favourites
// Student Index: 225024

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouritesState, Sport, League, Team } from '../../types';

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Sport | League | Team>) => {
      const itemId = (action.payload as any).idSport || (action.payload as any).idLeague || (action.payload as any).idTeam;
      const exists = state.items.find((item: any) => {
        const existingId = item.idSport || item.idLeague || item.idTeam;
        return existingId === itemId;
      });
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: any) => {
        const itemId = item.idSport || item.idLeague || item.idTeam;
        return itemId !== action.payload;
      });
    },
    setFavourites: (state, action: PayloadAction<(Sport | League | Team)[]>) => {
      state.items = action.payload;
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavourite, removeFavourite, setFavourites, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
