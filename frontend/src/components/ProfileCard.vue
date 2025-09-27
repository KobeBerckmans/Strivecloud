<template>
  <div class="card profile-card shadow-sm">
    <div class="card-body text-center">
      <!-- Avatar -->
      <div class="avatar-container mb-3">
        <img 
          :src="profile?.avatar_url" 
          :alt="`${profile?.name}'s avatar`"
          class="avatar rounded-circle"
        />
        <div class="level-badge">
          <span class="badge bg-primary fs-6">{{ profile?.level }}</span>
        </div>
      </div>
      
      <!-- User Name -->
      <h3 class="card-title mb-2">{{ profile?.name }}</h3>
      
      <!-- Level Info -->
      <div class="level-info">
        <p class="text-muted mb-1">Level {{ profile?.level }}</p>
        <div class="xp-display">
          <small class="text-muted">
            {{ profile?.current_xp }} / {{ profile?.xp_to_next_level }} XP
          </small>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading profile...</p>
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
const profile = computed(() => userStore.profile)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)
</script>

<style scoped>
.profile-card {
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 300px;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.level-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.level-badge .badge {
  font-size: 0.8rem;
  padding: 0.5em 0.75em;
  border-radius: 50px;
}

.card-title {
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.level-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
}

.xp-display {
  font-size: 0.9rem;
  opacity: 0.9;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}

.alert {
  border-radius: 10px;
  border: none;
  background: rgba(220, 53, 69, 0.9);
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .profile-card {
    min-height: 250px;
  }
}
</style>
