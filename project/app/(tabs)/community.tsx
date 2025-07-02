import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Plus, Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal, Hash, TrendingUp, Clock, Users, BookOpen, Briefcase, CircleHelp as HelpCircle } from 'lucide-react-native';
import CreatePostModal from '@/components/CreatePostModal';
import { useI18n } from '@/hooks/useI18n';

interface Post {
  id: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified?: boolean;
  };
  timestamp: Date;
  likes: number;
  comments: Comment[];
  images?: string[];
  liked: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  likes: number;
  replies: Reply[];
  liked: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  likes: number;
  liked: boolean;
}

export default function CommunityScreen() {
  const { t, isRTL } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  const userProfile = {
    name: 'Mohamed Alami',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Professeur de Mathématiques',
  };

  const categories = [
    { id: 'all', label: t('community.categories.all'), icon: TrendingUp, count: 245 },
    { id: 'teaching', label: t('community.categories.teaching'), icon: BookOpen, count: 89 },
    { id: 'jobs', label: t('community.categories.jobs'), icon: Briefcase, count: 67 },
    { id: 'resources', label: t('community.categories.resources'), icon: Users, count: 54 },
    { id: 'questions', label: t('community.categories.questions'), icon: HelpCircle, count: 35 },
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Bonjour à tous ! Je viens de terminer une formation sur les nouvelles méthodes d\'enseignement des mathématiques. Quelqu\'un a-t-il déjà expérimenté l\'approche par projets en classe ? J\'aimerais avoir vos retours d\'expérience.',
      category: 'teaching',
      author: {
        name: 'Dr. Fatima Benali',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Professeur de Mathématiques',
        verified: true,
      },
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      comments: [
        {
          id: 'c1',
          content: 'J\'ai testé cette approche l\'année dernière avec mes élèves de 3ème. Les résultats sont impressionnants !',
          author: {
            name: 'Ahmed Benali',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          timestamp: new Date(Date.now() - 1800000),
          likes: 8,
          replies: [],
          liked: false,
        },
      ],
      images: ['https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400'],
      liked: false,
    },
    {
      id: '2',
      content: 'Recherche des ressources pour enseigner la physique quantique au niveau lycée. Avez-vous des recommandations de livres ou de vidéos pédagogiques ?',
      category: 'resources',
      author: {
        name: 'Prof. Youssef Alami',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Professeur de Physique',
      },
      timestamp: new Date(Date.now() - 7200000),
      likes: 15,
      comments: [],
      liked: true,
    },
    {
      id: '3',
      content: 'Excellente nouvelle ! Notre école vient d\'ouvrir 5 nouveaux postes pour la rentrée prochaine. N\'hésitez pas à postuler si vous êtes intéressés.',
      category: 'jobs',
      author: {
        name: 'École Al Madina',
        avatar: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
        role: 'Administration',
      },
      timestamp: new Date(Date.now() - 10800000),
      likes: 42,
      comments: [
        {
          id: 'c2',
          content: 'Quelles sont les matières recherchées ?',
          author: {
            name: 'Amina Khalil',
            avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
          },
          timestamp: new Date(Date.now() - 9000000),
          likes: 3,
          replies: [
            {
              id: 'r1',
              content: 'Mathématiques, Physique, Français, Anglais et SVT',
              author: {
                name: 'École Al Madina',
                avatar: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
              },
              timestamp: new Date(Date.now() - 8400000),
              likes: 5,
              liked: false,
            },
          ],
          liked: false,
        },
      ],
      liked: false,
    },
  ]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);

    if (minutes < 1) return t('community.timeAgo.now');
    if (minutes < 60) return minutes === 1 ? t('community.timeAgo.minute') : t('community.timeAgo.minutes', { count: minutes });
    if (hours < 24) return hours === 1 ? t('community.timeAgo.hour') : t('community.timeAgo.hours', { count: hours });
    if (days < 7) return days === 1 ? t('community.timeAgo.day') : t('community.timeAgo.days', { count: days });
    return weeks === 1 ? t('community.timeAgo.week') : t('community.timeAgo.weeks', { count: weeks });
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
                : comment
            )
          }
        : post
    ));
  };

  const toggleCommentsExpanded = (postId: string) => {
    setExpandedComments(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const addComment = (postId: string) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: commentText.trim(),
      author: {
        name: userProfile.name,
        avatar: userProfile.avatar,
      },
      timestamp: new Date(),
      likes: 0,
      replies: [],
      liked: false,
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment({ ...newComment, [postId]: '' });
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Hash;
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
          {t('community.title')}
        </Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreatePost(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, isRTL && styles.rtlSearchBar]}>
          <Search size={20} color="#8E8E93" />
          <TextInput
            style={[styles.searchInput, isRTL && styles.rtlTextInput]}
            placeholder={t('common.search')}
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
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryChip, 
                activeCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <IconComponent 
                size={16} 
                color={activeCategory === category.id ? '#FFFFFF' : '#8E8E93'} 
              />
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.categoryTextActive,
                isRTL && styles.rtlText
              ]}>
                {category.label} ({category.count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Posts Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {filteredPosts.map((post) => {
          const CategoryIcon = getCategoryIcon(post.category);
          const isCommentsExpanded = expandedComments.includes(post.id);
          
          return (
            <View key={post.id} style={styles.postCard}>
              {/* Post Header */}
              <View style={[styles.postHeader, isRTL && styles.rtlRow]}>
                <Image source={{ uri: post.author.avatar }} style={styles.authorAvatar} />
                <View style={[styles.authorInfo, isRTL && styles.rtlAuthorInfo]}>
                  <View style={[styles.authorNameContainer, isRTL && styles.rtlRow]}>
                    <Text style={[styles.authorName, isRTL && styles.rtlText]}>
                      {post.author.name}
                    </Text>
                    {post.author.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.authorRole, isRTL && styles.rtlText]}>
                    {post.author.role}
                  </Text>
                  <View style={[styles.postMeta, isRTL && styles.rtlRow]}>
                    <CategoryIcon size={12} color="#8E8E93" />
                    <Text style={[styles.postTime, isRTL && styles.rtlText]}>
                      {formatTimeAgo(post.timestamp)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={20} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              {/* Post Content */}
              <Text style={[styles.postContent, isRTL && styles.rtlText]}>
                {post.content}
              </Text>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.imagesContainer}
                >
                  {post.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.postImage} />
                  ))}
                </ScrollView>
              )}

              {/* Post Actions */}
              <View style={[styles.postActions, isRTL && styles.rtlRow]}>
                <TouchableOpacity 
                  style={[styles.actionButton, isRTL && styles.rtlActionButton]}
                  onPress={() => toggleLike(post.id)}
                >
                  <Heart 
                    size={20} 
                    color={post.liked ? '#FF3B30' : '#8E8E93'} 
                    fill={post.liked ? '#FF3B30' : 'transparent'}
                  />
                  <Text style={[
                    styles.actionText, 
                    post.liked && styles.likedText,
                    isRTL && styles.rtlText
                  ]}>
                    {post.likes} {t('community.like')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, isRTL && styles.rtlActionButton]}
                  onPress={() => toggleCommentsExpanded(post.id)}
                >
                  <MessageCircle size={20} color="#8E8E93" />
                  <Text style={[styles.actionText, isRTL && styles.rtlText]}>
                    {post.comments.length} {t('community.comments')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, isRTL && styles.rtlActionButton]}>
                  <Share size={20} color="#8E8E93" />
                  <Text style={[styles.actionText, isRTL && styles.rtlText]}>
                    {t('common.share')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Comments Section */}
              {isCommentsExpanded && (
                <View style={styles.commentsSection}>
                  {/* Add Comment */}
                  <View style={[styles.addCommentContainer, isRTL && styles.rtlRow]}>
                    <Image source={{ uri: userProfile.avatar }} style={styles.commentAvatar} />
                    <View style={styles.commentInputContainer}>
                      <TextInput
                        style={[styles.commentInput, isRTL && styles.rtlTextInput]}
                        placeholder={t('community.writeComment')}
                        value={newComment[post.id] || ''}
                        onChangeText={(text) => setNewComment({ ...newComment, [post.id]: text })}
                        placeholderTextColor="#8E8E93"
                        multiline
                      />
                      <TouchableOpacity 
                        style={styles.sendCommentButton}
                        onPress={() => addComment(post.id)}
                      >
                        <Text style={[styles.sendCommentText, isRTL && styles.rtlText]}>
                          {t('community.comment')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Comments List */}
                  {post.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <View style={[styles.commentHeader, isRTL && styles.rtlRow]}>
                        <Image source={{ uri: comment.author.avatar }} style={styles.commentAvatar} />
                        <View style={[styles.commentContent, isRTL && styles.rtlCommentContent]}>
                          <View style={styles.commentBubble}>
                            <Text style={[styles.commentAuthor, isRTL && styles.rtlText]}>
                              {comment.author.name}
                            </Text>
                            <Text style={[styles.commentText, isRTL && styles.rtlText]}>
                              {comment.content}
                            </Text>
                          </View>
                          <View style={[styles.commentActions, isRTL && styles.rtlRow]}>
                            <TouchableOpacity 
                              onPress={() => toggleCommentLike(post.id, comment.id)}
                            >
                              <Text style={[
                                styles.commentActionText,
                                comment.liked && styles.likedText,
                                isRTL && styles.rtlText
                              ]}>
                                {t('community.like')} ({comment.likes})
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Text style={[styles.commentActionText, isRTL && styles.rtlText]}>
                                {t('community.reply')}
                              </Text>
                            </TouchableOpacity>
                            <Text style={[styles.commentTime, isRTL && styles.rtlText]}>
                              {formatTimeAgo(comment.timestamp)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Replies */}
                      {comment.replies.map((reply) => (
                        <View key={reply.id} style={[styles.replyItem, isRTL && styles.rtlReplyItem]}>
                          <Image source={{ uri: reply.author.avatar }} style={styles.replyAvatar} />
                          <View style={styles.replyContent}>
                            <View style={styles.replyBubble}>
                              <Text style={[styles.replyAuthor, isRTL && styles.rtlText]}>
                                {reply.author.name}
                              </Text>
                              <Text style={[styles.replyText, isRTL && styles.rtlText]}>
                                {reply.content}
                              </Text>
                            </View>
                            <Text style={[styles.replyTime, isRTL && styles.rtlText]}>
                              {formatTimeAgo(reply.timestamp)}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.loadMoreContainer}>
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={[styles.loadMoreText, isRTL && styles.rtlText]}>
              Load more posts
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CreatePostModal
        visible={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onCreatePost={handleCreatePost}
        userProfile={userProfile}
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
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  rtlSearchBar: {
    flexDirection: 'row-reverse',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
  },
  rtlTextInput: {
    textAlign: 'right',
    writingDirection: 'rtl',
    marginLeft: 0,
    marginRight: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
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
  feed: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  rtlAuthorInfo: {
    alignItems: 'flex-end',
    marginRight: 12,
    marginLeft: 0,
  },
  authorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  authorRole: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  imagesContainer: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  postImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 24,
  },
  rtlActionButton: {
    flexDirection: 'row-reverse',
    marginRight: 0,
    marginLeft: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  likedText: {
    color: '#FF3B30',
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    gap: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentInputContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
    minHeight: 20,
    maxHeight: 80,
  },
  sendCommentButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  sendCommentText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Inter-SemiBold',
  },
  commentItem: {
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  commentContent: {
    flex: 1,
  },
  rtlCommentContent: {
    alignItems: 'flex-end',
  },
  commentBubble: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 12,
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 4,
  },
  commentActionText: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Medium',
  },
  commentTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
  },
  replyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginLeft: 44,
    marginTop: 8,
  },
  rtlReplyItem: {
    flexDirection: 'row-reverse',
    marginLeft: 0,
    marginRight: 44,
  },
  replyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  replyContent: {
    flex: 1,
  },
  replyBubble: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 8,
    marginBottom: 2,
  },
  replyAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  replyText: {
    fontSize: 12,
    color: '#1C1C1E',
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  replyTime: {
    fontSize: 10,
    color: '#8E8E93',
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 4,
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