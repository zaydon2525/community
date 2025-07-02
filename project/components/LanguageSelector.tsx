import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Globe, Check } from 'lucide-react-native';
import { useI18n } from '@/hooks/useI18n';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { language, changeLanguage, isRTL } = useI18n();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Globe size={24} color="#007BFF" />
            <Text style={[styles.title, isRTL && styles.rtlText]}>
              Select Language
            </Text>
          </View>

          <View style={styles.languageList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  language === lang.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <View style={[styles.languageInfo, isRTL && styles.rtlLanguageInfo]}>
                  <Text style={[
                    styles.languageName,
                    language === lang.code && styles.selectedText,
                    isRTL && styles.rtlText
                  ]}>
                    {lang.name}
                  </Text>
                  <Text style={[
                    styles.nativeName,
                    language === lang.code && styles.selectedText,
                    isRTL && styles.rtlText
                  ]}>
                    {lang.nativeName}
                  </Text>
                </View>
                {language === lang.code && (
                  <Check size={20} color="#007BFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeButtonText, isRTL && styles.rtlText]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    minWidth: 280,
    maxWidth: 320,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  languageList: {
    gap: 8,
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  selectedLanguage: {
    backgroundColor: '#E8F4FD',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  languageInfo: {
    flex: 1,
  },
  rtlLanguageInfo: {
    alignItems: 'flex-end',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  selectedText: {
    color: '#007BFF',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});