// API service for TheSportsDB

import axios from 'axios';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

// Fallback sports data with high-quality images from Unsplash
const fallbackSports = [
  { idSport: '102', strSport: 'Soccer', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', strSportDescription: 'The world\'s most popular sport played by two teams of eleven players' },
  { idSport: '103', strSport: 'Basketball', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', strSportDescription: 'Fast-paced team sport played on a court with a hoop' },
  { idSport: '104', strSport: 'American Football', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80', strSportDescription: 'Strategic team sport popular in North America' },
  { idSport: '105', strSport: 'Ice Hockey', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800&q=80', strSportDescription: 'High-speed contact sport played on ice with pucks and sticks' },
  { idSport: '106', strSport: 'Rugby', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', strSportDescription: 'Physical team sport originating from England' },
  { idSport: '107', strSport: 'Tennis', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80', strSportDescription: 'Racket sport played individually or in doubles' },
  { idSport: '108', strSport: 'Cricket', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80', strSportDescription: 'Bat-and-ball game popular in Commonwealth nations' },
  { idSport: '109', strSport: 'Baseball', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80', strSportDescription: 'America\'s pastime played with bat, ball, and bases' },
  { idSport: '110', strSport: 'Golf', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80', strSportDescription: 'Precision club-and-ball sport played on courses' },
  { idSport: '111', strSport: 'Motorsport', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', strSportDescription: 'High-speed racing with cars, bikes, and other vehicles' },
  { idSport: '112', strSport: 'Fighting', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80', strSportDescription: 'Combat sports including MMA, Boxing, and Martial Arts' },
  { idSport: '113', strSport: 'Handball', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80', strSportDescription: 'Fast-paced team sport combining elements of basketball and soccer' },
  { idSport: '114', strSport: 'Cycling', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', strSportDescription: 'Competitive racing on bicycles across various terrains' },
  { idSport: '115', strSport: 'Volleyball', strFormat: 'TeamvsTeam', strSportThumb: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80', strSportDescription: 'Team sport played with a ball over a net' },
  { idSport: '116', strSport: 'Darts', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80', strSportDescription: 'Precision throwing sport targeting a circular board' },
  { idSport: '117', strSport: 'Snooker', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80', strSportDescription: 'Cue sport played on a large table with colored balls' },
  { idSport: '118', strSport: 'Badminton', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80', strSportDescription: 'Fast racket sport played with a shuttlecock' },
  { idSport: '119', strSport: 'Table Tennis', strFormat: 'EventSport', strSportThumb: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80', strSportDescription: 'Quick reflexes sport also known as ping pong' },
];

export const sportsAPI = {
  // Get all sports
  getAllSports: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all_sports.php`);
      const apiSports = response.data.sports || [];
      console.log('API sports data:', apiSports.length);
      
      // If API returns limited data, use fallback
      const sports = apiSports.length > 1 ? apiSports : fallbackSports;
      console.log('Returning sports:', sports.length);
      return sports;
    } catch (error) {
      console.error('Error fetching sports, using fallback:', error);
      return fallbackSports;
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

  // Get teams by sport
  getTeamsBySport: async (sport: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search_all_teams.php?s=${sport}`);
      return response.data.teams || [];
    } catch (error) {
      console.error('Error fetching teams by sport:', error);
      throw error;
    }
  },

  // Get league details
  getLeagueDetails: async (leagueId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookupleague.php?id=${leagueId}`);
      return response.data.leagues?.[0] || null;
    } catch (error) {
      console.error('Error fetching league details:', error);
      throw error;
    }
  },

  // Get next 5 events by league
  getNextEvents: async (leagueId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`);
      return response.data.events || [];
    } catch (error) {
      console.error('Error fetching next events:', error);
      return [];
    }
  },

  // Get last 5 events by league
  getLastEvents: async (leagueId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/eventspastleague.php?id=${leagueId}`);
      return response.data.events || [];
    } catch (error) {
      console.error('Error fetching past events:', error);
      return [];
    }
  },

  // Get all players by team
  getPlayersByTeam: async (teamId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup_all_players.php?id=${teamId}`);
      return response.data.player || [];
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  },

  // Search players by name
  searchPlayers: async (playerName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/searchplayers.php?p=${playerName}`);
      return response.data.player || [];
    } catch (error) {
      console.error('Error searching players:', error);
      return [];
    }
  },
};
