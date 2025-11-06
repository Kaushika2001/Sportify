// Reusable Card component
// Student Index: 225024

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { lightTheme, darkTheme } from '../theme';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onPress: () => void;
  showFavourite?: boolean;
  isFavourite?: boolean;
  onFavouritePress?: () => void;
}

const { width } = Dimensions.get('window');

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onPress,
  showFavourite = false,
  isFavourite = false,
  onFavouritePress,
}) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.placeholderImage, { backgroundColor: theme.colors.primary }]}>
          <Feather name="activity" size={40} color="#FFFFFF" />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={2}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {showFavourite && (
        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={onFavouritePress}
        >
          <Feather
            name={isFavourite ? 'heart' : 'heart'}
            size={24}
            color={isFavourite ? theme.colors.primary : theme.colors.textSecondary}
            fill={isFavourite ? theme.colors.primary : 'none'}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
});

export default Card;
