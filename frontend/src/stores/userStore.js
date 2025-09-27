import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockApiData } from '@/data/mockData.js'

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref(null)
  const achievements = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const currentLevel = computed(() => profile.value?.level || 0)
  const currentXP = computed(() => profile.value?.current_xp || 0)
  const xpToNextLevel = computed(() => profile.value?.xp_to_next_level || 0)
  const xpProgress = computed(() => {
    if (!profile.value) return 0
    return (profile.value.current_xp / profile.value.xp_to_next_level) * 100
  })
  const isLevelUp = computed(() => {
    if (!profile.value) return false
    return profile.value.current_xp >= profile.value.xp_to_next_level
  })

  // Actions
  const fetchProfile = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock API response
      profile.value = mockApiData.profile
    } catch (err) {
      error.value = 'Failed to fetch profile data'
      console.error('Error fetching profile:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAchievements = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock API response
      achievements.value = mockApiData.achievements
    } catch (err) {
      error.value = 'Failed to fetch achievements data'
      console.error('Error fetching achievements:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAllData = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Fetch both profile and achievements in parallel
      await Promise.all([
        fetchProfile(),
        fetchAchievements()
      ])
    } catch (err) {
      error.value = 'Failed to fetch user data'
      console.error('Error fetching user data:', err)
    } finally {
      loading.value = false
    }
  }

  // Bonus: Level up functionality
  const addXP = (amount) => {
    if (!profile.value) return
    
    profile.value.current_xp += amount
    
    // Check for level up
    if (profile.value.current_xp >= profile.value.xp_to_next_level) {
      levelUp()
    }
  }

  const levelUp = () => {
    if (!profile.value) return
    
    profile.value.level += 1
    profile.value.current_xp = 0
    profile.value.xp_to_next_level = Math.floor(profile.value.xp_to_next_level * 1.2) // Increase XP needed by 20%
    
    // Add new achievement for leveling up
    const newAchievement = {
      id: achievements.value.length + 1,
      title: `Level ${profile.value.level} Master`,
      description: `Reached level ${profile.value.level}!`,
      icon_url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400"
    }
    
    achievements.value.push(newAchievement)
  }

  const resetData = () => {
    profile.value = null
    achievements.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    profile,
    achievements,
    loading,
    error,
    
    // Getters
    currentLevel,
    currentXP,
    xpToNextLevel,
    xpProgress,
    isLevelUp,
    
    // Actions
    fetchProfile,
    fetchAchievements,
    fetchAllData,
    addXP,
    levelUp,
    resetData
  }
})
