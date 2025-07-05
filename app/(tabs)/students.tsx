import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Users, Plus, Search, X, User, GraduationCap, AlertCircle, CheckCircle, Clock } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';

export default function StudentsScreen() {
  const { students, addStudent } = useApp();
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Tous');
  const [newStudent, setNewStudent] = useState({
    name: '',
    level: '',
    group: '',
    status: 'present' as const,
  });

  const groups = ['Tous', 'Groupe 1', 'Groupe 2'];
  const levels = ['Première S', 'Terminale S', 'Sup', 'Spé'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'Tous' || student.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.level || !newStudent.group) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    addStudent(newStudent);
    setNewStudent({
      name: '',
      level: '',
      group: '',
      status: 'present',
    });
    setShowAddModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} color="#10B981" />;
      case 'absent':
        return <AlertCircle size={16} color="#EF4444" />;
      case 'late':
        return <Clock size={16} color="#F59E0B" />;
      default:
        return <User size={16} color="#6B7280" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'late':
        return 'En retard';
      default:
        return 'Inconnu';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return '#10B981';
      case 'absent':
        return '#EF4444';
      case 'late':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const calculateAverage = (student: any) => {
    if (student.grades.length === 0) return 'N/A';
    const sum = student.grades.reduce((acc: number, grade: any) => acc + grade.grade, 0);
    return (sum / student.grades.length).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Élèves</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un élève..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filtres par groupe */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {groups.map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.filterChip,
              selectedGroup === group && styles.filterChipActive
            ]}
            onPress={() => setSelectedGroup(group)}
          >
            <Text style={[
              styles.filterChipText,
              selectedGroup === group && styles.filterChipTextActive
            ]}>
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{filteredStudents.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {filteredStudents.filter(s => s.status === 'present').length}
          </Text>
          <Text style={styles.statLabel}>Présents</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {filteredStudents.filter(s => s.status === 'absent').length}
          </Text>
          <Text style={styles.statLabel}>Absents</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {filteredStudents.filter(s => s.status === 'late').length}
          </Text>
          <Text style={styles.statLabel}>En retard</Text>
        </View>
      </View>

      {/* Liste des élèves */}
      <ScrollView style={styles.studentsList} showsVerticalScrollIndicator={false}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <TouchableOpacity 
              key={student.id} 
              style={styles.studentCard}
              onPress={() => router.push(`/student/${student.id}`)}
            >
              <View style={styles.studentHeader}>
                <View style={styles.studentAvatar}>
                  <Text style={styles.studentInitial}>
                    {student.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentLevel}>{student.level}</Text>
                  <Text style={styles.studentGroup}>{student.group}</Text>
                </View>
                <View style={styles.studentStats}>
                  <Text style={styles.studentAverage}>
                    Moy: {calculateAverage(student)}/20
                  </Text>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(student.status)}
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(student.status) }
                    ]}>
                      {getStatusText(student.status)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.studentDetails}>
                <View style={styles.detailItem}>
                  <GraduationCap size={14} color="#6B7280" />
                  <Text style={styles.detailText}>
                    {student.grades.length} note{student.grades.length > 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Users size={14} color="#6B7280" />
                  <Text style={styles.detailText}>
                    {student.attendance.length} cours
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Users size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>Aucun élève trouvé</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Aucun élève ne correspond à votre recherche' : 'Commencez par ajouter des élèves'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal d'ajout d'élève */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouvel élève</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom complet *</Text>
              <TextInput
                style={styles.textInput}
                value={newStudent.name}
                onChangeText={(text) => setNewStudent({ ...newStudent, name: text })}
                placeholder="Ex: Marie Dubois"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Niveau *</Text>
              <View style={styles.levelSelector}>
                {levels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelOption,
                      newStudent.level === level && styles.levelOptionSelected
                    ]}
                    onPress={() => setNewStudent({ ...newStudent, level })}
                  >
                    <Text style={[
                      styles.levelOptionText,
                      newStudent.level === level && styles.levelOptionTextSelected
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Groupe *</Text>
              <View style={styles.groupSelector}>
                {groups.filter(g => g !== 'Tous').map((group) => (
                  <TouchableOpacity
                    key={group}
                    style={[
                      styles.groupOption,
                      newStudent.group === group && styles.groupOptionSelected
                    ]}
                    onPress={() => setNewStudent({ ...newStudent, group })}
                  >
                    <Text style={[
                      styles.groupOptionText,
                      newStudent.group === group && styles.groupOptionTextSelected
                    ]}>
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddStudent}
            >
              <Text style={styles.saveButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter-Regular',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  studentsList: {
    flex: 1,
    padding: 20,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  studentLevel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  studentGroup: {
    fontSize: 12,
    color: '#3B82F6',
    fontFamily: 'Inter-Medium',
  },
  studentStats: {
    alignItems: 'flex-end',
  },
  studentAverage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  studentDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    maxWidth: 280,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter-Regular',
  },
  levelSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  levelOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  levelOptionText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  levelOptionTextSelected: {
    color: '#FFFFFF',
  },
  groupSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  groupOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  groupOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  groupOptionText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  groupOptionTextSelected: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});