import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Users, 
  Calendar,
  MessageCircle,
  Star,
  ArrowRight,
  Briefcase,
  BookOpen,
  GraduationCap,
  Plus
} from 'lucide-react-native';
import NotificationCenter from '@/components/NotificationCenter';

export default function HomeScreen() {
  const [showNotifications, setShowNotifications] = useState(false);

  const quickStats = [
    { label: 'Offres d\'emploi', value: '142', icon: TrendingUp, color: '#007BFF' },
    { label: 'Écoles privées', value: '89', icon: Users, color: '#FF6F00' },
    { label: 'Professeurs actifs', value: '1.2k', icon: Users, color: '#28A745' },
    { label: 'Formations', value: '24', icon: Calendar, color: '#6F42C1' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'job',
      title: 'Nouveau poste de Professeur de Mathématiques',
      school: 'École Privée Al Madina',
      location: 'Casablanca',
      time: 'Il y a 2h',
      urgent: true,
      avatar: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      type: 'tutor',
      title: 'Demande de cours particuliers en Physique',
      student: 'Parent - Niveau Bac',
      location: 'Rabat',
      time: 'Il y a 4h',
      urgent: false,
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      type: 'resource',
      title: 'Nouvelle ressource: Exercices de Français',
      author: 'Prof. Amina Khalil',
      downloads: '23 téléchargements',
      time: 'Il y a 6h',
      urgent: false,
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const featuredEvents = [
    {
      id: 1,
      title: 'Formation Gratuite',
      subtitle: 'Techniques d\'enseignement modernes',
      date: '15 Mars 2025 • 14h00',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Webinaire',
      subtitle: 'Gestion de classe efficace',
      date: '20 Mars 2025 • 16h00',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const quickActions = [
    { label: 'Publier offre', icon: Plus, color: '#007BFF', route: 'jobs' },
    { label: 'Trouver prof', icon: Search, color: '#28A745', route: 'tutoring' },
    { label: 'Messages', icon: MessageCircle, color: '#FF6F00', badge: '3' },
    { label: 'Événements', icon: Calendar, color: '#6F42C1', route: 'events' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeText}>Bonjour,</Text>
            <Text style={styles.userName}>Mohamed Alami</Text>
            <Text style={styles.userRole}>Professeur de Mathématiques</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => setShowNotifications(true)}
            >
              <Bell size={24} color="#1C1C1E" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <Text style={styles.searchPlaceholder}>Rechercher emplois, écoles, cours...</Text>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aperçu rapide</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Événements à venir</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsContainer}
          >
            {featuredEvents.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                </View>
                <View style={styles.eventAction}>
                  <ArrowRight size={20} color="#007BFF" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activités récentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityCard}>
                <Image source={{ uri: activity.avatar }} style={styles.activityAvatar} />
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle} numberOfLines={2}>
                      {activity.title}
                    </Text>
                    {activity.urgent && (
                      <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>Urgent</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.activityDetails}>
                    {activity.type === 'job' && `${activity.school} • ${activity.location}`}
                    {activity.type === 'tutor' && `${activity.student} • ${activity.location}`}
                    {activity.type === 'resource' && `${activity.author} • ${activity.downloads}`}
                  </Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.label}</Text>
                {action.badge && (
                  <View style={styles.actionBadge}>
                    <Text style={styles.actionBadgeText}>{action.badge}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Community Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communauté</Text>
          <View style={styles.communityStats}>
            <View style={styles.communityStatItem}>
              <Briefcase size={20} color="#007BFF" />
              <Text style={styles.communityStatNumber}>142</Text>
              <Text style={styles.communityStatLabel}>Offres actives</Text>
            </View>
            <View style={styles.communityStatItem}>
              <Users size={20} color="#28A745" />
              <Text style={styles.communityStatNumber}>1,247</Text>
              <Text style={styles.communityStatLabel}>Professeurs</Text>
            </View>
            <View style={styles.communityStatItem}>
              <GraduationCap size={20} color="#FF6F00" />
              <Text style={styles.communityStatNumber}>89</Text>
              <Text style={styles.communityStatLabel}>Écoles</Text>
            </View>
            <View style={styles.communityStatItem}>
              <BookOpen size={20} color="#6F42C1" />
              <Text style={styles.communityStatNumber}>1,567</Text>
              <Text style={styles.communityStatLabel}>Ressources</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <NotificationCenter
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginTop: 2,
  },
  userRole: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  headerRight: {
    position: 'relative',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  eventsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventContent: {
    padding: 16,
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
  eventAction: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activitiesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  urgentBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  urgentText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  activityDetails: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: 'center',
  },
  actionBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  communityStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  communityStatItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  communityStatNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  communityStatLabel: {
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});