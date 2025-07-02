import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Star, MessageCircle, Phone, Calendar, User, BookOpen, Video, CircleCheck as CheckCircle } from 'lucide-react-native';
import FilterModal from '@/components/FilterModal';
import MessagingModal from '@/components/MessagingModal';

export default function TutoringScreen() {
  const [activeTab, setActiveTab] = useState<'find' | 'requests'>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);

  const subjects = [
    { name: 'Toutes', count: 234, active: true },
    { name: 'Mathématiques', count: 89, active: false },
    { name: 'Physique', count: 56, active: false },
    { name: 'Français', count: 67, active: false },
    { name: 'Anglais', count: 78, active: false },
  ];

  const tutors = [
    {
      id: 1,
      name: 'Dr. Fatima Benali',
      subjects: ['Mathématiques', 'Physique'],
      level: 'Lycée & Supérieur',
      experience: '8 ans',
      rating: 4.9,
      reviews: 127,
      price: '150 DH/h',
      location: 'Casablanca, Maarif',
      availability: 'Disponible',
      description: 'Docteur en Mathématiques avec une approche pédagogique moderne et personnalisée.',
      verified: true,
      online: true,
      responseTime: '< 2h',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      completedSessions: 245,
      languages: ['Français', 'Arabe', 'Anglais'],
      education: 'Doctorat en Mathématiques - Université Mohammed V',
    },
    {
      id: 2,
      name: 'Prof. Ahmed Benali',
      subjects: ['Français', 'Littérature'],
      level: 'Collège & Lycée',
      experience: '12 ans',
      rating: 4.8,
      reviews: 203,
      price: '120 DH/h',
      location: 'Rabat, Agdal',
      availability: 'Disponible',
      description: 'Professeur agrégé de français, spécialiste en préparation au Baccalauréat.',
      verified: true,
      online: false,
      responseTime: '< 4h',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      completedSessions: 189,
      languages: ['Français', 'Arabe'],
      education: 'Agrégation de Lettres Modernes',
    },
    {
      id: 3,
      name: 'Mme. Sarah Johnson',
      subjects: ['Anglais'],
      level: 'Tous niveaux',
      experience: '6 ans',
      rating: 5.0,
      reviews: 89,
      price: '180 DH/h',
      location: 'Casablanca, Ain Diab',
      availability: 'Occupé',
      description: 'Professeur native anglaise, spécialisée en conversation et préparation TOEFL.',
      verified: true,
      online: true,
      responseTime: '< 1h',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      completedSessions: 156,
      languages: ['Anglais', 'Français'],
      education: 'Master TESOL - University of Cambridge',
    },
  ];

  const requests = [
    {
      id: 1,
      subject: 'Mathématiques',
      level: 'Terminale S',
      location: 'Casablanca',
      budget: '100-150 DH/h',
      schedule: 'Week-end',
      description: 'Recherche prof de maths pour préparation au Bac avec focus sur les probabilités et statistiques.',
      posted: 'Il y a 2h',
      urgent: true,
      responses: 12,
      studentAge: '17 ans',
      sessionType: 'Présentiel',
      duration: '2h par session',
      frequency: '2 fois par semaine',
    },
    {
      id: 2,
      subject: 'Physique-Chimie',
      level: '1ère année Bac',
      location: 'Rabat',
      budget: '80-120 DH/h',
      schedule: 'Après-midi',
      description: 'Besoin d\'aide pour comprendre les concepts de base en chimie organique et mécanique.',
      posted: 'Il y a 5h',
      urgent: false,
      responses: 8,
      studentAge: '16 ans',
      sessionType: 'En ligne',
      duration: '1h30 par session',
      frequency: '3 fois par semaine',
    },
    {
      id: 3,
      subject: 'Anglais',
      level: 'Débutant',
      location: 'Marrakech',
      budget: '60-100 DH/h',
      schedule: 'Soirée',
      description: 'Cours d\'anglais pour adulte débutant, focus sur la conversation et vocabulaire de base.',
      posted: 'Il y a 1j',
      urgent: false,
      responses: 15,
      studentAge: 'Adulte',
      sessionType: 'Hybride',
      duration: '1h par session',
      frequency: '2 fois par semaine',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        color={index < Math.floor(rating) ? '#FF6F00' : '#E5E5EA'}
        fill={index < Math.floor(rating) ? '#FF6F00' : 'transparent'}
      />
    ));
  };

  const handleContactTutor = (tutor: any) => {
    setSelectedTutor(tutor);
    setShowMessaging(true);
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cours particuliers</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Filter size={20} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'find' && styles.tabActive]}
          onPress={() => setActiveTab('find')}
        >
          <Text style={[styles.tabText, activeTab === 'find' && styles.tabTextActive]}>
            Trouver un prof
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'requests' && styles.tabActive]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.tabTextActive]}>
            Demandes de cours
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder={activeTab === 'find' ? "Rechercher un professeur..." : "Rechercher une demande..."}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* Subject Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subjectsContainer}
      >
        {subjects.map((subject, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.subjectChip, 
              subject.active && styles.subjectChipActive
            ]}
          >
            <Text style={[
              styles.subjectText,
              subject.active && styles.subjectTextActive
            ]}>
              {subject.name} ({subject.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'find' ? (
          <>
            {/* Tutors List */}
            <View style={styles.contentHeader}>
              <Text style={styles.resultsText}>234 professeurs disponibles</Text>
              <TouchableOpacity style={styles.sortButton}>
                <Text style={styles.sortText}>Mieux notés</Text>
              </TouchableOpacity>
            </View>

            {tutors.map((tutor) => (
              <TouchableOpacity key={tutor.id} style={styles.tutorCard}>
                {/* Tutor Header */}
                <View style={styles.tutorHeader}>
                  <Image source={{ uri: tutor.avatar }} style={styles.tutorAvatar} />
                  <View style={styles.tutorInfo}>
                    <View style={styles.tutorNameContainer}>
                      <Text style={styles.tutorName}>{tutor.name}</Text>
                      {tutor.verified && (
                        <CheckCircle size={16} color="#28A745" />
                      )}
                      {tutor.online && (
                        <View style={styles.onlineBadge}>
                          <Text style={styles.onlineText}>En ligne</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>
                        {renderStars(tutor.rating)}
                      </View>
                      <Text style={styles.ratingText}>{tutor.rating}</Text>
                      <Text style={styles.reviewsText}>({tutor.reviews})</Text>
                    </View>
                    <Text style={styles.education}>{tutor.education}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{tutor.price}</Text>
                    <Text style={[
                      styles.availability,
                      { color: tutor.availability === 'Disponible' ? '#28A745' : '#FF3B30' }
                    ]}>
                      {tutor.availability}
                    </Text>
                  </View>
                </View>

                {/* Subjects & Level */}
                <View style={styles.tutorSubjects}>
                  {tutor.subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectTag}>
                      <Text style={styles.subjectTagText}>{subject}</Text>
                    </View>
                  ))}
                  <View style={styles.levelTag}>
                    <Text style={styles.levelTagText}>{tutor.level}</Text>
                  </View>
                </View>

                {/* Details */}
                <View style={styles.tutorDetails}>
                  <View style={styles.detailItem}>
                    <MapPin size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>{tutor.location}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <BookOpen size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>{tutor.experience} d'expérience</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>Répond en {tutor.responseTime}</Text>
                  </View>
                </View>

                {/* Languages */}
                <View style={styles.languagesContainer}>
                  <Text style={styles.languagesLabel}>Langues: </Text>
                  <Text style={styles.languagesText}>{tutor.languages.join(', ')}</Text>
                </View>

                {/* Description */}
                <Text style={styles.tutorDescription} numberOfLines={2}>
                  {tutor.description}
                </Text>

                {/* Stats */}
                <View style={styles.tutorStats}>
                  <Text style={styles.statText}>{tutor.completedSessions} cours donnés</Text>
                  <Text style={styles.statText}>Répond en {tutor.responseTime}</Text>
                </View>

                {/* Actions */}
                <View style={styles.tutorActions}>
                  <TouchableOpacity style={styles.contactButton}>
                    <Phone size={16} color="#007BFF" />
                    <Text style={styles.contactText}>Appeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleContactTutor(tutor)}
                  >
                    <MessageCircle size={16} color="#007BFF" />
                    <Text style={styles.contactText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookButton}>
                    <Calendar size={16} color="#FFFFFF" />
                    <Text style={styles.bookText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            {/* Requests List */}
            <View style={styles.contentHeader}>
              <Text style={styles.resultsText}>45 demandes actives</Text>
              <TouchableOpacity style={styles.addRequestButton}>
                <Text style={styles.addRequestText}>+ Publier</Text>
              </TouchableOpacity>
            </View>

            {requests.map((request) => (
              <TouchableOpacity key={request.id} style={styles.requestCard}>
                {/* Request Header */}
                <View style={styles.requestHeader}>
                  <View style={styles.requestTitleContainer}>
                    <Text style={styles.requestSubject}>{request.subject}</Text>
                    {request.urgent && (
                      <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>Urgent</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.responsesContainer}>
                    <Text style={styles.responsesText}>{request.responses} réponses</Text>
                  </View>
                </View>

                <Text style={styles.requestLevel}>{request.level}</Text>

                {/* Request Details */}
                <View style={styles.requestDetails}>
                  <View style={styles.detailItem}>
                    <MapPin size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>{request.location}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <DollarSign size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>{request.budget}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={12} color="#8E8E93" />
                    <Text style={styles.detailText}>{request.schedule}</Text>
                  </View>
                </View>

                {/* Additional Info */}
                <View style={styles.additionalInfo}>
                  <View style={styles.infoItem}>
                    <User size={12} color="#8E8E93" />
                    <Text style={styles.infoText}>Âge: {request.studentAge}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Video size={12} color="#8E8E93" />
                    <Text style={styles.infoText}>{request.sessionType}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Clock size={12} color="#8E8E93" />
                    <Text style={styles.infoText}>{request.duration}</Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.requestDescription} numberOfLines={2}>
                  {request.description}
                </Text>

                {/* Footer */}
                <View style={styles.requestFooter}>
                  <Text style={styles.postedTime}>{request.posted}</Text>
                  <TouchableOpacity style={styles.respondButton}>
                    <Text style={styles.respondButtonText}>Répondre</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>
              {activeTab === 'find' ? 'Charger plus de professeurs' : 'Charger plus de demandes'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        type="tutoring"
      />

      {selectedTutor && (
        <MessagingModal
          visible={showMessaging}
          onClose={() => setShowMessaging(false)}
          recipient={{
            id: selectedTutor.id.toString(),
            name: selectedTutor.name,
            avatar: selectedTutor.avatar,
            online: selectedTutor.online,
          }}
        />
      )}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  tabTextActive: {
    color: '#007BFF',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
  },
  subjectsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  subjectChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  subjectChipActive: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  subjectText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  subjectTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  sortText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  addRequestButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  addRequestText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  tutorCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tutorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tutorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  tutorInfo: {
    flex: 1,
  },
  tutorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  onlineBadge: {
    backgroundColor: '#28A745',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  onlineText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  reviewsText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  education: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#28A745',
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  availability: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  tutorSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  subjectTag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectTagText: {
    fontSize: 12,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  levelTag: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  tutorDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  languagesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  languagesText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  tutorDescription: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  tutorStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  tutorActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  contactText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  bookText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  requestTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requestSubject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
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
  responsesContainer: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  responsesText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  requestLevel: {
    fontSize: 14,
    color: '#FF6F00',
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  requestDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  additionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  requestDescription: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  respondButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  respondButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  loadMoreContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  loadMoreText: {
    fontSize: 16,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
});