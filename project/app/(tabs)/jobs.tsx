import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Plus,
  Share,
  Eye
} from 'lucide-react-native';
import FilterModal from '@/components/FilterModal';

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const jobCategories = [
    { name: 'Tous', count: 142, active: true },
    { name: 'Mathématiques', count: 28, active: false },
    { name: 'Sciences', count: 22, active: false },
    { name: 'Langues', count: 31, active: false },
    { name: 'Primaire', count: 45, active: false },
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Professeur de Mathématiques',
      school: 'École Privée Al Madina',
      location: 'Casablanca',
      type: 'CDI',
      salary: '8000 - 12000 DH',
      posted: 'Il y a 2h',
      urgent: true,
      subjects: ['Mathématiques', 'Physique'],
      level: 'Lycée',
      description: 'Recherche professeur expérimenté pour classes de Terminale. Maîtrise des programmes officiels requise.',
      requirements: ['Licence en Mathématiques', '3+ ans d\'expérience', 'Maîtrise du français'],
      benefits: ['Assurance santé', 'Prime de rendement', 'Formation continue'],
      views: 156,
      applications: 12,
    },
    {
      id: 2,
      title: 'Enseignant Primaire',
      school: 'Groupe Scolaire La Réussite',
      location: 'Rabat',
      type: 'CDD',
      salary: '6000 - 8000 DH',
      posted: 'Il y a 5h',
      urgent: false,
      subjects: ['Toutes matières'],
      level: 'Primaire',
      description: 'Poste d\'enseignant pour le niveau primaire, toutes matières. Environnement bienveillant.',
      requirements: ['Formation pédagogique', 'Expérience avec enfants', 'Patience et créativité'],
      benefits: ['Transport', 'Cantine', 'Horaires flexibles'],
      views: 89,
      applications: 8,
    },
    {
      id: 3,
      title: 'Professeur de Français',
      school: 'Institution Scolaire Excellence',
      location: 'Marrakech',
      type: 'CDI',
      salary: '7000 - 10000 DH',
      posted: 'Il y a 1j',
      urgent: false,
      subjects: ['Français', 'Littérature'],
      level: 'Collège/Lycée',
      description: 'Professeur de français pour collège et lycée, passionné par la littérature et la langue française.',
      requirements: ['Master en Lettres', 'Excellente expression', 'Passion pour l\'enseignement'],
      benefits: ['Assurance', 'Congés payés', 'Bibliothèque fournie'],
      views: 234,
      applications: 15,
    },
    {
      id: 4,
      title: 'Professeur d\'Anglais',
      school: 'International School of Morocco',
      location: 'Casablanca',
      type: 'CDI',
      salary: '10000 - 15000 DH',
      posted: 'Il y a 2j',
      urgent: false,
      subjects: ['Anglais'],
      level: 'Tous niveaux',
      description: 'École internationale recherche professeur d\'anglais natif ou bilingue pour tous niveaux.',
      requirements: ['Anglais natif/bilingue', 'Certification TEFL/TESOL', 'Expérience internationale'],
      benefits: ['Salaire attractif', 'Assurance complète', 'Vacances internationales'],
      views: 312,
      applications: 23,
    },
  ];

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    // Implement filter logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offres d'emploi</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Plus size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <Filter size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un emploi..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {jobCategories.map((category, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryChip, 
              activeCategory === category.name && styles.categoryChipActive
            ]}
            onPress={() => setActiveCategory(category.name)}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === category.name && styles.categoryTextActive
            ]}>
              {category.name} ({category.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Job Listings */}
      <ScrollView style={styles.jobsList} showsVerticalScrollIndicator={false}>
        <View style={styles.jobsHeader}>
          <Text style={styles.resultsText}>142 offres trouvées</Text>
          <View style={styles.sortContainer}>
            <TrendingUp size={16} color="#8E8E93" />
            <Text style={styles.sortText}>Plus récents</Text>
          </View>
        </View>

        {jobListings.map((job) => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                {job.urgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>Urgent</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity 
                onPress={() => toggleSaveJob(job.id)}
                style={styles.saveButton}
              >
                {savedJobs.includes(job.id) ? (
                  <BookmarkCheck size={20} color="#007BFF" />
                ) : (
                  <Bookmark size={20} color="#8E8E93" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.schoolName}>{job.school}</Text>
            
            <View style={styles.jobDetails}>
              <View style={styles.detailItem}>
                <MapPin size={14} color="#8E8E93" />
                <Text style={styles.detailText}>{job.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <DollarSign size={14} color="#8E8E93" />
                <Text style={styles.detailText}>{job.salary}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={14} color="#8E8E93" />
                <Text style={styles.detailText}>{job.type}</Text>
              </View>
            </View>

            <View style={styles.subjectsContainer}>
              {job.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectTag}>
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              ))}
              <View style={styles.levelTag}>
                <Text style={styles.levelText}>{job.level}</Text>
              </View>
            </View>

            <Text style={styles.jobDescription} numberOfLines={2}>
              {job.description}
            </Text>

            {/* Requirements Preview */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Exigences:</Text>
              <Text style={styles.requirementsText} numberOfLines={1}>
                {job.requirements.join(' • ')}
              </Text>
            </View>

            {/* Benefits Preview */}
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Avantages:</Text>
              <Text style={styles.benefitsText} numberOfLines={1}>
                {job.benefits.join(' • ')}
              </Text>
            </View>

            {/* Job Stats */}
            <View style={styles.jobStats}>
              <View style={styles.statItem}>
                <Eye size={14} color="#8E8E93" />
                <Text style={styles.statText}>{job.views} vues</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statText}>{job.applications} candidatures</Text>
              </View>
              <Text style={styles.postedTime}>{job.posted}</Text>
            </View>

            <View style={styles.jobFooter}>
              <TouchableOpacity style={styles.shareButton}>
                <Share size={16} color="#8E8E93" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Postuler</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Charger plus d'offres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        type="jobs"
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryChipActive: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  jobsList: {
    flex: 1,
  },
  jobsHeader: {
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
  jobCard: {
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
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
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
  saveButton: {
    padding: 4,
  },
  schoolName: {
    fontSize: 16,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
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
  levelTag: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  jobDescription: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  requirementsContainer: {
    marginBottom: 8,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  requirementsText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  benefitsContainer: {
    marginBottom: 12,
  },
  benefitsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  benefitsText: {
    fontSize: 12,
    color: '#28A745',
    fontFamily: 'Inter-Regular',
  },
  jobStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
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
  postedTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginLeft: 'auto',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  applyButtonText: {
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