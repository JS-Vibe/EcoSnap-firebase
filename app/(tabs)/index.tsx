
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

const features = [
  {
    icon: 'camera',
    title: 'Real-time Scanning',
    description: 'Identify anything in real-time using your camera.',
  },
  {
    icon: 'bug',
    title: 'Bugs & Insects',
    description: 'Identify thousands of bugs and insects.',
  },
  {
    icon: 'leaf',
    title: 'Plants & Trees',
    description: 'Identify plants, flowers, and trees.',
  },
  {
    icon: 'paw',
    title: 'Mammals & Scat',
    description: 'Identify mammals and their scat.',
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <FontAwesome size={32} name={icon as any} style={styles.featureIcon} />
    <ThemedText type="subtitle" style={styles.featureTitle}>
      {title}
    </ThemedText>
    <ThemedText style={styles.featureDescription}>{description}</ThemedText>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.title}>Welcome to EcoSnap!</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your guide to the natural world. Snap a photo to identify plants, animals, and more.
        </ThemedText>
        <Pressable style={styles.ctaButton} onPress={() => router.push('/scan')}>
          <ThemedText style={styles.ctaButtonText}>Start Scanning</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>Features</ThemedText>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerContainer: {
    padding: 24,
    backgroundColor: Colors.light.tint,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 24,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureIcon: {
    marginBottom: 12,
    color: Colors.light.tint,
  },
  featureTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  featureDescription: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});
