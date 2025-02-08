<template>
  <div class="creative-template grid grid-cols-3 gap-8">
    <!-- Sidebar -->
    <div class="col-span-1 bg-gray-50 p-6 rounded-lg">
      <!-- Photo -->
      <div class="mb-6 flex flex-col items-center">
        <div 
          v-if="cvData.personal.photo" 
          class="w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4 border-4"
          :style="{ borderColor: 'var(--primary-color)' }"
        >
          <img 
            :src="cvData.personal.photo" 
            class="w-full h-full object-cover"
            alt="Profile photo"
          />
        </div>
        <h1 class="text-2xl font-bold text-center mb-2">{{ cvData.personal.fullName }}</h1>
      </div>

      <!-- Contact Info -->
      <div class="space-y-3 mb-8">
        <div v-if="cvData.personal.email" class="flex items-center gap-3 text-gray-600">
          <i class="fas fa-envelope text-primary"></i>
          <span>{{ cvData.personal.email }}</span>
        </div>
        <div v-if="cvData.personal.phone" class="flex items-center gap-3 text-gray-600">
          <i class="fas fa-phone text-primary"></i>
          <span>{{ cvData.personal.phone }}</span>
        </div>
        <div v-if="cvData.personal.location" class="flex items-center gap-3 text-gray-600">
          <i class="fas fa-map-marker-alt text-primary"></i>
          <span>{{ cvData.personal.location }}</span>
        </div>
        <div v-if="cvData.personal.website" class="flex items-center gap-3 text-gray-600">
          <i class="fas fa-globe text-primary"></i>
          <span>{{ cvData.personal.website }}</span>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="cvData.skills?.length">
        <h2 class="text-xl font-bold mb-4 text-primary">Skills</h2>
        <div class="space-y-4">
          <div v-for="skill in cvData.skills" :key="skill.name">
            <div class="flex justify-between items-center mb-1">
              <span class="font-medium">{{ skill.name }}</span>
              <span class="text-sm text-primary">{{ getLevelText(skill.level) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                class="bg-primary rounded-full h-1.5 transition-all duration-300"
                :style="{ width: `${(skill.level / 5) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="col-span-2">
      <!-- Summary -->
      <div class="mb-8" v-if="cvData.summary">
        <h2 class="text-2xl font-bold mb-4 text-primary">About Me</h2>
        <p class="text-gray-700 leading-relaxed">{{ cvData.summary }}</p>
      </div>

      <!-- Experience -->
      <div class="mb-8" v-if="cvData.experience?.length">
        <h2 class="text-2xl font-bold mb-4 text-primary">Experience</h2>
        <div class="space-y-6">
          <div v-for="(exp, index) in cvData.experience" :key="index">
            <h3 class="text-xl font-semibold">{{ exp.title }}</h3>
            <div class="text-gray-600 mb-2">
              {{ exp.company }} | {{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}
            </div>
            <p class="text-gray-700">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="mb-8" v-if="cvData.education?.length">
        <h2 class="text-2xl font-bold mb-4 text-primary">Education</h2>
        <div class="space-y-6">
          <div v-for="(edu, index) in cvData.education" :key="index">
            <h3 class="text-xl font-semibold">{{ edu.degree }}</h3>
            <div class="text-gray-600 mb-2">
              {{ edu.institution }} | {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
            </div>
            <p class="text-gray-700">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cvData: {
    type: Object,
    required: true
  }
});

const formatDate = (date) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getLevelText = (level) => {
  const levels = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
    5: 'Master'
  };
  return levels[level] || 'N/A';
};
</script>

<style scoped>
.text-primary {
  color: var(--primary-color);
}

.bg-primary {
  background-color: var(--primary-color);
}
</style> 