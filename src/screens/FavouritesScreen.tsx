// Favourites Screen

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFavourite, setFavourites } from '../redux/slices/favouritesSlice';
import { storageService } from '../utils/storage';
import Card from '../components/Card';
import { lightTheme, darkTheme } from '../theme';

const FavouritesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    // Save favourites whenever they change
    storageService.saveFavourites(favourites);
  }, [favourites]);

  const loadFavourites = async () => {
    const savedFavourites = await storageService.getFavourites();
    if (savedFavourites.length > 0) {
      dispatch(setFavourites(savedFavourites));
    }
  };

  const handleRemoveFavourite = (item: any) => {
    const itemId = item.idSport || item.idLeague || item.idTeam;
    dispatch(removeFavourite(itemId));
  };

  const handleItemPress = (item: any) => {
    const type = item.idSport ? 'sport' : item.idLeague ? 'league' : 'team';
    navigation.navigate('Details', { item, type });
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSport = item.idSport !== undefined;
    const isLeague = item.idLeague !== undefined;
    const isTeam = item.idTeam !== undefined;

    const title = isSport ? item.strSport : isLeague ? item.strLeague : item.strTeam;
    const description = isSport 
      ? item.strFormat 
      : isLeague 
        ? `Sport: ${item.strSport}` 
        : item.strStadium || 'Team';
    const imageUrl = isSport ? item.strSportThumb : isTeam ? item.strTeamBadge : undefined;

    return (
      <Card
        title={title}
        description={description}
        imageUrl={imageUrl}
        onPress={() => handleItemPress(item)}
        showFavourite
        isFavourite={true}
        onFavouritePress={() => handleRemoveFavourite(item)}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            No favourites yet
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
            Add items from the Home screen
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.idSport || item.idLeague || item.idTeam}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});

export default FavouritesScreen;
