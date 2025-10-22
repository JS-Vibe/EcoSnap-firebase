
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { auth } from '@/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign Out Error", error);
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <View style={styles.content}>
        {user ? (
          <Pressable style={styles.button} onPress={handleSignOut}>
            <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
          </Pressable>
        ) : (
          <View style={styles.signInContainer}>
            <Link href="/(auth)/sign-in" asChild>
              <Pressable style={styles.button}>
                <ThemedText style={styles.buttonText}>Sign In</ThemedText>
              </Pressable>
            </Link>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable style={[styles.button, styles.signUpButton]}>
                <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
              </Pressable>
            </Link>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  signInContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButton: {
    backgroundColor: Colors.light.tabIconDefault,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
