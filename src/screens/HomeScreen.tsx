// Home Screen - Display sports data
// Student Index: 225024

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
      dispatch(fetchSportsSuccess(sportsData));
      dispatch(fetchLeaguesSuccess(leaguesData.slice(0, 50))); // Limit to 50 leagues
    } catch (error) {
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

  const renderItem = ({ item }: { item: Sport | League }) => {
    const isSport = (item as any).idSport !== undefined;
    const title = isSport ? (item as Sport).strSport : (item as League).strLeague;
    const description = isSport 
      ? (item as Sport).strFormat 
      : `Sport: ${(item as League).strSport}`;
    const imageUrl = isSport ? (item as Sport).strSportThumb : undefined;

    return (
      <Card
        title={title}
        description={description}
        imageUrl={imageUrl}
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
          keyExtractor={(item) => (item as any).idSport || (item as any).idLeague}
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
