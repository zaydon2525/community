import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Users, BookOpen, TrendingUp, AlertCircle } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';

export default function DashboardScreen() {
  const { students, homework, lessons } = useApp();

  // Calculs pour les statistiques
  const upcomingLessons = lessons
    .filter(lesson => new Date(lesson.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const uncorrectedHomework = homework.filter(hw => hw.status === 'submitted').length;
  const absentStudents = students.filter(student => student.status === 'absent');
  const lateStudents = students.filter(student => student.status === 'late');

  const totalStudents = students.length;
  const presentStudents = students.filter(student => student.status === 'present').length;
  const attendanceRate = totalStudents > 0 ? (presentStudents / totalStudents) * 100 : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bonjour,</Text>
          <Text style={styles.teacherName}>Prof. Dupont</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </Text>
        </View>

        {/* Statistiques rapides */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#EBF8FF' }]}>
              <Users size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>{totalStudents}</Text>
            <Text style={styles.statLabel}>Élèves</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
              <TrendingUp size={24} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{attendanceRate.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Présence</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
              <BookOpen size={24} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>{uncorrectedHomework}</Text>
            <Text style={styles.statLabel}>À corriger</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FEE2E2' }]}>
              <AlertCircle size={24} color="#EF4444" />
            </View>
            <Text style={styles.statNumber}>{absentStudents.length + lateStudents.length}</Text>
            <Text style={styles.statLabel}>Absents/Retards</Text>
          </View>
        </View>

        {/* Prochains cours */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#374151" />
            <Text style={styles.sectionTitle}>Prochains cours</Text>
          </View>
          
          {upcomingLessons.length > 0 ? (
            upcomingLessons.map((lesson) => (
              <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
                <View style={[styles.lessonColorBar, { backgroundColor: lesson.color }]} />
                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonGroup}>{lesson.group}</Text>
                  <View style={styles.lessonDetails}>
                    <View style={styles.lessonDetail}>
                      <Calendar size={14} color="#6B7280" />
                      <Text style={styles.lessonDetailText}>
                        {formatDate(lesson.date)}
                      </Text>
                    </View>
                    <View style={styles.lessonDetail}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.lessonDetailText}>
                        {formatTime(lesson.time)} ({lesson.duration}min)
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Aucun cours programmé</Text>
            </View>
          )}
        </View>

        {/* Alertes */}
        {(absentStudents.length > 0 || lateStudents.length > 0) && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertCircle size={20} color="#EF4444" />
              <Text style={styles.sectionTitle}>Alertes</Text>
            </View>

            {absentStudents.length > 0 && (
              <View style={styles.alertCard}>
                <Text style={styles.alertTitle}>Élèves absents aujourd'hui</Text>
                {absentStudents.map((student) => (
                  <Text key={student.id} style={styles.alertStudent}>
                    • {student.name} ({student.group})
                  </Text>
                ))}
              </View>
            )}

            {lateStudents.length > 0 && (
              <View style={styles.alertCard}>
                <Text style={styles.alertTitle}>Élèves en retard aujourd'hui</Text>
                {lateStudents.map((student) => (
                  <Text key={student.id} style={styles.alertStudent}>
                    • {student.name} ({student.group})
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Devoirs à corriger */}
        {uncorrectedHomework > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <BookOpen size={20} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Devoirs à corriger</Text>
            </View>
            
            {homework
              .filter(hw => hw.status === 'submitted')
              .map((hw) => (
                <TouchableOpacity key={hw.id} style={styles.homeworkCard}>
                  <Text style={styles.homeworkTitle}>{hw.title}</Text>
                  <Text style={styles.homeworkGroup}>{hw.group}</Text>
                  <Text style={styles.homeworkDue}>
                    Échéance: {new Date(hw.dueDate).toLocaleDateString('fr-FR')}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  teacherName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
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
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
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
  alertCard: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  alertStudent: {
    fontSize: 14,
    color: '#7F1D1D',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  homeworkCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  homeworkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  homeworkGroup: {
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  homeworkDue: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
});