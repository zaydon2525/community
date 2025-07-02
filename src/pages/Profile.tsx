import React, { useState } from 'react'
import { 
  Settings, 
  Edit3, 
  Star, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Trophy, 
  Calendar, 
  MapPin, 
  Globe 
} from 'lucide-react'
import { User } from '../types'

interface ProfileProps {
  user: User | null
  language: 'en' | 'ar'
}

const Profile: React.FC<ProfileProps> = ({ user, language }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const t = {
    profile: language === 'ar' ? 'الملف الشخصي' : 'Profile',
    editProfile: language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile',
    myApplications: language === 'ar' ? 'طلباتي' : 'My Applications',
    myCourses: language === 'ar' ? 'دروسي' : 'My Courses',
    myResources: language === 'ar' ? 'مواردي' : 'My Resources',
    messages: language === 'ar' ? 'الرسائل' : 'Messages',
    notifications: language === 'ar' ? 'الإشعارات' : 'Notifications',
    language: language === 'ar' ? 'اللغة' : 'Language',
    privacy: language === 'ar' ? 'الخصوصية' : 'Privacy',
    preferences: language === 'ar' ? 'التفضيلات' : 'Preferences',
    helpCenter: language === 'ar' ? 'مركز المساعدة' : 'Help Center',
    logout: language === 'ar' ? 'تسجيل الخروج' : 'Logout',
    achievements: language === 'ar' ? 'الإنجازات' : 'Achievements',
    newMember: language === 'ar' ? 'عضو جديد' : 'New Member',
    welcomeCommunity: language === 'ar' ? 'مرحباً بك في المجتمع' : 'Welcome to the community',
    firstCourse: language === 'ar' ? 'أول درس' : 'First Course',
    firstTutoring: language === 'ar' ? 'أول درس خصوصي' : 'First tutoring session',
    wellRated: language === 'ar' ? 'تقييم جيد' : 'Well Rated',
    positiveReviews: language === 'ar' ? '10+ تقييمات إيجابية' : '10+ positive reviews',
    applications: language === 'ar' ? 'الطلبات' : 'Applications',
    coursesGiven: language === 'ar' ? 'دروس مُعطاة' : 'Courses Given',
    reviewsReceived: language === 'ar' ? 'تقييمات مُستلمة' : 'Reviews Received',
    resources: language === 'ar' ? 'الموارد' : 'Resources',
    yearsExperience: language === 'ar' ? 'سنوات الخبرة' : 'Years of Experience',
    version: language === 'ar' ? 'الإصدار' : 'Version',
  }

  const userStats = [
    { label: t.applications, value: '12', icon: Briefcase, color: 'text-blue-600' },
    { label: t.coursesGiven, value: '45', icon: BookOpen, color: 'text-green-600' },
    { label: t.reviewsReceived, value: '89', icon: Star, color: 'text-yellow-600' },
    { label: t.resources, value: '23', icon: Users, color: 'text-purple-600' },
  ]

  const menuSections = [
    {
      title: t.profile,
      items: [
        { label: t.editProfile, icon: Edit3, color: 'text-blue-600' },
        { label: t.myApplications, icon: Briefcase, color: 'text-blue-600' },
        { label: t.myCourses, icon: BookOpen, color: 'text-green-600' },
        { label: t.myResources, icon: Users, color: 'text-purple-600' },
      ]
    },
    {
      title: language === 'ar' ? 'التواصل' : 'Communication',
      items: [
        { label: t.messages, icon: MessageCircle, color: 'text-blue-600', badge: '3' },
        { label: t.notifications, icon: Bell, color: 'text-orange-600' },
      ]
    },
    {
      title: language === 'ar' ? 'الإعدادات' : 'Settings',
      items: [
        { 
          label: `${t.language} (${language === 'ar' ? 'العربية' : 'English'})`, 
          icon: Globe, 
          color: 'text-gray-600',
          onPress: () => setShowLanguageSelector(true)
        },
        { label: t.privacy, icon: Shield, color: 'text-gray-600' },
        { label: t.preferences, icon: Settings, color: 'text-gray-600' },
        { label: t.helpCenter, icon: HelpCircle, color: 'text-gray-600' },
      ]
    }
  ]

  const achievements = [
    { title: t.newMember, description: t.welcomeCommunity, icon: Trophy, color: 'text-orange-600' },
    { title: t.firstCourse, description: t.firstTutoring, icon: BookOpen, color: 'text-green-600' },
    { title: t.wellRated, description: t.positiveReviews, icon: Star, color: 'text-yellow-600' },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'لم يتم العثور على المستخدم' : 'User not found'}
          </h2>
          <p className="text-gray-600">
            {language === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى ملفك الشخصي' : 'Please log in to access your profile'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.profile}</h1>
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-blue-600 font-medium">
                  {user.role === 'teacher' && (language === 'ar' ? 'معلم' : 'Teacher')}
                  {user.role === 'parent' && (language === 'ar' ? 'ولي أمر' : 'Parent')}
                  {user.role === 'school' && (language === 'ar' ? 'مدرسة' : 'School')}
                </p>
                {user.city && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{user.city}</span>
                  </div>
                )}
              </div>
            </div>
            <button className="btn-secondary">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium text-gray-900">4.8</span>
              <span className="ml-1 text-gray-500">(89 {language === 'ar' ? 'تقييم' : 'reviews'})</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{user.experience || '8'} {t.yearsExperience}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-6">
            {language === 'ar'
              ? 'معلم متحمس مع 8 سنوات من الخبرة في تدريس الرياضيات. متخصص في التحضير للبكالوريا والدروس الخصوصية.'
              : 'Passionate teacher with 8 years of experience in mathematics education. Specialized in Baccalaureate preparation and private tutoring.'
            }
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className={`w-8 h-8 ${stat.color} mx-auto mb-2`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.achievements}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="card text-center">
                  <div className={`w-12 h-12 ${achievement.color} mx-auto mb-3`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
            <div className="card">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <button
                    key={itemIndex}
                    onClick={item.onPress}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${item.color}`}>
                        <Icon className="w-full h-full" />
                      </div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="mb-8">
          <button className="w-full card flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t.logout}</span>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center text-gray-500 text-sm">
          {t.version} 1.0.0
        </div>
      </div>
    </div>
  )
}

export default Profile