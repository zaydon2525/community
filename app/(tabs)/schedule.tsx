import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Calendar, Plus, Clock, Users, X } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';

export default function ScheduleScreen() {
  const { lessons, addLesson } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newLesson, setNewLesson] = useState({
    title: '',
    group: '',
    subject: 'Mathématiques',
    date: '',
    time: '',
    duration: 120,
  });

  const groups = ['Groupe 1', 'Groupe 2'];
  const groupColors = {
    'Groupe 1': '#3B82F6',
    'Groupe 2': '#10B981',
  };

  // Générer les jours du mois
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const getLessonsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return lessons.filter(lesson => lesson.date === dateString);
  };

  const handleAddLesson = () => {
    if (!newLesson.title || !newLesson.group || !newLesson.date || !newLesson.time) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    addLesson({
      ...newLesson,
      color: groupColors[newLesson.group as keyof typeof groupColors] || '#6B7280',
    });

    setNewLesson({
      title: '',
      group: '',
      subject: 'Mathématiques',
      date: '',
      time: '',
      duration: 120,
    });
    setShowAddModal(false);
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planning</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation du mois */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity 
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </Text>
          
          <TouchableOpacity 
            onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            style={styles.navButton}
          >
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Calendrier */}
        <View style={styles.calendar}>
          {/* En-têtes des jours */}
          <View style={styles.weekHeader}>
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          {/* Grille du calendrier */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((date, index) => {
              const dayLessons = getLessonsForDate(date);
              const isCurrentMonthDay = isCurrentMonth(date);
              const isTodayDate = isToday(date);

              return (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.calendarDay,
                    !isCurrentMonthDay && styles.otherMonthDay,
                    isTodayDate && styles.todayDay,
                  ]}
                >
                  <Text style={[
                    styles.dayNumber,
                    !isCurrentMonthDay && styles.otherMonthText,
                    isTodayDate && styles.todayText,
                  ]}>
                    {date.getDate()}
                  </Text>
                  
                  {dayLessons.length > 0 && (
                    <View style={styles.lessonsIndicator}>
                      {dayLessons.slice(0, 2).map((lesson, lessonIndex) => (
                        <View 
                          key={lessonIndex}
                          style={[
                            styles.lessonDot,
                            { backgroundColor: lesson.color }
                          ]} 
                        />
                      ))}
                      {dayLessons.length > 2 && (
                        <Text style={styles.moreLessons}>+{dayLessons.length - 2}</Text>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Liste des cours du jour sélectionné */}
        <View style={styles.todayLessons}>
          <Text style={styles.sectionTitle}>
            Cours d'aujourd'hui ({new Date().toLocaleDateString('fr-FR')})
          </Text>
          
          {getLessonsForDate(new Date()).length > 0 ? (
            getLessonsForDate(new Date()).map((lesson) => (
              <View key={lesson.id} style={styles.lessonCard}>
                <View style={[styles.lessonColorBar, { backgroundColor: lesson.color }]} />
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonGroup}>{lesson.group}</Text>
                  <View style={styles.lessonDetails}>
                    <View style={styles.lessonDetail}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.lessonDetailText}>
                        {formatTime(lesson.time)} ({lesson.duration}min)
                      </Text>
                    </View>
                    <View style={styles.lessonDetail}>
                      <Users size={14} color="#6B7280" />
                      <Text style={styles.lessonDetailText}>{lesson.subject}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucun cours aujourd'hui</Text>
            </View>
          )}
        </View>

        {/* Légende des groupes */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Groupes</Text>
          {groups.map((group) => (
            <View key={group} style={styles.legendItem}>
              <View style={[
                styles.legendColor, 
                { backgroundColor: groupColors[group as keyof typeof groupColors] }
              ]} />
              <Text style={styles.legendText}>{group}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal d'ajout de cours */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nouveau cours</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titre du cours *</Text>
              <TextInput
                style={styles.textInput}
                value={newLesson.title}
                onChangeText={(text) => setNewLesson({ ...newLesson, title: text })}
                placeholder="Ex: Fonctions exponentielles"
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
                      newLesson.group === group && styles.groupOptionSelected
                    ]}
                    onPress={() => setNewLesson({ ...newLesson, group })}
                  >
                    <Text style={[
                      styles.groupOptionText,
                      newLesson.group === group && styles.groupOptionTextSelected
                    ]}>
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date *</Text>
              <TextInput
                style={styles.textInput}
                value={newLesson.date}
                onChangeText={(text) => setNewLesson({ ...newLesson, date: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Heure *</Text>
              <TextInput
                style={styles.textInput}
                value={newLesson.time}
                onChangeText={(text) => setNewLesson({ ...newLesson, time: text })}
                placeholder="HH:MM"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Durée (minutes)</Text>
              <TextInput
                style={styles.textInput}
                value={newLesson.duration.toString()}
                onChangeText={(text) => setNewLesson({ ...newLesson, duration: parseInt(text) || 120 })}
                placeholder="120"
                keyboardType="numeric"
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
              onPress={handleAddLesson}
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
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 20,
    color: '#374151',
    fontFamily: 'Inter-Bold',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    textTransform: 'capitalize',
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  todayDay: {
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter-Medium',
  },
  otherMonthText: {
    color: '#9CA3AF',
  },
  todayText: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  lessonsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  lessonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreLessons: {
    fontSize: 8,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  todayLessons: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonColorBar: {
    width: 4,
  },
  lessonContent: {
    flex: 1,
    padding: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  lessonGroup: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  lessonDetails: {
    gap: 4,
  },
  lessonDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lessonDetailText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  legend: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
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