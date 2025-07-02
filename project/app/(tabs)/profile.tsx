import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Settings, CreditCard as Edit3, Star, Briefcase, GraduationCap, BookOpen, Users, MessageCircle, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Trophy, Calendar, MapPin, Globe } from 'lucide-react-native';
import LanguageSelector from '@/components/LanguageSelector';
import { useI18n } from '@/hooks/useI18n';

export default function ProfileScreen() {
  const { t, isRTL, language } = useI18n();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const userStats = [
    { label: t('jobs.applications'), value: '12', icon: Briefcase, color: '#007BFF' },
    { label: 'Cours donnés', value: '45', icon: BookOpen, color: '#28A745' },
    { label: 'Avis reçus', value: '89', icon: Star, color: '#FF6F00' },
    { label: 'Ressources', value: '23', icon: Users, color: '#6F42C1' },
  ];

  const menuSections = [
    {
      title: 'Profil',
      items: [
        { label: 'Modifier le profil', icon: Edit3, color: '#007BFF' },
        { label: 'Mes candidatures', icon: Briefcase, color: '#007BFF' },
        { label: 'Mes cours', icon: BookOpen, color: '#28A745' },
        { label: 'Mes ressources', icon: Users, color: '#6F42C1' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { label: 'Messages', icon: MessageCircle, color: '#007BFF', badge: '3' },
        { label: 'Notifications', icon: Bell, color: '#FF6F00' },
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { 
          label: `Langue (${language === 'ar' ? 'العربية' : 'English'})`, 
          icon: Globe, 
          color: '#8E8E93',
          onPress: () => setShowLanguageSelector(true)
        },
        { label: 'Confidentialité', icon: Shield, color: '#8E8E93' },
        { label: 'Préférences', icon: Settings, color: '#8E8E93' },
        { label: 'Centre d\'aide', icon: HelpCircle, color: '#8E8E93' },
      ]
    }
  ];

  const achievements = [
    { title: 'Nouveau membre', description: 'Bienvenue dans la communauté', icon: Trophy, color: '#FF6F00' },
    { title: 'Premier cours', description: 'Premier cours particulier donné', icon: BookOpen, color: '#28A745' },
    { title: 'Bien noté', description: '10+ avis positifs reçus', icon: Star, color: '#FF6F00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, isRTL && styles.rtlHeader]}>
          <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
            {t('navigation.profile')}
          </Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={[styles.profileHeader, isRTL && styles.rtlRow]}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatar}
              />
              <View style={styles.statusIndicator} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#007BFF" />
            </TouchableOpacity>
          </View>

          <View style={[styles.profileInfo, isRTL && styles.rtlProfileInfo]}>
            <Text style={[styles.userName, isRTL && styles.rtlText]}>
              {language === 'ar' ? 'محمد العلمي' : 'Mohamed Alami'}
            </Text>
            <Text style={[styles.userRole, isRTL && styles.rtlText]}>
              {language === 'ar' ? 'أستاذ الرياضيات' : 'Professeur de Mathématiques'}
            </Text>
            <View style={[styles.locationContainer, isRTL && styles.rtlRow]}>
              <MapPin size={14} color="#8E8E93" />
              <Text style={[styles.locationText, isRTL && styles.rtlText]}>
                {language === 'ar' ? 'الدار البيضاء، المغرب' : 'Casablanca, Maroc'}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View style={[styles.ratingSection, isRTL && styles.rtlRow]}>
            <View style={[styles.ratingContainer, isRTL && styles.rtlRow]}>
              <Star size={16} color="#FF6F00" fill="#FF6F00" />
              <Text style={[styles.ratingText, isRTL && styles.rtlText]}>4.8</Text>
              <Text style={[styles.reviewsText, isRTL && styles.rtlText]}>
                {language === 'ar' ? '(89 تقييم)' : '(89 avis)'}
              </Text>
            </View>
            <View style={[styles.experienceContainer, isRTL && styles.rtlRow]}>
              <Calendar size={14} color="#8E8E93" />
              <Text style={[styles.experienceText, isRTL && styles.rtlText]}>
                {language === 'ar' ? '8 سنوات خبرة' : '8 ans d\'expérience'}
              </Text>
            </View>
          </View>

          {/* Bio */}
          <Text style={[styles.bio, isRTL && styles.rtlText]}>
            {language === 'ar' 
              ? 'أستاذ متحمس مع 8 سنوات من الخبرة في تدريس الرياضيات. متخصص في التحضير للبكالوريا والدروس الخصوصية.'
              : 'Professeur passionné avec 8 ans d\'expérience dans l\'enseignement des mathématiques. Spécialisé dans la préparation au Baccalauréat et les cours particuliers.'
            }
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                  <stat.icon size={16} color={stat.color} />
                </View>
                <Text style={[styles.statValue, isRTL && styles.rtlText]}>{stat.value}</Text>
                <Text style={[styles.statLabel, isRTL && styles.rtlText]}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {language === 'ar' ? 'الإنجازات' : 'Réalisations'}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
                  <achievement.icon size={20} color={achievement.color} />
                </View>
                <Text style={[styles.achievementTitle, isRTL && styles.rtlText]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, isRTL && styles.rtlText]}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{section.title}</Text>
            <View style={styles.menuContainer}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={[styles.menuItem, isRTL && styles.rtlMenuItem]}
                  onPress={item.onPress}
                >
                  <View style={[styles.menuItemLeft, isRTL && styles.rtlRow]}>
                    <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <Text style={[styles.menuLabel, isRTL && styles.rtlText]}>{item.label}</Text>
                  </View>
                  <View style={[styles.menuItemRight, isRTL && styles.rtlRow]}>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <ChevronRight size={16} color="#8E8E93" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={[styles.logoutButton, isRTL && styles.rtlRow]}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={[styles.logoutText, isRTL && styles.rtlText]}>
              {language === 'ar' ? 'تسجيل الخروج' : 'Se déconnecter'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, isRTL && styles.rtlText]}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Cairo-Bold',
  },
  settingsButton: {
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28A745',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginBottom: 12,
  },
  rtlProfileInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  reviewsText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  experienceText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  bio: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    width: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 11,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 14,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  rtlMenuItem: {
    flexDirection: 'row-reverse',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontFamily: 'Inter-SemiBold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
});