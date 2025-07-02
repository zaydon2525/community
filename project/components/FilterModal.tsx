import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { X, MapPin, DollarSign, Clock, BookOpen } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  type: 'jobs' | 'schools' | 'tutoring' | 'resources';
}

export default function FilterModal({ visible, onClose, onApplyFilters, type }: FilterModalProps) {
  const [filters, setFilters] = useState({
    location: '',
    subject: '',
    level: '',
    salary: '',
    contractType: '',
    experience: '',
    availability: '',
    rating: '',
    resourceType: '',
  });

  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda'];
  const subjects = ['Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais', 'Histoire', 'Géographie', 'SVT'];
  const levels = ['Primaire', 'Collège', 'Lycée', 'Supérieur', 'Tous niveaux'];
  const contractTypes = ['CDI', 'CDD', 'Temps partiel', 'Vacataire'];
  const experienceRanges = ['0-2 ans', '3-5 ans', '6-10 ans', '10+ ans'];
  const resourceTypes = ['PDF', 'Vidéo', 'Audio', 'Présentation'];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      location: '',
      subject: '',
      level: '',
      salary: '',
      contractType: '',
      experience: '',
      availability: '',
      rating: '',
      resourceType: '',
    });
  };

  const renderFilterSection = (title: string, options: string[], filterKey: string) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              filters[filterKey as keyof typeof filters] === option && styles.optionButtonActive,
            ]}
            onPress={() => setFilters({ ...filters, [filterKey]: option })}
          >
            <Text
              style={[
                styles.optionText,
                filters[filterKey as keyof typeof filters] === option && styles.optionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filtres</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderFilterSection('Ville', cities, 'location')}
          {renderFilterSection('Matière', subjects, 'subject')}
          {renderFilterSection('Niveau', levels, 'level')}

          {type === 'jobs' && (
            <>
              {renderFilterSection('Type de contrat', contractTypes, 'contractType')}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>Salaire (DH/mois)</Text>
                <View style={styles.inputWrapper}>
                  <DollarSign size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 8000-12000"
                    value={filters.salary}
                    onChangeText={(text) => setFilters({ ...filters, salary: text })}
                    placeholderTextColor="#8E8E93"
                  />
                </View>
              </View>
            </>
          )}

          {type === 'tutoring' && (
            <>
              {renderFilterSection('Expérience', experienceRanges, 'experience')}
              {renderFilterSection('Disponibilité', ['Disponible', 'Occupé'], 'availability')}
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>Tarif (DH/heure)</Text>
                <View style={styles.inputWrapper}>
                  <DollarSign size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 100-200"
                    value={filters.salary}
                    onChangeText={(text) => setFilters({ ...filters, salary: text })}
                    placeholderTextColor="#8E8E93"
                  />
                </View>
              </View>
            </>
          )}

          {type === 'schools' && (
            <>
              {renderFilterSection('Note minimum', ['4+', '4.5+', '4.8+'], 'rating')}
            </>
          )}

          {type === 'resources' && (
            <>
              {renderFilterSection('Type de ressource', resourceTypes, 'resourceType')}
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Appliquer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    fontFamily: 'Inter-Bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterSection: {
    marginBottom: 32,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  optionButtonActive: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  optionText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});