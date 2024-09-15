import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Text, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User Profile</ThemedText>
      </ThemedView>
      
      <View style={styles.profileInfo}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>
      </View>
      
      <ThemedText>This is your profile. You can view and edit your information here.</ThemedText>
      
      <Collapsible title="Personal Information">
        <ThemedText>
          Name: John Doe
        </ThemedText>
        <ThemedText>
          Email: johndoe@example.com
        </ThemedText>
      </Collapsible>

      <Collapsible title="Settings">
        <ThemedText>
          You can change your preferences and update settings from this section.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileDetails: {
    marginLeft: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#808080',
  },
});
