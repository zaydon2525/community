import { Tabs } from 'expo-router';
import { Home, Calendar, Users, BookOpen } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Planning',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Élèves',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="homework"
        options={{
          title: 'Devoirs',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}