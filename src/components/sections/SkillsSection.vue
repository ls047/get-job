<template>
  <div class="skills-section">
    <h2 class="text-xl font-bold mb-4 text-primary">Skills</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
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
</template>

<script setup>
const props = defineProps({
  skills: {
    type: Array,
    default: () => []
  }
});

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
.bg-primary {
  background-color: var(--primary-color, #2563eb);
}

.text-primary {
  color: var(--primary-color, #2563eb);
}
</style> 