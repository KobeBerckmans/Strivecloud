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
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock API response
      profile.value = mockApiData.profile
    } catch (err) {
      error.value = 'Failed to fetch profile data'
      console.error('Error fetching profile:', err)
      throw err
    }
  }

  const fetchAchievements = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock API response
      achievements.value = mockApiData.achievements
    } catch (err) {
      error.value = 'Failed to fetch achievements data'
      console.error('Error fetching achievements:', err)
      throw err
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
      
      // Check for any achievements that should be unlocked based on current level
      checkAchievementUnlocks()
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
    
    // Check for achievement unlocks based on XP
    checkAchievementUnlocks()
    
    // Check for level up
    if (profile.value.current_xp >= profile.value.xp_to_next_level) {
      levelUp()
    }
  }

  const levelUp = () => {
    if (!profile.value) return
    
    profile.value.level += 1
    profile.value.current_xp = 0
    // Calculate XP needed for next level based on level progression
    // Level 1: 100, Level 2: 200, Level 3: 300, Level 4: 400, Level 5: 500, Level 6: 600, Level 7: 700, Level 8: 1500, Level 9: 2000, Level 10: 2500
    const xpRequirements = [100, 200, 300, 400, 500, 600, 700, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
    profile.value.xp_to_next_level = xpRequirements[profile.value.level - 1] || Math.floor(profile.value.xp_to_next_level * 1.2)
    
    // Check for achievement unlocks based on level
    checkAchievementUnlocks()
  }

  const checkAchievementUnlocks = () => {
    if (!profile.value || !achievements.value) return
    
    const currentLevel = profile.value.level
    const currentXP = profile.value.current_xp
    
    // Check each achievement for unlock conditions
    achievements.value.forEach(achievement => {
      if (!achievement.unlocked) {
        // First Step - unlocked at level 1 (already handled in reset)
        if (achievement.id === 1 && currentLevel >= 1) {
          achievement.unlocked = true
        }
        // Rookie Master - unlocked at level 5
        if (achievement.id === 2 && currentLevel >= 5) {
          achievement.unlocked = true
        }
        // Task Warrior - unlocked at level 8 (or when reaching 1000 total XP)
        if (achievement.id === 3 && (currentLevel >= 8 || currentXP >= 1000)) {
          achievement.unlocked = true
        }
        // Level 10 Champion - unlocked at level 10
        if (achievement.id === 4 && currentLevel >= 10) {
          achievement.unlocked = true
        }
        // Consistency King - unlocked at level 15 (or after 7 consecutive logins)
        if (achievement.id === 5 && currentLevel >= 15) {
          achievement.unlocked = true
        }
      }
    })
  }

  const resetData = () => {
    // Reset to initial state with level 1
    profile.value = {
      name: "Alex Smith",
      avatar_url: "https://storage.gameindustry.be/OrTHdlRz-il4kDXrH-GJETNn8K-DPLl1B7t-strivewebsite2.png",
      level: 1,
      current_xp: 0,
      xp_to_next_level: 100
    }
    
    // Reset achievements to all locked initially
    achievements.value = [
      {
        id: 1,
        title: "First Step",
        description: "Completed your first task.",
        icon_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400",
        unlocked: false
      },
      {
        id: 2,
        title: "Rookie Master",
        description: "Reached level 5.",
        icon_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        unlocked: false
      },
      {
        id: 3,
        title: "Task Warrior",
        description: "Completed 50 tasks.",
        icon_url: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=400",
        unlocked: false
      },
      {
        id: 4,
        title: "Level 10 Champion",
        description: "Reached level 10.",
        icon_url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400",
        unlocked: false
      },
      {
        id: 5,
        title: "Consistency King",
        description: "Logged in for 7 consecutive days.",
        icon_url: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400",
        unlocked: false
      }
    ]
    
    // Check for achievements that should be unlocked at level 1
    checkAchievementUnlocks()
    
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
    checkAchievementUnlocks,
    resetData
  }
})
