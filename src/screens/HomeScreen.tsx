// Home Screen - Display sports data

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchSportsStart, fetchSportsSuccess, fetchLeaguesSuccess, fetchSportsFailure } from '../redux/slices/sportsSlice';
import { addFavourite, removeFavourite } from '../redux/slices/favouritesSlice';
import { sportsAPI } from '../services/sportsAPI';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { lightTheme, darkTheme } from '../theme';
import { Sport, League } from '../types';

const HomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'sports' | 'leagues'>('sports');
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { sports, leagues, isLoading, error } = useSelector((state: RootState) => state.sports);
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(fetchSportsStart());
    try {
      const [sportsData, leaguesData] = await Promise.all([
        sportsAPI.getAllSports(),
        sportsAPI.getAllLeagues(),
      ]);
      console.log('Sports loaded:', sportsData?.length || 0);
      console.log('First few sports:', sportsData?.slice(0, 5).map((s: any) => s.strSport));
      console.log('Leagues loaded:', leaguesData?.length || 0);
      dispatch(fetchSportsSuccess(sportsData || []));
      dispatch(fetchLeaguesSuccess(leaguesData?.slice(0, 200) || [])); // Show more leagues
    } catch (error) {
      console.error('Error loading sports data:', error);
      dispatch(fetchSportsFailure('Failed to load data'));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const isFavourite = (item: Sport | League) => {
    const itemId = (item as any).idSport || (item as any).idLeague;
    return favourites.some((fav: any) => {
      const favId = fav.idSport || fav.idLeague;
      return favId === itemId;
    });
  };

  const handleFavourite = (item: Sport | League) => {
    const itemId = (item as any).idSport || (item as any).idLeague;
    if (isFavourite(item)) {
      dispatch(removeFavourite(itemId));
    } else {
      dispatch(addFavourite(item));
    }
  };

  const handleItemPress = (item: Sport | League) => {
    const type = (item as any).idSport ? 'sport' : 'league';
    navigation.navigate('Details', { item, type });
  };

  // Map sport names to their image URLs
  const getSportImageBySportName = (sportName: string): string | undefined => {
    const sportImageMap: { [key: string]: string } = {
      'Soccer': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
      'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
      'American Football': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
      'Ice Hockey': 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800&q=80',
      'Rugby': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
      'Tennis': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80',
      'Cricket': 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
      'Baseball': 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
      'Golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
      'Motorsport': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      'Fighting': 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=800&q=80',
      'Handball': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
      'Cycling': 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
      'Volleyball': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
      'Darts': 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80',
      'Snooker': 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80',
      'Badminton': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
      'Table Tennis': 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80',
    };
    
    return sportImageMap[sportName];
  };

  const renderItem = ({ item }: { item: Sport | League }) => {
    const isSport = (item as any).idSport !== undefined;
    const title = isSport ? (item as Sport).strSport : (item as League).strLeague;
    
    // Create better descriptions
    let description: string;
    if (isSport) {
      description = (item as Sport).strSportDescription || (item as Sport).strFormat;
    } else {
      const league = item as League;
      // Use league description if available, otherwise create one
      if (league.strDescriptionEN) {
        description = league.strDescriptionEN;
      } else {
        // Create a descriptive text based on league name and sport
        const sport = league.strSport;
        const leagueName = league.strLeague;
        
        if (leagueName.toLowerCase().includes('premier')) {
          description = `Top-tier professional ${sport} league with elite teams competing for the championship`;
        } else if (leagueName.toLowerCase().includes('championship')) {
          description = `Second-tier ${sport} competition featuring competitive teams`;
        } else if (leagueName.toLowerCase().includes('world cup') || leagueName.toLowerCase().includes('champions')) {
          description = `International ${sport} competition featuring the world's best teams`;
        } else if (leagueName.toLowerCase().includes('division') || leagueName.toLowerCase().includes('league')) {
          description = `Professional ${sport} league with teams competing for glory`;
        } else {
          description = `${sport} competition - ${league.strLeagueAlternate || 'Professional league'}`;
        }
      }
    }
    
    // Get image URL for both sports and leagues
    let imageUrl: string | undefined;
    let isLogo = false;
    
    if (isSport) {
      imageUrl = (item as Sport).strSportThumb;
    } else {
      // For leagues, prioritize league badge/logo, then sport image as fallback
      const league = item as League;
      const leagueBadge = league.strBadge || league.strLogo || league.strBanner;
      
      if (leagueBadge) {
        imageUrl = leagueBadge;
        isLogo = true; // Mark as logo to display with background
      } else {
        // If no league badge available, use sport image
        imageUrl = getSportImageBySportName(league.strSport);
      }
    }

    // Assign status for leagues
    const getStatus = (): 'Active' | 'Upcoming' | 'Popular' | undefined => {
      if (isSport) return undefined; // No status for sports
      
      const league = item as League;
      const leagueName = league.strLeague.toLowerCase();
      
      // Popular leagues
      const popularLeagues = ['premier league', 'nba', 'nfl', 'la liga', 'champions league', 'serie a', 'bundesliga', 'mlb', 'nhl'];
      if (popularLeagues.some(name => leagueName.includes(name))) {
        return 'Popular';
      }
      
      // Upcoming leagues (typically lower divisions or smaller leagues)
      const upcomingKeywords = ['championship', 'league two', 'league one', 'segunda', 'division 2'];
      if (upcomingKeywords.some(keyword => leagueName.includes(keyword))) {
        return 'Upcoming';
      }
      
      // Default to Active for other leagues
      return 'Active';
    };

    return (
      <Card
        title={title}
        description={description}
        imageUrl={imageUrl}
        isLogo={isLogo}
        status={getStatus()}
        onPress={() => handleItemPress(item)}
        showFavourite
        isFavourite={isFavourite(item)}
        onFavouritePress={() => handleFavourite(item)}
      />
    );
  };

  if (isLoading && sports.length === 0) {
    return <Loading message="Loading sports data..." />;
  }

  const dataToDisplay = activeTab === 'sports' ? sports : leagues;
  
  console.log('Current tab:', activeTab);
  console.log('Sports in state:', sports.length);
  console.log('Leagues in state:', leagues.length);
  console.log('Displaying:', dataToDisplay.length, 'items');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'sports' && { backgroundColor: theme.colors.primary },
            { borderColor: theme.colors.border },
          ]}
          onPress={() => setActiveTab('sports')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'sports' ? '#FFFFFF' : theme.colors.text },
            ]}
          >
            Sports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'leagues' && { backgroundColor: theme.colors.primary },
            { borderColor: theme.colors.border },
          ]}
          onPress={() => setActiveTab('leagues')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'leagues' ? '#FFFFFF' : theme.colors.text },
            ]}
          >
            Leagues
          </Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
            onPress={loadData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={dataToDisplay}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            const id = (item as any).idSport || (item as any).idLeague;
            return id ? id.toString() : `item-${index}`;
          }}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No data available
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
  },
});

export default HomeScreen;
