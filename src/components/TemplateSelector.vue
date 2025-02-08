<template>
  <div class="space-y-8">
    <!-- Template Grid -->
    <div class="bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold mb-8 text-gray-800">Choose Your Template</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="template in templates" 
          :key="template.id"
          class="relative group cursor-pointer"
          @click="selectTemplate(template.id)"
        >
          <!-- Template Preview Card -->
          <div 
            class="relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300 transform"
            :class="[
              selectedId === template.id 
                ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
                : 'ring-1 ring-gray-200 hover:ring-blue-300 hover:shadow-xl hover:scale-102'
            ]"
          >
            <!-- SVG Preview with enhanced styling -->
            <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
              <component 
                :is="template.preview" 
                :primary-color="colors.primary"
                :secondary-color="colors.secondary"
              />
            </div>
            
            <!-- Improved Selection Overlay -->
            <div 
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="font-bold text-xl mb-2">{{ template.name }}</h3>
                <p class="text-sm text-gray-200">{{ template.description }}</p>
              </div>
            </div>
          </div>

          <!-- Enhanced Selected Indicator -->
          <div 
            v-if="selectedId === template.id"
            class="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full 
                   flex items-center justify-center text-white shadow-lg
                   transform transition-transform duration-300 scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview Modal -->
    <div
      v-if="showPreview"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showPreview = false"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-xl font-semibold">Preview Template</h2>
          <button @click="showPreview = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6">
          <CVRenderer
            :cv-data="cvData"
            :template-id="selectedId"
            :colors="selectedColor"
          />
        </div>
      </div>
    </div>

    <!-- Color Scheme Selection -->
    <div v-if="selectedId" class="mt-8">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Select Color Scheme</h3>
      <div class="flex gap-4 flex-wrap">
        <button
          v-for="color in colors"
          :key="color.id"
          class="w-10 h-10 rounded-full border-2 transition-all duration-300"
          :style="{ backgroundColor: color.primary }"
          :class="{ 'ring-2 ring-offset-2 ring-blue-500': selectedColor === color.id }"
          @click="selectColor(color.id)"
        />
      </div>
    </div>

    <!-- Preview & Continue Button -->
    <div class="flex justify-between items-center mt-8">
      <button
        v-if="selectedId"
        @click="showPreview = true"
        class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Preview Design
      </button>
      <button
        v-if="selectedId && selectedColor"
        @click="generateCV"
        class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CVRenderer from './CVRenderer.vue';

const props = defineProps({
  cvData: {
    type: Object,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  colors: {
    type: Object,
    required: true,
    default: () => ({
      primary: '#3B82F6',
      secondary: '#F3F4F6'
    })
  }
});

const selectedId = ref(null);
const selectedColor = ref(null);
const showPreview = ref(false);

// SVG Components with color props
const ModernPreview = {
  props: ['primaryColor', 'secondaryColor'],
  template: `
    <svg viewBox="0 0 300 400" class="w-full h-full">
      <!-- Left Column -->
      <rect x="20" y="20" width="100" height="360" fill="#f8f9fa" rx="4"/>
      <circle cx="70" cy="60" r="30" :fill="primaryColor"/>
      <rect x="40" y="100" width="60" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="40" y="120" width="60" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="40" y="160" width="60" height="60" fill="#e9ecef"/>
      <rect x="40" y="240" width="60" height="60" fill="#e9ecef"/>
      
      <!-- Right Column -->
      <rect x="140" y="20" width="140" height="100" fill="#f8f9fa" rx="4"/>
      <rect x="160" y="40" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="60" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="80" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      
      <rect x="140" y="140" width="140" height="100" fill="#f8f9fa" rx="4"/>
      <rect x="160" y="160" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="180" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="200" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
    </svg>
  `
};

const ProfessionalPreview = {
  props: ['primaryColor', 'secondaryColor'],
  template: `
    <svg viewBox="0 0 300 400" class="w-full h-full">
      <!-- Header -->
      <rect x="20" y="20" width="260" height="80" fill="#f8f9fa" rx="4"/>
      <circle cx="60" cy="60" r="25" :fill="primaryColor"/>
      <rect x="100" y="40" width="160" height="10" :fill="primaryColor" opacity="0.7"/>
      <rect x="100" y="60" width="120" height="8" :fill="primaryColor" opacity="0.7"/>
      
      <!-- Two Columns -->
      <rect x="20" y="120" width="120" height="260" fill="#f8f9fa" rx="4"/>
      <rect x="160" y="120" width="120" height="260" fill="#f8f9fa" rx="4"/>
      
      <!-- Content Blocks -->
      <rect x="40" y="140" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="40" y="160" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="40" y="180" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
      
      <rect x="180" y="140" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="180" y="160" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="180" y="180" width="80" height="8" :fill="primaryColor" opacity="0.7"/>
    </svg>
  `
};

const CreativePreview = {
  props: ['primaryColor', 'secondaryColor'],
  template: `
    <svg viewBox="0 0 300 400" class="w-full h-full">
      <!-- Background Pattern -->
      <pattern id="pattern" patternUnits="userSpaceOnUse" width="50" height="50">
        <path d="M0 0h50v50H0z" fill="#f8f9fa"/>
        <circle cx="25" cy="25" r="1" :fill="primaryColor" opacity="0.3"/>
      </pattern>
      <rect x="0" y="0" width="300" height="400" fill="url(#pattern)"/>
      
      <!-- Left Sidebar -->
      <rect x="20" y="20" width="100" height="360" fill="white" rx="4"/>
      <rect x="20" y="20" width="100" height="80" :fill="primaryColor"/>
      <rect x="35" y="90" width="70" height="10" :fill="primaryColor" opacity="0.7"/>
      
      <!-- Skills Bars -->
      <rect x="35" y="120" width="70" height="6" fill="#e9ecef" rx="3"/>
      <rect x="35" y="120" width="50" height="6" :fill="primaryColor" rx="3"/>
      <rect x="35" y="140" width="70" height="6" fill="#e9ecef" rx="3"/>
      <rect x="35" y="140" width="40" height="6" :fill="primaryColor" rx="3"/>
      
      <!-- Right Content -->
      <rect x="140" y="20" width="140" height="160" fill="white" rx="4"/>
      <rect x="160" y="40" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="60" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      
      <rect x="140" y="200" width="140" height="160" fill="white" rx="4"/>
      <rect x="160" y="220" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
      <rect x="160" y="240" width="100" height="8" :fill="primaryColor" opacity="0.7"/>
    </svg>
  `
};

const templates = [
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'Clean and minimalist design with a focus on readability',
    preview: ModernPreview
  },
  {
    id: 'professional',
    name: 'Professional Classic',
    description: 'Traditional layout perfect for corporate environments',
    preview: ProfessionalPreview
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Stand out with a unique and dynamic layout',
    preview: CreativePreview
  }
];

const colors = [
  { id: 'blue', primary: '#2563eb', secondary: '#60a5fa' },
  { id: 'green', primary: '#059669', secondary: '#34d399' },
  { id: 'purple', primary: '#7c3aed', secondary: '#a78bfa' },
  { id: 'red', primary: '#dc2626', secondary: '#f87171' },
  { id: 'gray', primary: '#4b5563', secondary: '#9ca3af' }
];

const selectTemplate = (templateId) => {
  selectedId.value = templateId;
};

const selectColor = (colorId) => {
  selectedColor.value = colorId;
};

const generateCV = () => {
  emit('generate', {
    template: selectedId.value,
    color: colors.find(c => c.id === selectedColor.value)
  });
};

const emit = defineEmits(['generate']);
</script>

<style scoped>
.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
}

/* Smooth transition for all transformations */
.transform {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.template-preview {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.template-preview:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Improved focus styles */
.template-preview:focus {
  outline: none;
  @apply ring-offset-2 ring-2 ring-blue-500;
}

/* Animation for the selected indicator */
@keyframes pop {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.selected-indicator {
  animation: pop 0.3s ease-out;
}
</style> 