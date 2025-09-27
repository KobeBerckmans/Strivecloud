<template>
  <div class="card level-progress-card shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-4">
        <i class="bi bi-graph-up me-2"></i>
        Level Progress
      </h5>
      
      <!-- Circular Progress -->
      <div class="progress-container mb-4">
        <div class="circular-progress">
          <svg class="progress-ring" width="120" height="120">
            <circle
              class="progress-ring-background"
              stroke="#e9ecef"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            <circle
              class="progress-ring-fill"
              :stroke="progressColor"
              stroke-width="8"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              stroke-linecap="round"
            />
          </svg>
          <div class="progress-text">
            <div class="progress-percentage">{{ Math.round(xpProgress) }}%</div>
            <div class="progress-label">Complete</div>
          </div>
        </div>
      </div>
      
      <!-- Linear Progress Bar -->
      <div class="linear-progress mb-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="progress-label">Experience Points</span>
          <span class="progress-stats">{{ currentXP }} / {{ xpToNextLevel }} XP</span>
        </div>
        <div class="progress" style="height: 12px; border-radius: 10px;">
          <div 
            class="progress-bar progress-bar-striped progress-bar-animated"
            :class="progressBarClass"
            role="progressbar"
            :style="{ width: xpProgress + '%' }"
            :aria-valuenow="currentXP"
            :aria-valuemin="0"
            :aria-valuemax="xpToNextLevel"
          >
            <span class="visually-hidden">{{ xpProgress }}% complete</span>
          </div>
        </div>
      </div>
      
      <!-- XP Details -->
      <div class="xp-details">
        <div class="row text-center">
          <div class="col-4">
            <div class="xp-stat">
              <div class="xp-value">{{ currentXP }}</div>
              <div class="xp-label">Current XP</div>
            </div>
          </div>
          <div class="col-4">
            <div class="xp-stat">
              <div class="xp-value">{{ xpToNextLevel - currentXP }}</div>
              <div class="xp-label">XP Needed</div>
            </div>
          </div>
          <div class="col-4">
            <div class="xp-stat">
              <div class="xp-value">{{ currentLevel }}</div>
              <div class="xp-label">Level</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Level Up Button (Bonus Feature) -->
      <div class="level-up-section mt-4">
        <button 
          @click="addXP(100)" 
          class="btn btn-success btn-sm w-100"
          :disabled="loading"
        >
          <i class="bi bi-plus-circle me-2"></i>
          Add 100 XP
        </button>
        <small class="text-muted d-block mt-2 text-center">
          Click to test level progression
        </small>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading progress...</p>
      </div>
      
      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Computed properties
const currentLevel = computed(() => userStore.currentLevel)
const currentXP = computed(() => userStore.currentXP)
const xpToNextLevel = computed(() => userStore.xpToNextLevel)
const xpProgress = computed(() => userStore.xpProgress)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)

// Circular progress calculations
const circumference = computed(() => 2 * Math.PI * 52) // radius = 52
const strokeDashoffset = computed(() => {
  return circumference.value - (xpProgress.value / 100) * circumference.value
})

// Progress bar styling
const progressColor = computed(() => {
  if (xpProgress.value < 30) return '#dc3545' // red
  if (xpProgress.value < 70) return '#ffc107' // yellow
  return '#28a745' // green
})

const progressBarClass = computed(() => {
  if (xpProgress.value < 30) return 'bg-danger'
  if (xpProgress.value < 70) return 'bg-warning'
  return 'bg-success'
})

// Actions
const addXP = (amount) => {
  userStore.addXP(amount)
}
</script>

<style scoped>
.level-progress-card {
  border: none;
  border-radius: 15px;
  background: white;
  min-height: 400px;
}

.card-title {
  color: #495057;
  font-weight: 600;
  font-size: 1.1rem;
}

.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circular-progress {
  position: relative;
  display: inline-block;
}

.progress-ring {
  transform: rotate(-90deg);
  transition: all 0.3s ease;
}

.progress-ring-fill {
  transition: stroke-dashoffset 0.5s ease;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.1));
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: #495057;
  line-height: 1;
}

.progress-label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 2px;
}

.linear-progress {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
}

.progress-stats {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.xp-details {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
}

.xp-stat {
  padding: 0.5rem;
}

.xp-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #495057;
  line-height: 1;
}

.xp-label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 2px;
}

.level-up-section {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.btn-success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.btn-success:disabled {
  opacity: 0.6;
  transform: none;
}

.alert {
  border-radius: 10px;
  border: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .circular-progress svg {
    width: 100px;
    height: 100px;
  }
  
  .progress-percentage {
    font-size: 1.2rem;
  }
  
  .xp-value {
    font-size: 1rem;
  }
}

/* Animation for level up */
@keyframes levelUp {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.level-up-animation {
  animation: levelUp 0.5s ease;
}
</style>
