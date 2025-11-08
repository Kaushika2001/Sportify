// Details Screen - Show item details

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addFavourite, removeFavourite } from '../redux/slices/favouritesSlice';
import { sportsAPI } from '../services/sportsAPI';
import { lightTheme, darkTheme } from '../theme';
import { Sport, League, Team } from '../types';

type TabType = 'info' | 'matches' | 'teams' | 'players';

const DetailsScreen = ({ route, navigation }: any) => {
  const { item, type } = route.params;
  
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const itemId = (item as any).idSport || (item as any).idLeague || (item as any).idTeam;
  
  const isFavourite = favourites.some((fav: any) => {
    const favId = fav.idSport || fav.idLeague || fav.idTeam;
    return favId === itemId;
  });

  useEffect(() => {
    if (activeTab === 'matches' && type === 'league') {
      loadMatches();
    } else if (activeTab === 'teams' && type === 'league') {
      loadTeams();
    } else if (activeTab === 'players' && type === 'team') {
      loadPlayers();
    }
  }, [activeTab]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const league = item as League;
      const [nextEvents, pastEvents] = await Promise.all([
        sportsAPI.getNextEvents(league.idLeague),
        sportsAPI.getLastEvents(league.idLeague),
      ]);
      const allMatches = [...(nextEvents || []), ...(pastEvents || [])];
      setMatches(allMatches.slice(0, 10)); // Show max 10 matches
    } catch (error) {
      console.error('Error loading matches:', error);
    }
    setLoading(false);
  };

  const loadTeams = async () => {
    setLoading(true);
    try {
      const league = item as League;
      const teamsData = await sportsAPI.getTeamsByLeague(league.strLeague);
      setTeams(teamsData || []);
    } catch (error) {
      console.error('Error loading teams:', error);
    }
    setLoading(false);
  };

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const team = item as Team;
      const playersData = await sportsAPI.getPlayersByTeam(team.idTeam);
      setPlayers(playersData || []);
    } catch (error) {
      console.error('Error loading players:', error);
    }
    setLoading(false);
  };

  const handleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(itemId));
    } else {
      dispatch(addFavourite(item));
    }
  };

  const renderContent = () => {
    if (type === 'sport') {
      const sport = item as Sport;
      return (
        <>
          <Text style={[styles.title, { color: theme.colors.text }]}>{sport.strSport}</Text>
          {sport.strSportThumb && (
            <Image source={{ uri: sport.strSportThumb }} style={styles.image} resizeMode="cover" />
          )}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Format</Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              {sport.strFormat || 'N/A'}
            </Text>
          </View>
          {sport.strSportDescription && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {sport.strSportDescription}
              </Text>
            </View>
          )}
        </>
      );
    } else if (type === 'league') {
      const league = item as League;
      return (
        <>
          <Text style={[styles.title, { color: theme.colors.text }]}>{league.strLeague}</Text>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sport</Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              {league.strSport}
            </Text>
          </View>
          {league.strLeagueAlternate && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Alternate Name</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {league.strLeagueAlternate}
              </Text>
            </View>
          )}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>League ID</Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              {league.idLeague}
            </Text>
          </View>
        </>
      );
    } else if (type === 'team') {
      const team = item as Team;
      return (
        <>
          <Text style={[styles.title, { color: theme.colors.text }]}>{team.strTeam}</Text>
          {team.strTeamBadge && (
            <Image source={{ uri: team.strTeamBadge }} style={styles.image} resizeMode="contain" />
          )}
          {team.strTeamBanner && (
            <Image source={{ uri: team.strTeamBanner }} style={styles.banner} resizeMode="cover" />
          )}
          {team.strDescriptionEN && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {team.strDescriptionEN}
              </Text>
            </View>
          )}
          {team.intFormedYear && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Formed Year</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {team.intFormedYear}
              </Text>
            </View>
          )}
          {team.strStadium && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Stadium</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {team.strStadium}
              </Text>
            </View>
          )}
          {team.strLocation && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Location</Text>
              <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
                {team.strLocation}
              </Text>
            </View>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      {type === 'league' && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'info' ? '#FFF' : theme.colors.text }]}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'matches' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('matches')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'matches' ? '#FFF' : theme.colors.text }]}>Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'teams' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('teams')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'teams' ? '#FFF' : theme.colors.text }]}>Teams</Text>
          </TouchableOpacity>
        </View>
      )}

      {type === 'team' && (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'info' ? '#FFF' : theme.colors.text }]}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'players' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setActiveTab('players')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'players' ? '#FFF' : theme.colors.text }]}>Players</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {activeTab === 'info' ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderContent()}
          
          <TouchableOpacity
            style={[
              styles.favouriteButton,
              { backgroundColor: isFavourite ? theme.colors.error : theme.colors.primary },
            ]}
            onPress={handleFavourite}
          >
            <Text style={styles.favouriteButtonText}>
              {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : activeTab === 'matches' ? (
        <FlatList
          data={matches}
          keyExtractor={(item, index) => item.idEvent || `match-${index}`}
          renderItem={({ item }) => (
            <View style={[styles.matchCard, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.matchDate, { color: theme.colors.textSecondary }]}>
                {item.dateEvent} - {item.strTime || 'TBD'}
              </Text>
              <Text style={[styles.matchTitle, { color: theme.colors.text }]}>
                {item.strHomeTeam} vs {item.strAwayTeam}
              </Text>
              {item.intHomeScore && item.intAwayScore && (
                <Text style={[styles.matchScore, { color: theme.colors.primary }]}>
                  Score: {item.intHomeScore} - {item.intAwayScore}
                </Text>
              )}
              <Text style={[styles.matchStatus, { color: theme.colors.textSecondary }]}>
                {item.strStatus || 'Scheduled'}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No matches available
            </Text>
          }
        />
      ) : activeTab === 'teams' ? (
        <FlatList
          data={teams}
          keyExtractor={(item, index) => item.idTeam || `team-${index}`}
          renderItem={({ item }) => (
            <View style={[styles.teamCard, { backgroundColor: theme.colors.card }]}>
              {item.strTeamBadge && (
                <Image source={{ uri: item.strTeamBadge }} style={styles.teamBadge} resizeMode="contain" />
              )}
              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, { color: theme.colors.text }]}>
                  {item.strTeam}
                </Text>
                {item.strStadium && (
                  <Text style={[styles.teamDetail, { color: theme.colors.textSecondary }]}>
                    Stadium: {item.strStadium}
                  </Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No teams available
            </Text>
          }
        />
      ) : activeTab === 'players' ? (
        <FlatList
          data={players}
          keyExtractor={(item, index) => item.idPlayer || `player-${index}`}
          renderItem={({ item }) => (
            <View style={[styles.playerCard, { backgroundColor: theme.colors.card }]}>
              {item.strThumb && (
                <Image source={{ uri: item.strThumb }} style={styles.playerImage} resizeMode="cover" />
              )}
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, { color: theme.colors.text }]}>
                  {item.strPlayer}
                </Text>
                {item.strPosition && (
                  <Text style={[styles.playerDetail, { color: theme.colors.textSecondary }]}>
                    Position: {item.strPosition}
                  </Text>
                )}
                {item.strNationality && (
                  <Text style={[styles.playerDetail, { color: theme.colors.textSecondary }]}>
                    Nationality: {item.strNationality}
                  </Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No players available
            </Text>
          }
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  favouriteButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  favouriteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchCard: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  matchDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  matchScore: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  matchStatus: {
    fontSize: 12,
  },
  teamCard: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  teamBadge: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  teamDetail: {
    fontSize: 12,
  },
  playerCard: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  playerDetail: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

export default DetailsScreen;
