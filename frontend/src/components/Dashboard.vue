<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header mb-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="dashboard-title">
              <i class="bi bi-speedometer2 me-3"></i>
              Gamified Profile Dashboard
            </h1>
            <p class="dashboard-subtitle text-muted">
              Track your progress, achievements, and level up your skills
            </p>
          </div>
          <div class="col-md-4 text-end">
            <button 
              @click="refreshData" 
              class="btn btn-outline-primary"
              :disabled="loading"
            >
              <i class="bi bi-arrow-clockwise me-2" :class="{ 'spinning': loading }"></i>
              {{ loading ? 'Loading...' : 'Refresh' }}
            </button>
          </div>
        </div>
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
        <!-- Top Row: Profile and Level Progress -->
        <div class="row mb-4">
          <div class="col-lg-4 mb-4">
            <ProfileCard />
          </div>
          <div class="col-lg-8 mb-4">
            <LevelProgress />
          </div>
        </div>

        <!-- Bottom Row: Achievements -->
        <div class="row">
          <div class="col-12">
            <AchievementList />
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
                  <div class="col-md-3 mb-2">
                    <button 
                      @click="addXP(50)" 
                      class="btn btn-warning btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +50 XP
                    </button>
                  </div>
                  <div class="col-md-3 mb-2">
                    <button 
                      @click="addXP(100)" 
                      class="btn btn-success btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +100 XP
                    </button>
                  </div>
                  <div class="col-md-3 mb-2">
                    <button 
                      @click="addXP(200)" 
                      class="btn btn-info btn-sm w-100"
                      :disabled="loading"
                    >
                      <i class="bi bi-plus-circle me-2"></i>
                      +200 XP
                    </button>
                  </div>
                  <div class="col-md-3 mb-2">
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 0;
}

.dashboard-title {
  color: #495057;
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  margin-bottom: 0;
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

/* Responsive adjustments */
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
