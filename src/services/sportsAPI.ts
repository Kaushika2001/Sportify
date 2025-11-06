// API service for TheSportsDB
// Student Index: 225024

import axios from 'axios';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const sportsAPI = {
  // Get all sports
  getAllSports: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all_sports.php`);
      return response.data.sports || [];
    } catch (error) {
      console.error('Error fetching sports:', error);
      throw error;
    }
  },

  // Get all leagues
  getAllLeagues: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all_leagues.php`);
      return response.data.leagues || [];
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  },

  // Search for teams
  searchTeams: async (teamName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchteams.php?t=${teamName}`);
      return response.data.teams || [];
    } catch (error) {
      console.error('Error searching teams:', error);
      throw error;
    }
  },

  // Get teams by league
  getTeamsByLeague: async (leagueName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search_all_teams.php?l=${leagueName}`);
      return response.data.teams || [];
    } catch (error) {
      console.error('Error fetching teams by league:', error);
      throw error;
    }
  },
};
