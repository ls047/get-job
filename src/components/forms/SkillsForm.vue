<template>
  <div class="space-y-6">
    <!-- Skills List -->
    <div v-for="(skill, index) in skills" :key="index" class="bg-gray-50 p-4 rounded-lg">
      <div class="flex items-start gap-4">
        <div class="flex-grow space-y-4">
          <!-- Skill Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              v-model="skill.name"
              type="text"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., JavaScript, Project Management, etc."
            />
          </div>

          <!-- Skill Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level
            </label>
            <div class="flex items-center gap-4">
              <input 
                type="range" 
                v-model="skill.level" 
                min="1" 
                max="5" 
                class="flex-grow"
              />
              <span class="text-sm text-gray-600 w-24">{{ getLevelText(skill.level) }}</span>
            </div>
          </div>
        </div>

        <!-- Remove Skill Button -->
        <button
          @click="removeSkill(index)"
          class="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          :disabled="skills.length === 1"
          :title="skills.length === 1 ? 'At least one skill is required' : 'Remove skill'"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <!-- Add Skill Button -->
    <button
      @click="addSkill"
      type="button"
      class="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
    >
      <i class="fas fa-plus"></i>
      Add Another Skill
    </button>

    <!-- Skills Tips -->
    <div class="bg-blue-50 p-4 rounded-lg">
      <h3 class="font-medium text-blue-800 mb-2">Tips for adding skills:</h3>
      <ul class="text-sm text-blue-700 space-y-1 list-disc list-inside">
        <li>Add both technical and soft skills</li>
        <li>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</li>
        <li>Include relevant tools and technologies</li>
        <li>Be honest with your proficiency levels</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const skills = ref(props.modelValue.length ? [...props.modelValue] : [{ name: '', level: 3 }]);

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

const addSkill = () => {
  skills.value.push({ name: '', level: 3 });
};

const removeSkill = (index) => {
  if (skills.value.length > 1) {
    skills.value.splice(index, 1);
  }
};

watch(skills, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}
</style> 