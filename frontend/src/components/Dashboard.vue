<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header mb-5">
      <!-- Background Pattern -->
      <div class="header-bg-pattern"></div>
      
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="header-content">
              <div class="title-section">
                <h1 class="dashboard-title">
                  <span class="title-icon">
                    <i class="bi bi-speedometer2"></i>
                  </span>
                  <span class="title-text">
                    <span class="title-main">Gamified Profile</span>
                    <span class="title-sub">Dashboard</span>
                  </span>
                </h1>
                <p class="dashboard-subtitle">
                  <i class="bi bi-arrow-right-circle me-2"></i>
                  Track your progress, achievements, and level up your skills
                </p>
              </div>
              
              <div class="header-stats">
                <div class="stat-item stat-item-1">
                  <div class="stat-icon-wrapper">
                    <i class="bi bi-trophy-fill"></i>
                  </div>
                  <div class="stat-content">
                    <span class="stat-number">{{ achievements.length }}</span>
                    <span class="stat-label">Achievements</span>
                  </div>
                </div>
                <div class="stat-item stat-item-2">
                  <div class="stat-icon-wrapper">
                    <i class="bi bi-graph-up"></i>
                  </div>
                  <div class="stat-content">
                    <span class="stat-number">{{ currentLevel }}</span>
                    <span class="stat-label">Level</span>
                  </div>
                </div>
                <div class="stat-item stat-item-3">
                  <div class="stat-icon-wrapper">
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <div class="stat-content">
                    <span class="stat-number">{{ currentXP }}</span>
                    <span class="stat-label">XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <div class="header-actions">
              <div class="action-buttons">
                <button 
                  @click="refreshData" 
                  class="btn btn-refresh"
                  :disabled="loading"
                >
                  <i class="bi bi-arrow-clockwise" :class="{ 'spinning': loading }"></i>
                  <span>{{ loading ? 'Loading...' : 'Refresh' }}</span>
                </button>
                <button class="btn btn-settings">
                  <i class="bi bi-gear-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="header-decoration">
        <div class="floating-icon icon-1">🎯</div>
        <div class="floating-icon icon-2">🏆</div>
        <div class="floating-icon icon-3">⭐</div>
        <div class="floating-icon icon-4">🚀</div>
        <div class="floating-icon icon-5">💎</div>
        <div class="floating-icon icon-6">🔥</div>
      </div>
      
      <!-- Progress Bar -->
      <div class="header-progress">
        <div class="progress-line"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Global Loading State -->
      <div v-if="loading && !hasData" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h4 class="text-muted">Loading your dashboard...</h4>
        <p class="text-muted">Please wait while we fetch your data</p>
      </div>

      <!-- Global Error State -->
      <div v-else-if="error && !hasData" class="alert alert-danger text-center" role="alert">
        <i class="bi bi-exclamation-triangle me-2" style="font-size: 1.5rem;"></i>
        <h4>Failed to load dashboard</h4>
        <p class="mb-3">{{ error }}</p>
        <button @click="fetchAllData" class="btn btn-danger">
          <i class="bi bi-arrow-clockwise me-2"></i>
          Try Again
        </button>
      </div>

      <!-- Dashboard Content -->
      <div v-else class="dashboard-content">
        <!-- Welcome Section -->
        <div class="welcome-section mb-5">
          <div class="row">
            <div class="col-12">
              <div class="welcome-card">
                <div class="welcome-content">
                  <h2 class="welcome-title">
                    <i class="bi bi-emoji-smile me-2"></i>
                    Welcome back, {{ profile?.name || 'Champion' }}!
                  </h2>
                  <p class="welcome-text">
                    Ready to continue your journey? Check your progress and unlock new achievements!
                  </p>
                </div>
                <div class="welcome-decoration">
                  <div class="sparkle sparkle-1">✨</div>
                  <div class="sparkle sparkle-2">✨</div>
                  <div class="sparkle sparkle-3">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Row: Profile and Level Progress -->
        <div class="row mb-5">
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="component-wrapper">
              <ProfileCard />
            </div>
          </div>
          <div class="col-xl-8 col-lg-6 col-md-6 col-sm-12 mb-4">
            <div class="component-wrapper">
              <LevelProgress />
            </div>
          </div>
        </div>

        <!-- Middle Section: Quick Stats -->
        <div class="quick-stats-section mb-5">
          <div class="stats-header text-center mb-4">
            <h3 class="stats-title">
              <i class="bi bi-bar-chart-line me-2"></i>
              Your Progress Overview
            </h3>
            <p class="stats-subtitle">Track your journey and celebrate milestones</p>
          </div>
          
          <div class="row g-4">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div class="modern-stat-card stat-card-1">
                <div class="stat-header">
                  <div class="stat-line"></div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ achievements.length }}</div>
                  <div class="stat-label">Achievements</div>
                  <div class="stat-description">Unlocked badges</div>
                </div>
                <div class="stat-footer">
                  <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: 80%"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div class="modern-stat-card stat-card-2">
                <div class="stat-header">
                  <div class="stat-line"></div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ currentLevel }}</div>
                  <div class="stat-label">Current Level</div>
                  <div class="stat-description">Your rank</div>
                </div>
                <div class="stat-footer">
                  <div class="level-indicator">
                    <span class="level-text">Level {{ currentLevel }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div class="modern-stat-card stat-card-3">
                <div class="stat-header">
                  <div class="stat-line"></div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ currentXP.toLocaleString() }}</div>
                  <div class="stat-label">Total XP</div>
                  <div class="stat-description">Experience points</div>
                </div>
                <div class="stat-footer">
                  <div class="xp-indicator">
                    <span class="xp-text">{{ Math.round((currentXP / xpToNextLevel) * 100) }}% to next level</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div class="modern-stat-card stat-card-4">
                <div class="stat-header">
                  <div class="stat-line"></div>
                </div>
                <div class="stat-body">
                  <div class="stat-number">{{ (xpToNextLevel - currentXP).toLocaleString() }}</div>
                  <div class="stat-label">XP to Next</div>
                  <div class="stat-description">Until level up</div>
                </div>
                <div class="stat-footer">
                  <div class="progress-indicator">
                    <div class="progress-track">
                      <div class="progress-fill" :style="{ width: ((currentXP / xpToNextLevel) * 100) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Achievements -->
        <div class="row">
          <div class="col-12">
            <div class="component-wrapper">
              <AchievementList />
            </div>
          </div>
        </div>

        <!-- Quick Actions (Bonus Feature) -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="card quick-actions-card shadow-sm">
              <div class="card-body">
                <h5 class="card-title mb-3">
                  <i class="bi bi-lightning me-2"></i>
                  Quick Actions
                </h5>
                <div class="row">
                  <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
                    <button 
                      @click="addXP(50)" 
                      class="btn btn-warning btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +50 XP
                    </button>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
                    <button 
                      @click="addXP(100)" 
                      class="btn btn-success btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +100 XP
                    </button>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
                    <button 
                      @click="addXP(200)" 
                      class="btn btn-info btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +200 XP
                    </button>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-6 mb-2">
                    <button 
                      @click="resetData" 
                      class="btn btn-outline-danger btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-arrow-counterclockwise me-2"></i>
                      Reset
                    </button>
                  </div>
                </div>
                <small class="text-muted d-block mt-2">
                  <i class="bi bi-info-circle me-1"></i>
                  Use these buttons to test the level progression system
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="dashboard-footer mt-5 py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p class="text-muted mb-0">
              <i class="bi bi-code-slash me-2"></i>
              Built with Vue.js, Pinia, and Bootstrap 5
            </p>
          </div>
          <div class="col-md-6 text-end">
            <p class="text-muted mb-0">
              <i class="bi bi-github me-2"></i>
              Gamified Profile Dashboard
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import ProfileCard from './ProfileCard.vue'
import LevelProgress from './LevelProgress.vue'
import AchievementList from './AchievementList.vue'

const userStore = useUserStore()

// Computed properties
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)
const hasData = computed(() => userStore.profile || userStore.achievements.length > 0)
const profile = computed(() => userStore.profile)
const achievements = computed(() => userStore.achievements)
const currentLevel = computed(() => userStore.currentLevel)
const currentXP = computed(() => userStore.currentXP)
const xpToNextLevel = computed(() => userStore.xpToNextLevel)

// Methods
const fetchAllData = async () => {
  await userStore.fetchAllData()
}

const refreshData = async () => {
  await fetchAllData()
}

const addXP = (amount) => {
  userStore.addXP(amount)
}

const resetData = () => {
  userStore.resetData()
}

// Lifecycle
onMounted(() => {
  fetchAllData()
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 2rem;
}

.dashboard-header {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  border: none;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Background Pattern */
.header-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(255, 193, 7, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* Title Section */
.title-section {
  margin-bottom: 2rem;
}

.dashboard-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.title-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.title-text {
  display: flex;
  flex-direction: column;
}

.title-main {
  color: #495057;
  font-weight: 800;
  font-size: 2.8rem;
  line-height: 1;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  color: #6c757d;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 1;
  margin-top: 0.2rem;
}

.dashboard-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.dashboard-subtitle i {
  color: #667eea;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.dashboard-content {
  animation: fadeInUp 0.6s ease;
}

.quick-actions-card {
  border: none;
  border-radius: 15px;
  background: white;
}

.card-title {
  color: #495057;
  font-weight: 600;
  font-size: 1.1rem;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-footer {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.alert {
  border-radius: 15px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.spinner-border {
  border-width: 0.3em;
}

/* Header Stats */
.header-stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.header-stats .stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.header-stats .stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-item-1 { border-left: 3px solid #ffc107; }
.stat-item-2 { border-left: 3px solid #28a745; }
.stat-item-3 { border-left: 3px solid #17a2b8; }

.stat-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  position: relative;
  aspect-ratio: 1;
}

.stat-item-1 .stat-icon-wrapper { 
  background: linear-gradient(135deg, #ffc107, #ff8c00);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.stat-item-2 .stat-icon-wrapper { 
  background: linear-gradient(135deg, #28a745, #20c997);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.stat-item-3 .stat-icon-wrapper { 
  background: linear-gradient(135deg, #17a2b8, #6f42c1);
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 700;
  color: #495057;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
  margin-top: 0.1rem;
}

/* Action Buttons */
.header-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-refresh {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-refresh:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  color: white;
}

.btn-settings {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #6c757d;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-settings:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
  color: #495057;
}

/* Floating Icons */
.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-icon {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.08;
  animation: float 8s ease-in-out infinite;
  filter: blur(0.5px);
}

.floating-icon.icon-1 {
  top: 15%;
  left: 8%;
  animation-delay: 0s;
}

.floating-icon.icon-2 {
  top: 25%;
  right: 12%;
  animation-delay: 1.3s;
}

.floating-icon.icon-3 {
  bottom: 35%;
  left: 15%;
  animation-delay: 2.6s;
}

.floating-icon.icon-4 {
  bottom: 25%;
  right: 8%;
  animation-delay: 3.9s;
}

.floating-icon.icon-5 {
  top: 45%;
  left: 5%;
  animation-delay: 5.2s;
}

.floating-icon.icon-6 {
  top: 55%;
  right: 5%;
  animation-delay: 6.5s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1); 
    opacity: 0.08;
  }
  25% { 
    transform: translateY(-15px) rotate(2deg) scale(1.1); 
    opacity: 0.12;
  }
  50% { 
    transform: translateY(-25px) rotate(5deg) scale(1.05); 
    opacity: 0.15;
  }
  75% { 
    transform: translateY(-10px) rotate(-2deg) scale(0.95); 
    opacity: 0.1;
  }
}

/* Progress Bar */
.header-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
}

.progress-line {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2, #ffc107);
  width: 100%;
  animation: progressFlow 3s ease-in-out infinite;
}

@keyframes progressFlow {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
}

/* Welcome Section */
.welcome-section {
  margin-bottom: 3rem;
}

.welcome-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.welcome-title {
  color: #495057;
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 0;
}

.welcome-decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.3;
  animation: sparkle 2s ease-in-out infinite;
}

.sparkle-1 {
  top: 20%;
  right: 20%;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 50%;
  right: 40%;
  animation-delay: 0.7s;
}

.sparkle-3 {
  bottom: 20%;
  right: 30%;
  animation-delay: 1.4s;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

/* Component Wrapper */
.component-wrapper {
  position: relative;
  transition: transform 0.3s ease;
}

.component-wrapper:hover {
  transform: translateY(-5px);
}

/* Quick Stats Section */
.quick-stats-section {
  margin: 3rem 0;
}

.stats-header {
  margin-bottom: 2rem;
}

.stats-title {
  color: #495057;
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.stats-subtitle {
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.modern-stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.modern-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-line {
  width: 60px;
  height: 4px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card-1 .stat-line { 
  background: linear-gradient(135deg, #ffc107, #ff8c00);
}

.stat-card-2 .stat-line { 
  background: linear-gradient(135deg, #28a745, #20c997);
}

.stat-card-3 .stat-line { 
  background: linear-gradient(135deg, #17a2b8, #6f42c1);
}

.stat-card-4 .stat-line { 
  background: linear-gradient(135deg, #dc3545, #e83e8c);
}

.stat-body {
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #495057;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.25rem;
}

.stat-description {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

.stat-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 0.75rem;
}

.stat-bar {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffc107, #ff8c00);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.level-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.level-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #28a745;
  background: rgba(40, 167, 69, 0.15);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  min-width: 80px;
  border: 1px solid rgba(40, 167, 69, 0.2);
}

.xp-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.xp-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #17a2b8;
  background: rgba(23, 162, 184, 0.15);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  min-width: 100px;
  border: 1px solid rgba(23, 162, 184, 0.2);
}

.progress-indicator {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #dc3545, #e83e8c);
  border-radius: 3px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Tablet Responsive Adjustments */
@media (max-width: 992px) and (min-width: 769px) {
  .dashboard-header {
    padding: 2rem 0;
  }
  
  .title-main {
    font-size: 2.2rem;
  }
  
  .title-sub {
    font-size: 1.4rem;
  }
  
  .header-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .header-stats .stat-item {
    flex: 1;
    min-width: 200px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-refresh {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .modern-stat-card {
    padding: 1.3rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .quick-actions-card .col-md-3 {
    margin-bottom: 0.75rem;
  }
  
  .quick-actions-card .row {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .quick-actions-card .col-lg-3,
  .quick-actions-card .col-md-6 {
    flex: 0 0 auto;
    max-width: 200px;
    margin: 0;
  }
  
  .quick-actions-card .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }
  
  .dashboard-subtitle {
    font-size: 1rem;
  }
  
  .dashboard-header {
    padding: 1.5rem 0;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .header-stats .stat-item {
    padding: 0.5rem 0.75rem;
  }
  
  .stat-icon-wrapper {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    aspect-ratio: 1;
  }
  
  .stat-number {
    font-size: 1.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-refresh {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .btn-settings {
    width: 40px;
    height: 40px;
  }
  
  .welcome-card {
    padding: 1.5rem;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
  
  .modern-stat-card {
    padding: 1.25rem;
  }
  
  .stat-number {
    font-size: 1.6rem;
  }
  
  .stat-line {
    width: 50px;
    height: 3px;
  }
  
  .quick-actions-card .row {
    gap: 0.5rem;
  }
  
  .quick-actions-card .col-md-3 {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .dashboard-title {
    font-size: 1.75rem;
  }
  
  .dashboard-header .text-end {
    text-align: start !important;
    margin-top: 1rem;
  }
  
  .dashboard-footer .text-end {
    text-align: start !important;
    margin-top: 0.5rem;
  }
}

/* Loading state enhancements */
.dashboard-content {
  transition: opacity 0.3s ease;
}

.dashboard-content.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>
