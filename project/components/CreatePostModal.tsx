import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { X, Camera, Image as ImageIcon, Hash } from 'lucide-react-native';
import { useI18n } from '@/hooks/useI18n';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onCreatePost: (post: any) => void;
  userProfile: {
    name: string;
    avatar: string;
    role: string;
  };
}

export default function CreatePostModal({ 
  visible, 
  onClose, 
  onCreatePost, 
  userProfile 
}: CreatePostModalProps) {
  const { t, isRTL } = useI18n();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const categories = [
    { id: 'general', label: t('community.categories.general') },
    { id: 'teaching', label: t('community.categories.teaching') },
    { id: 'jobs', label: t('community.categories.jobs') },
    { id: 'resources', label: t('community.categories.resources') },
    { id: 'questions', label: t('community.categories.questions') },
  ];

  const handleCreatePost = () => {
    if (!content.trim()) {
      Alert.alert(t('common.error'), 'Please write something to post');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      content: content.trim(),
      category,
      author: userProfile,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      images: selectedImages,
      liked: false,
    };

    onCreatePost(newPost);
    setContent('');
    setCategory('general');
    setSelectedImages([]);
    onClose();
  };

  const addSampleImage = () => {
    const sampleImages = [
      'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    ];
    
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setSelectedImages([...selectedImages, randomImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={[styles.title, isRTL && styles.rtlText]}>
            {t('community.createPost')}
          </Text>
          <TouchableOpacity 
            style={[
              styles.postButton,
              !content.trim() && styles.postButtonDisabled
            ]}
            onPress={handleCreatePost}
            disabled={!content.trim()}
          >
            <Text style={[
              styles.postButtonText,
              !content.trim() && styles.postButtonTextDisabled,
              isRTL && styles.rtlText
            ]}>
              {t('community.post')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={[styles.userInfo, isRTL && styles.rtlRow]}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <View style={[styles.userDetails, isRTL && styles.rtlUserDetails]}>
              <Text style={[styles.userName, isRTL && styles.rtlText]}>
                {userProfile.name}
              </Text>
              <Text style={[styles.userRole, isRTL && styles.rtlText]}>
                {userProfile.role}
              </Text>
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.categorySection}>
            <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
              Category
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    category === cat.id && styles.categoryChipActive,
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Hash size={14} color={category === cat.id ? '#FFFFFF' : '#8E8E93'} />
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat.id && styles.categoryTextActive,
                      isRTL && styles.rtlText
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Content Input */}
          <View style={styles.contentSection}>
            <TextInput
              style={[
                styles.contentInput,
                isRTL && styles.rtlTextInput
              ]}
              placeholder={t('community.shareExperience')}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <View style={styles.imagesSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.selectedImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <X size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Media Actions */}
          <View style={[styles.mediaActions, isRTL && styles.rtlRow]}>
            <TouchableOpacity style={styles.mediaButton} onPress={addSampleImage}>
              <ImageIcon size={20} color="#007BFF" />
              <Text style={[styles.mediaButtonText, isRTL && styles.rtlText]}>
                Add Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Camera size={20} color="#007BFF" />
              <Text style={[styles.mediaButtonText, isRTL && styles.rtlText]}>
                Camera
              </Text>
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
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
  postButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  postButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  postButtonTextDisabled: {
    color: '#8E8E93',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  rtlUserDetails: {
    alignItems: 'flex-end',
    marginRight: 12,
    marginLeft: 0,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  userRole: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-Regular',
  },
  categorySection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  categoriesContainer: {
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
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
  contentSection: {
    paddingVertical: 16,
  },
  contentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  rtlTextInput: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  imagesSection: {
    paddingVertical: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaActions: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 16,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  mediaButtonText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-Medium',
  },
});