<template>
  <div class="card achievement-list-card shadow-sm">
    <div class="card-body">
      <h5 class="card-title mb-4">
        <i class="bi bi-trophy me-2"></i>
        Achievements
        <span class="badge bg-primary ms-2">{{ achievements.length }}</span>
      </h5>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading achievements...</p>
      </div>
      
      <!-- Error State -->
      <div v-if="error" class="alert alert-danger" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
      </div>
      
      <!-- Achievements Grid -->
      <div v-if="!loading && !error" class="achievements-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-item"
          :class="{ 
            'achievement-unlocked': achievement.unlocked,
            'achievement-locked': !achievement.unlocked
          }"
        >
          <div class="achievement-card">
            <!-- Achievement Icon -->
            <div class="achievement-icon">
              <img 
                :src="achievement.icon_url" 
                :alt="achievement.title"
                class="achievement-image"
                :class="{ 'locked-image': !achievement.unlocked }"
                @error="handleImageError"
              />
              <div class="achievement-badge" v-if="achievement.unlocked">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <div class="achievement-badge locked-badge" v-else>
                <i class="bi bi-lock-fill"></i>
              </div>
            </div>
            
            <!-- Achievement Content -->
            <div class="achievement-content">
              <h6 class="achievement-title" :class="{ 'locked-title': !achievement.unlocked }">
                {{ achievement.title }}
              </h6>
              <p class="achievement-description" :class="{ 'locked-description': !achievement.unlocked }">
                {{ achievement.description }}
              </p>
            </div>
            
            <!-- Achievement Status -->
            <div class="achievement-status">
              <span v-if="achievement.unlocked" class="badge bg-success">
                <i class="bi bi-unlock me-1"></i>
                Unlocked
              </span>
              <span v-else class="badge bg-secondary">
                <i class="bi bi-lock me-1"></i>
                Locked
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && !error && achievements.length === 0" class="empty-state text-center py-4">
        <div class="empty-icon mb-3">
          <i class="bi bi-trophy text-muted" style="font-size: 3rem;"></i>
        </div>
        <h6 class="text-muted">No achievements yet</h6>
        <p class="text-muted small">Complete tasks and level up to earn achievements!</p>
      </div>
      
      <!-- Achievement Stats -->
      <div v-if="!loading && !error && achievements.length > 0" class="achievement-stats mt-4">
        <div class="row text-center">
          <div class="col-4">
            <div class="stat-item">
              <div class="stat-value">{{ achievements.length }}</div>
              <div class="stat-label">Total</div>
            </div>
          </div>
          <div class="col-4">
            <div class="stat-item">
              <div class="stat-value">{{ unlockedCount }}</div>
              <div class="stat-label">Unlocked</div>
            </div>
          </div>
          <div class="col-4">
            <div class="stat-item">
              <div class="stat-value">{{ lockedCount }}</div>
              <div class="stat-label">Locked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Computed properties
const achievements = computed(() => userStore.achievements)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)

const unlockedCount = computed(() => {
  return achievements.value.filter(achievement => achievement.unlocked).length
})

const lockedCount = computed(() => {
  return achievements.value.filter(achievement => !achievement.unlocked).length
})

// Methods
const handleImageError = (event) => {
  // Fallback to a default achievement icon
  event.target.src = 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400'
}
</script>

<style scoped>
.achievement-list-card {
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

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.achievement-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.achievement-item:hover {
  transform: translateY(-2px);
}

.achievement-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.achievement-unlocked .achievement-card {
  border-color: #28a745;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.achievement-unlocked .achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #28a745, #20c997);
}

.achievement-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.achievement-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.achievement-image:hover {
  transform: scale(1.05);
}

.locked-image {
  filter: grayscale(100%) brightness(0.7);
}

.locked-title {
  color: #6c757d !important;
}

.locked-description {
  color: #6c757d !important;
}

.locked-badge {
  background: #6c757d !important;
  color: white !important;
}

.achievement-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.achievement-locked .achievement-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  opacity: 0.7;
}

.achievement-locked:hover .achievement-card {
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.15);
  border-color: #6c757d;
}

.achievement-content {
  margin-bottom: 0.75rem;
}

.achievement-title {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.achievement-description {
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 0;
  line-height: 1.4;
}

.achievement-status {
  text-align: right;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
  border-radius: 6px;
}

.achievement-stats {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.stat-item {
  padding: 0.5rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #495057;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 2px;
}

.empty-state {
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px dashed #dee2e6;
}

.alert {
  border-radius: 10px;
  border: none;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .achievement-card {
    padding: 0.75rem;
  }
  
  .achievement-image {
    width: 50px;
    height: 50px;
  }
  
  .achievement-title {
    font-size: 0.9rem;
  }
  
  .achievement-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .achievement-stats .row {
    gap: 0.5rem;
  }
  
  .stat-value {
    font-size: 1rem;
  }
}

/* Animation for new achievements */
@keyframes achievementUnlock {
  0% { 
    transform: scale(0.8);
    opacity: 0;
  }
  50% { 
    transform: scale(1.05);
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
}

.achievement-unlock-animation {
  animation: achievementUnlock 0.5s ease;
}
</style>
