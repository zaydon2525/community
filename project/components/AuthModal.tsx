import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react-native';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ visible, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'parent'>('teacher');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    city: '',
    subjects: '',
    experience: '',
  });

  const handleAuth = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Simulate authentication
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      fullName: formData.fullName || 'Utilisateur',
      userType,
      phone: formData.phone,
      city: formData.city,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      experience: formData.experience,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    };

    onAuthSuccess(user);
    onClose();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      city: '',
      subjects: '',
      experience: '',
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isLogin ? 'Connexion' : 'Inscription'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!isLogin && (
            <View style={styles.userTypeContainer}>
              <Text style={styles.label}>Type de compte</Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'teacher' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('teacher')}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === 'teacher' && styles.userTypeTextActive,
                    ]}
                  >
                    Professeur
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'parent' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('parent')}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === 'parent' && styles.userTypeTextActive,
                    ]}
                  >
                    Parent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#8E8E93" />
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#8E8E93"
              />
            </View>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom complet *</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color="#8E8E93" />
                <TextInput
                  style={styles.input}
                  placeholder="Votre nom complet"
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                  placeholderTextColor="#8E8E93"
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe *</Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#8E8E93" />
              <TextInput
                style={styles.input}
                placeholder="Votre mot de passe"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                placeholderTextColor="#8E8E93"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#8E8E93" />
                ) : (
                  <Eye size={20} color="#8E8E93" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmer le mot de passe *</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#8E8E93" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmer votre mot de passe"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#8E8E93"
                />
              </View>
            </View>
          )}

          {!isLogin && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Téléphone</Text>
                <View style={styles.inputWrapper}>
                  <Phone size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="+212 6XX XXX XXX"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    keyboardType="phone-pad"
                    placeholderTextColor="#8E8E93"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ville</Text>
                <View style={styles.inputWrapper}>
                  <MapPin size={20} color="#8E8E93" />
                  <TextInput
                    style={styles.input}
                    placeholder="Votre ville"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                    placeholderTextColor="#8E8E93"
                  />
                </View>
              </View>

              {userType === 'teacher' && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Matières enseignées</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Mathématiques, Physique, ..."
                        value={formData.subjects}
                        onChangeText={(text) => setFormData({ ...formData, subjects: text })}
                        placeholderTextColor="#8E8E93"
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Années d'expérience</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="5 ans"
                        value={formData.experience}
                        onChangeText={(text) => setFormData({ ...formData, experience: text })}
                        placeholderTextColor="#8E8E93"
                      />
                    </View>
                  </View>
                </>
              )}
            </>
          )}

          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </Text>
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            </Text>
            <TouchableOpacity onPress={switchMode}>
              <Text style={styles.switchLink}>
                {isLogin ? 'S\'inscrire' : 'Se connecter'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialContainer}>
            <Text style={styles.orText}>ou</Text>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continuer avec Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continuer avec Facebook</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  userTypeContainer: {
    marginBottom: 24,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  userTypeText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
  userTypeTextActive: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
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
  authButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30,
  },
  switchText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  switchLink: {
    fontSize: 16,
    color: '#007BFF',
    fontFamily: 'Inter-SemiBold',
  },
  socialContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  orText: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  socialButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
  },
});