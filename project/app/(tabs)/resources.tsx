import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Star,
  BookOpen,
  FileText,
  Video,
  Headphones,
  Share,
  Bookmark
} from 'lucide-react-native';
import { useState } from 'react';

export default function ResourcesScreen() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-resources'>('browse');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Tout', count: 1247, active: true, icon: BookOpen },
    { name: 'Documents', count: 856, active: false, icon: FileText },
    { name: 'Vidéos', count: 234, active: false, icon: Video },
    { name: 'Audio', count: 157, active: false, icon: Headphones },
  ];

  const subjects = [
    { name: 'Toutes matières', active: true },
    { name: 'Mathématiques', active: false },
    { name: 'Sciences', active: false },
    { name: 'Français', active: false },
    { name: 'Anglais', active: false },
    { name: 'Histoire', active: false },
  ];

  const resources = [
    {
      id: 1,
      title: 'Exercices de Mathématiques - Fonctions',
      subject: 'Mathématiques',
      level: 'Terminale S',
      type: 'PDF',
      pages: 24,
      author: 'Prof. Mohamed Alami',
      rating: 4.8,
      downloads: 1247,
      views: 3456,
      description: 'Collection complète d\'exercices sur les fonctions avec corrections détaillées...',
      tags: ['Fonctions', 'Dérivées', 'Limites'],
      uploadDate: 'Il y a 2j',
      premium: false,
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Cours de Physique - Mécanique',
      subject: 'Physique',
      level: '1ère Bac',
      type: 'Vidéo',
      duration: '45 min',
      author: 'Dr. Fatima Benali',
      rating: 4.9,
      downloads: 890,
      views: 2134,
      description: 'Cours complet sur la mécanique newtonienne avec démonstrations pratiques...',
      tags: ['Mécanique', 'Forces', 'Mouvement'],
      uploadDate: 'Il y a 5j',
      premium: true,
      size: '125 MB',
    },
    {
      id: 3,
      title: 'Grammaire Française - Les temps',
      subject: 'Français',
      level: 'Collège',
      type: 'PDF',
      pages: 18,
      author: 'Prof. Amina Khalil',
      rating: 4.7,
      downloads: 675,
      views: 1890,
      description: 'Guide complet sur la conjugaison et l\'utilisation des temps en français...',
      tags: ['Conjugaison', 'Grammaire', 'Temps'],
      uploadDate: 'Il y a 1s',
      premium: false,
      size: '1.8 MB',
    },
    {
      id: 4,
      title: 'English Conversation Practice',
      subject: 'Anglais',
      level: 'Intermédiaire',
      type: 'Audio',
      duration: '30 min',
      author: 'Sarah Johnson',
      rating: 5.0,
      downloads: 432,
      views: 987,
      description: 'Sessions d\'écoute pour améliorer la compréhension orale en anglais...',
      tags: ['Conversation', 'Listening', 'Practice'],
      uploadDate: 'Il y a 3j',
      premium: true,
      size: '28 MB',
    },
  ];

  const myResources = [
    {
      id: 1,
      title: 'Mes Exercices de Chimie',
      status: 'Publié',
      downloads: 156,
      views: 432,
      uploadDate: 'Il y a 2s',
      rating: 4.6,
    },
    {
      id: 2,
      title: 'Cours de Géométrie - Niveau 3ème',
      status: 'En attente',
      downloads: 0,
      views: 0,
      uploadDate: 'Il y a 1j',
      rating: 0,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'document':
        return FileText;
      case 'vidéo':
      case 'video':
        return Video;
      case 'audio':
        return Headphones;
      default:
        return FileText;
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ressources</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'browse' && styles.tabActive]}
          onPress={() => setActiveTab('browse')}
        >
          <Text style={[styles.tabText, activeTab === 'browse' && styles.tabTextActive]}>
            Parcourir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'my-resources' && styles.tabActive]}
          onPress={() => setActiveTab('my-resources')}
        >
          <Text style={[styles.tabText, activeTab === 'my-resources' && styles.tabTextActive]}>
            Mes ressources
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des ressources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {activeTab === 'browse' && (
        <>
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.categoryChip, 
                    category.active && styles.categoryChipActive
                  ]}
                >
                  <IconComponent 
                    size={16} 
                    color={category.active ? '#FFFFFF' : '#8E8E93'} 
                  />
                  <Text style={[
                    styles.categoryText,
                    category.active && styles.categoryTextActive
                  ]}>
                    {category.name} ({category.count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Subjects Filter */}
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
                  {subject.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'browse' ? (
          <>
            <View style={styles.contentHeader}>
              <Text style={styles.resultsText}>1247 ressources disponibles</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadText}>+ Partager</Text>
              </TouchableOpacity>
            </View>

            {resources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <TouchableOpacity key={resource.id} style={styles.resourceCard}>
                  {/* Resource Header */}
                  <View style={styles.resourceHeader}>
                    <View style={styles.resourceInfo}>
                      <View style={styles.typeContainer}>
                        <TypeIcon size={16} color="#007BFF" />
                        <Text style={styles.typeText}>{resource.type}</Text>
                        {resource.premium && (
                          <View style={styles.premiumBadge}>
                            <Text style={styles.premiumText}>Premium</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookmarkButton}>
                      <Bookmark size={20} color="#8E8E93" />
                    </TouchableOpacity>
                  </View>

                  {/* Subject & Level */}
                  <View style={styles.resourceMeta}>
                    <View style={styles.subjectTag}>
                      <Text style={styles.subjectTagText}>{resource.subject}</Text>
                    </View>
                    <View style={styles.levelTag}>
                      <Text style={styles.levelTagText}>{resource.level}</Text>
                    </View>
                  </View>

                  {/* Author & Rating */}
                  <View style={styles.authorContainer}>
                    <Text style={styles.authorText}>Par {resource.author}</Text>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starsContainer}>
                        {renderStars(resource.rating)}
                      </View>
                      <Text style={styles.ratingText}>{resource.rating}</Text>
                    </View>
                  </View>

                  {/* Description */}
                  <Text style={styles.resourceDescription} numberOfLines={2}>
                    {resource.description}
                  </Text>

                  {/* Tags */}
                  <View style={styles.tagsContainer}>
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Stats & Actions */}
                  <View style={styles.resourceFooter}>
                    <View style={styles.statsContainer}>
                      <View style={styles.statItem}>
                        <Download size={14} color="#8E8E93" />
                        <Text style={styles.statText}>{resource.downloads}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Eye size={14} color="#8E8E93" />
                        <Text style={styles.statText}>{resource.views}</Text>
                      </View>
                      <Text style={styles.sizeText}>{resource.size}</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Share size={16} color="#8E8E93" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.downloadButton}>
                        <Download size={16} color="#FFFFFF" />
                        <Text style={styles.downloadText}>Télécharger</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.uploadDate}>{resource.uploadDate}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <>
            <View style={styles.contentHeader}>
              <Text style={styles.resultsText}>Mes ressources partagées</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadText}>+ Nouveau</Text>
              </TouchableOpacity>
            </View>

            {myResources.map((resource) => (
              <TouchableOpacity key={resource.id} style={styles.myResourceCard}>
                <View style={styles.myResourceHeader}>
                  <Text style={styles.myResourceTitle}>{resource.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: resource.status === 'Publié' ? '#28A745' : '#FF6F00' }
                  ]}>
                    <Text style={styles.statusText}>{resource.status}</Text>
                  </View>
                </View>

                <View style={styles.myResourceStats}>
                  <View style={styles.statItem}>
                    <Download size={14} color="#8E8E93" />
                    <Text style={styles.statText}>{resource.downloads} téléchargements</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Eye size={14} color="#8E8E93" />
                    <Text style={styles.statText}>{resource.views} vues</Text>
                  </View>
                </View>

                {resource.rating > 0 && (
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(resource.rating)}
                    </View>
                    <Text style={styles.ratingText}>{resource.rating}</Text>
                  </View>
                )}

                <Text style={styles.uploadDate}>{resource.uploadDate}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Charger plus de ressources</Text>
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
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    backgroundColor: '#FF6F00',
    borderColor: '#FF6F00',
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
  uploadButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  uploadText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  resourceCard: {
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
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  typeText: {
    fontSize: 12,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
  premiumBadge: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  bookmarkButton: {
    padding: 4,
  },
  resourceMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subjectTagText: {
    fontSize: 12,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  levelTag: {
    backgroundColor: '#FF6F00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  sizeText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  downloadText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
  },
  uploadDate: {
    fontSize: 11,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  myResourceCard: {
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
  myResourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  myResourceTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  myResourceStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
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