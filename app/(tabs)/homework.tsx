import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { BookOpen, Plus, Calendar, Users, CheckCircle, Clock, AlertCircle, X } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';

export default function HomeworkScreen() {
  const { homework, addHomework, updateHomeworkStatus } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    group: '',
    dueDate: '',
    status: 'assigned' as const,
  });

  const statusOptions = ['Tous', 'assigned', 'submitted', 'graded'];
  const statusLabels = {
    'assigned': 'À rendre',
    'submitted': 'Rendu',
    'graded': 'Corrigé',
  };

  const groups = ['Groupe 1', 'Groupe 2'];

  const filteredHomework = homework.filter(hw => 
    selectedStatus === 'Tous' || hw.status === selectedStatus
  );

  const handleAddHomework = () => {
    if (!newHomework.title || !newHomework.description || !newHomework.group || !newHomework.dueDate) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    addHomework(newHomework);
    setNewHomework({
      title: '',
      description: '',
      group: '',
      dueDate: '',
      status: 'assigned',
    });
    setShowAddModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned':
        return <Clock size={16} color="#F59E0B" />;
      case 'submitted':
        return <AlertCircle size={16} color="#3B82F6" />;
      case 'graded':
        return <CheckCircle size={16} color="#10B981" />;
      default:
        return <BookOpen size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return '#F59E0B';
      case 'submitted':
        return '#3B82F6';
      case 'graded':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return '#FEF3C7';
      case 'submitted':
        return '#EBF8FF';
      case 'graded':
        return '#D1FAE5';
      default:
        return '#F3F4F6';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'graded') return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Devoirs</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filtres par statut */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterChip,
              selectedStatus === status && styles.filterChipActive
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={[
              styles.filterChipText,
              selectedStatus === status && styles.filterChipTextActive
            ]}>
              {status === 'Tous' ? status : statusLabels[status as keyof typeof statusLabels]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {homework.filter(hw => hw.status === 'assigned').length}
          </Text>
          <Text style={styles.statLabel}>À rendre</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {homework.filter(hw => hw.status === 'submitted').length}
          </Text>
          <Text style={styles.statLabel}>Rendus</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {homework.filter(hw => hw.status === 'graded').length}
          </Text>
          <Text style={styles.statLabel}>Corrigés</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {homework.filter(hw => isOverdue(hw.dueDate, hw.status)).length}
          </Text>
          <Text style={styles.statLabel}>En retard</Text>
        </View>
      </View>

      {/* Liste des devoirs */}
      <ScrollView style={styles.homeworkList} showsVerticalScrollIndicator={false}>
        {filteredHomework.length > 0 ? (
          filteredHomework.map((hw) => (
            <TouchableOpacity key={hw.id} style={styles.homeworkCard}>
              <View style={styles.homeworkHeader}>
                <View style={styles.homeworkTitleContainer}>
                  <Text style={styles.homeworkTitle}>{hw.title}</Text>
                  {isOverdue(hw.dueDate, hw.status) && (
                    <View style={styles.overdueIndicator}>
                      <Text style={styles.overdueText}>En retard</Text>
                    </View>
                  )}
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(hw.status) }
                ]}>
                  {getStatusIcon(hw.status)}
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(hw.status) }
                  ]}>
                    {statusLabels[hw.status as keyof typeof statusLabels]}
                  </Text>
                </View>
              </View>

              <Text style={styles.homeworkDescription} numberOfLines={2}>
                {hw.description}
              </Text>

              <View style={styles.homeworkDetails}>
                <View style={styles.detailItem}>
                  <Users size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{hw.group}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.detailText}>
                    Échéance: {formatDate(hw.dueDate)}
                  </Text>
                </View>
              </View>

              {hw.status === 'submitted' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.gradeButton}
                    onPress={() => updateHomeworkStatus(hw.id, 'graded')}
                  >
                    <CheckCircle size={16} color="#FFFFFF" />
                    <Text style={styles.gradeButtonText}>Marquer comme corrigé</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>Aucun devoir trouvé</Text>
            <Text style={styles.emptyStateText}>
              {selectedStatus === 'Tous' 
                ? 'Commencez par ajouter des devoirs' 
                : `Aucun devoir avec le statut "${selectedStatus === 'assigned' ? 'À rendre' : selectedStatus === 'submitted' ? 'Rendu' : 'Corrigé'}"`
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal d'ajout de devoir */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouveau devoir</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titre du devoir *</Text>
              <TextInput
                style={styles.textInput}
                value={newHomework.title}
                onChangeText={(text) => setNewHomework({ ...newHomework, title: text })}
                placeholder="Ex: Équations différentielles"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newHomework.description}
                onChangeText={(text) => setNewHomework({ ...newHomework, description: text })}
                placeholder="Décrivez le devoir à faire..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Groupe *</Text>
              <View style={styles.groupSelector}>
                {groups.map((group) => (
                  <TouchableOpacity
                    key={group}
                    style={[
                      styles.groupOption,
                      newHomework.group === group && styles.groupOptionSelected
                    ]}
                    onPress={() => setNewHomework({ ...newHomework, group })}
                  >
                    <Text style={[
                      styles.groupOptionText,
                      newHomework.group === group && styles.groupOptionTextSelected
                    ]}>
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date d'échéance *</Text>
              <TextInput
                style={styles.textInput}
                value={newHomework.dueDate}
                onChangeText={(text) => setNewHomework({ ...newHomework, dueDate: text })}
                placeholder="YYYY-MM-DD"
              />
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
              onPress={handleAddHomework}
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
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    textAlign: 'center',
  },
  homeworkList: {
    flex: 1,
    padding: 20,
  },
  homeworkCard: {
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
  homeworkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  homeworkTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  overdueIndicator: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  overdueText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
    fontFamily: 'Inter-SemiBold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  homeworkDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  homeworkDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
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
  actionButtons: {
    marginTop: 8,
  },
  gradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  gradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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