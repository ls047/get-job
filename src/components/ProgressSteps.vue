<template>
  <div class="mb-12 max-w-4xl mx-auto sm:mx-0 sm:ma">
    <div class="relative">
      <!-- Background Track -->
      <div class="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>



      <!-- Steps Container -->
      <div class="relative flex justify-between max-w-full px-4">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="flex flex-col items-center relative"
        >
          <!-- Step Circle -->
          <div 
            class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium z-10 transition-all duration-300 ease-in-out"
            :class="[
              currentStep > index 
                ? 'bg-green-500 text-white' 
                : currentStep === index 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-500'
            ]"
          >
            <span v-if="currentStep > index">✓</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          
          <!-- Step Label -->
          <div 
            class="absolute -bottom-8 hidden sm:block text-xs font-medium text-center min-w-[60px] max-w-[80px] break-words leading-tight mx-auto whitespace-normal px-1"
            :class="[
              currentStep >= index 
                ? 'text-gray-900' 
                : 'text-gray-500'
            ]"
          >
            {{ step }}
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div 
        class="absolute top-1/2 left-0 h-1 bg-blue-500 transition-all duration-500 ease-in-out -translate-y-1/2"
        :style="{ width: `${progressWidth}%` }"
      ></div>
    </div>

    <!-- Current Step Description -->
    <div class="text-center mt-16">
      <p class="text-sm text-gray-600">
      </p>
    </div>
  </div>


</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    default: () => [
      'Personal Details',
      'Professional Summary',
      'Work Experience',
      'Education',
      'Choose Template',
      'Customize Colors',
      'Preview & Download'
    ]
  },
  currentStep: {
    type: Number,
    required: true
  }
});

// Add watch for currentStep
watch(() => props.currentStep, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const progressWidth = computed(() => {
  const totalSteps = props.steps.length - 1;
  const currentProgress = props.currentStep;
  return (currentProgress / totalSteps) * 100;
});

const getStepDescription = (step) => {
  const descriptions = [
    'Add your personal information and profile photo',
    'Create a compelling professional summary',
    'List your work history and key achievements',
    'Share your educational background',
    'Pick a template that matches your style',
    'Personalize with your preferred colors',
    'Review and download your finished CV'
  ];
  return descriptions[step];
};
</script>

<style scoped>
/* Simple transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Hover effect for step circles - only on devices that support hover */
@media (hover: hover) {
  .rounded-full:hover {
    transform: scale(1.05);
  }
}

/* Active step animation - disabled on mobile for better performance */
@media (min-width: 768px) {
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .bg-blue-500 {
    animation: pulse 2s infinite;
  }
}
</style> 