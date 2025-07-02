import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users,
  Phone,
  Globe,
  ChevronRight,
  TrendingUp
} from 'lucide-react-native';
import { useState } from 'react';

export default function SchoolsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const schoolTypes = [
    { name: 'Toutes', count: 89, active: true },
    { name: 'Primaire', count: 34, active: false },
    { name: 'Collège', count: 28, active: false },
    { name: 'Lycée', count: 27, active: false },
  ];

  const featuredSchools = [
    {
      id: 1,
      name: 'École Privée Al Madina',
      type: 'Primaire & Collège',
      location: 'Casablanca, Maarif',
      rating: 4.8,
      reviews: 156,
      students: 850,
      teachers: 45,
      description: 'École de référence avec une pédagogie innovante et un environnement d\'apprentissage exceptionnel.',
      phone: '+212 522 456 789',
      website: 'www.almadina.ma',
      salaryRange: '6000 - 12000 DH',
      benefits: ['Assurance santé', 'Formation continue', 'Prime de rendement'],
      subjects: ['Mathématiques', 'Sciences', 'Langues', 'Arts'],
    },
    {
      id: 2,
      name: 'Groupe Scolaire La Réussite',
      type: 'Tous niveaux',
      location: 'Rabat, Agdal',
      rating: 4.6,
      reviews: 203,
      students: 1200,
      teachers: 68,
      description: 'Institution reconnue pour son excellence académique et son accompagnement personnalisé.',
      phone: '+212 537 789 123',
      website: 'www.lareussite.ma',
      salaryRange: '7000 - 14000 DH',
      benefits: ['Transport', 'Cantine', 'Activités extra-scolaires'],
      subjects: ['Toutes matières', 'Langues étrangères'],
    },
    {
      id: 3,
      name: 'International School of Morocco',
      type: 'International',
      location: 'Casablanca, Ain Diab',
      rating: 4.9,
      reviews: 89,
      students: 650,
      teachers: 52,
      description: 'École internationale bilingue offrant un programme d\'excellence avec certification internationale.',
      phone: '+212 522 987 654',
      website: 'www.ism.ma',
      salaryRange: '10000 - 18000 DH',
      benefits: ['Assurance complète', 'Vacances payées', 'Bonus performance'],
      subjects: ['Anglais natif', 'Sciences', 'Arts'],
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        color={index < Math.floor(rating) ? '#FF6F00' : '#E5E5EA'}
        fill={index < Math.floor(rating) ? '#FF6F00' : 'transparent'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Annuaire des écoles</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une école..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* School Types */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typesContainer}
      >
        {schoolTypes.map((type, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.typeChip, 
              type.active && styles.typeChipActive
            ]}
          >
            <Text style={[
              styles.typeText,
              type.active && styles.typeTextActive
            ]}>
              {type.name} ({type.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schools List */}
      <ScrollView style={styles.schoolsList} showsVerticalScrollIndicator={false}>
        <View style={styles.schoolsHeader}>
          <Text style={styles.resultsText}>89 écoles trouvées</Text>
          <View style={styles.sortContainer}>
            <TrendingUp size={16} color="#8E8E93" />
            <Text style={styles.sortText}>Mieux notées</Text>
          </View>
        </View>

        {featuredSchools.map((school) => (
          <TouchableOpacity key={school.id} style={styles.schoolCard}>
            {/* School Header */}
            <View style={styles.schoolHeader}>
              <View style={styles.schoolTitleContainer}>
                <Text style={styles.schoolName}>{school.name}</Text>
                <Text style={styles.schoolType}>{school.type}</Text>
              </View>
              <ChevronRight size={20} color="#8E8E93" />
            </View>

            {/* Location */}
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#8E8E93" />
              <Text style={styles.locationText}>{school.location}</Text>
            </View>

            {/* Rating & Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars(school.rating)}
                </View>
                <Text style={styles.ratingText}>{school.rating}</Text>
                <Text style={styles.reviewsText}>({school.reviews} avis)</Text>
              </View>
              <View style={styles.statsNumbers}>
                <View style={styles.statItem}>
                  <Users size={14} color="#8E8E93" />
                  <Text style={styles.statText}>{school.students} élèves</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={14} color="#8E8E93" />
                  <Text style={styles.statText}>{school.teachers} profs</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
              {school.description}
            </Text>

            {/* Salary Range */}
            <View style={styles.salaryContainer}>
              <Text style={styles.salaryLabel}>Salaires:</Text>
              <Text style={styles.salaryRange}>{school.salaryRange}</Text>
            </View>

            {/* Subjects */}
            <View style={styles.subjectsContainer}>
              {school.subjects.slice(0, 3).map((subject, index) => (
                <View key={index} style={styles.subjectTag}>
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
              {school.subjects.length > 3 && (
                <View style={styles.moreSubjectsTag}>
                  <Text style={styles.moreSubjectsText}>+{school.subjects.length - 3}</Text>
                </View>
              )}
            </View>

            {/* Benefits */}
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsLabel}>Avantages:</Text>
              <Text style={styles.benefitsText}>
                {school.benefits.slice(0, 2).join(', ')}
                {school.benefits.length > 2 && '...'}
              </Text>
            </View>

            {/* Contact Actions */}
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={16} color="#007BFF" />
                <Text style={styles.contactText}>Appeler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <Globe size={16} color="#007BFF" />
                <Text style={styles.contactText}>Site web</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reviewButton}>
                <Star size={16} color="#FF6F00" />
                <Text style={styles.reviewText}>Avis</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add School Button */}
        <TouchableOpacity style={styles.addSchoolButton}>
          <Text style={styles.addSchoolText}>+ Ajouter une école</Text>
        </TouchableOpacity>

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Charger plus d'écoles</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  typesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  typeChipActive: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  typeText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  schoolsList: {
    flex: 1,
  },
  schoolsHeader: {
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  schoolCard: {
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
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  schoolTitleContainer: {
    flex: 1,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  schoolType: {
    fontSize: 14,
    color: '#FF6F00',
    fontFamily: 'Inter-Medium',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
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
  statsNumbers: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  salaryLabel: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  salaryRange: {
    fontSize: 14,
    color: '#28A745',
    fontFamily: 'Inter-SemiBold',
  },
  subjectsContainer: {
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
  subjectText: {
    fontSize: 12,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  moreSubjectsTag: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moreSubjectsText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  benefitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  benefitsLabel: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  benefitsText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
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
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FF6F00',
  },
  reviewText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  addSchoolButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addSchoolText: {
    fontSize: 16,
    color: '#007BFF',
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