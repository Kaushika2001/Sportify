// Details Screen - Show item details
// Student Index: 225024

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addFavourite, removeFavourite } from '../redux/slices/favouritesSlice';
import { lightTheme, darkTheme } from '../theme';
import { Sport, League, Team } from '../types';

const DetailsScreen = ({ route, navigation }: any) => {
  const { item, type } = route.params;
  
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const itemId = (item as any).idSport || (item as any).idLeague || (item as any).idTeam;
  
  const isFavourite = favourites.some((fav: any) => {
    const favId = fav.idSport || fav.idLeague || fav.idTeam;
    return favId === itemId;
  });

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
});

export default DetailsScreen;
