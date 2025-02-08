<template>
  <button 
    class="group relative inline-flex items-center justify-center px-3 sm:px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
    :disabled="disabled"
  >
    <span class="relative flex items-center gap-1 sm:gap-2">
      {{ text || 'Next' }}
      <svg 
        class="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </span>
    <div 
      class="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out bg-white rounded-lg opacity-0 group-hover:opacity-10"
    ></div>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgb(156 163 175);
}
</style> 