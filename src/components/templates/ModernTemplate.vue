<template>
  <div class="modern-template">
    <!-- Personal Details with Photo -->
    <div class="mb-8 flex items-start gap-8">
      <!-- Photo -->
      <div 
        v-if="cvData.personal.photo" 
        class="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200"
      >
        <img 
          :src="cvData.personal.photo" 
          class="w-full h-full object-cover"
          alt="Profile photo"
        />
      </div>

      <!-- Personal Info -->
      <div class="flex-grow">
        <h1 class="text-4xl font-bold mb-4">{{ cvData.personal.fullName }}</h1>
        <div class="flex flex-wrap gap-4 text-gray-600">
          <span v-if="cvData.personal.email">
            <i class="fas fa-envelope mr-2"></i>{{ cvData.personal.email }}
          </span>
          <span v-if="cvData.personal.phone">
            <i class="fas fa-phone mr-2"></i>{{ cvData.personal.phone }}
          </span>
          <span v-if="cvData.personal.location">
            <i class="fas fa-map-marker-alt mr-2"></i>{{ cvData.personal.location }}
          </span>
          <span v-if="cvData.personal.website">
            <i class="fas fa-globe mr-2"></i>{{ cvData.personal.website }}
          </span>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="mb-8" v-if="cvData.summary">
      <h2 class="text-2xl font-bold mb-4 text-primary">Professional Summary</h2>
      <p class="text-gray-700">{{ cvData.summary }}</p>
    </div>

    <!-- Experience -->
    <div class="mb-8" v-if="cvData.experience?.length">
      <h2 class="text-2xl font-bold mb-4 text-primary">Work Experience</h2>
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

    <!-- Skills -->
    <div class="mb-8" v-if="cvData.skills?.length">
      <h2 class="text-2xl font-bold mb-4 text-primary">Skills</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="skill in cvData.skills" :key="skill.name" class="skill-item">
          <div class="flex justify-between items-center mb-1">
            <span class="font-medium">{{ skill.name }}</span>
            <span class="text-sm text-gray-600">{{ getLevelText(skill.level) }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary rounded-full h-2 transition-all duration-300"
              :style="{ width: `${(skill.level / 5) * 100}%` }"
            ></div>
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