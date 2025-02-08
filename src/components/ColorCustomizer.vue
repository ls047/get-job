<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-6 text-gray-800">Customize Your CV Colors</h2>
    
    <!-- Color Schemes -->
    <div class="space-y-6">
      <!-- Primary Color Selection -->
      <div>
        <h3 class="text-lg font-medium mb-4 text-gray-700">Choose Your Color Scheme</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="scheme in colorSchemes"
            :key="scheme.id"
            class="relative cursor-pointer group"
            @click="selectScheme(scheme)"
          >
            <!-- Color Preview -->
            <div 
              class="h-24 rounded-lg transition-transform duration-300 group-hover:scale-105"
              :class="{ 'ring-2 ring-offset-2 ring-blue-500': selectedScheme?.id === scheme.id }"
            >
              <!-- Primary Color -->
              <div 
                class="h-2/3 rounded-t-lg"
                :style="{ backgroundColor: scheme.primary }"
              ></div>
              <!-- Secondary Color -->
              <div 
                class="h-1/3 rounded-b-lg"
                :style="{ backgroundColor: scheme.secondary }"
              ></div>
            </div>
            
            <!-- Scheme Name -->
            <div class="mt-2 text-center">
              <span class="text-sm font-medium text-gray-700">{{ scheme.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Color Option -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium mb-4 text-gray-700">Or Choose Custom Colors</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Primary Color Picker -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              v-model="customColors.primary"
              class="h-10 w-full rounded-md cursor-pointer"
              @change="applyCustomColors"
            />
          </div>
          
          <!-- Secondary Color Picker -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <input
              type="color"
              v-model="customColors.secondary"
              class="h-10 w-full rounded-md cursor-pointer"
              @change="applyCustomColors"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div v-if="selectedScheme" class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Preview</h3>
      <div class="flex items-center space-x-4">
        <div 
          class="w-6 h-6 rounded-full"
          :style="{ backgroundColor: selectedScheme.primary }"
        ></div>
        <div 
          class="w-6 h-6 rounded-full"
          :style="{ backgroundColor: selectedScheme.secondary }"
        ></div>
        <span class="text-sm text-gray-600">
          {{ selectedScheme.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  templateId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['select-color']);

const colorSchemes = [
  {
    id: 'professional',
    name: 'Professional Blue',
    primary: '#2563eb',
    secondary: '#60a5fa'
  },
  {
    id: 'modern',
    name: 'Modern Green',
    primary: '#059669',
    secondary: '#34d399'
  },
  {
    id: 'creative',
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#a78bfa'
  },
  {
    id: 'classic',
    name: 'Classic Gray',
    primary: '#4b5563',
    secondary: '#9ca3af'
  },
  {
    id: 'bold',
    name: 'Bold Red',
    primary: '#dc2626',
    secondary: '#f87171'
  },
  {
    id: 'elegant',
    name: 'Elegant Teal',
    primary: '#0d9488',
    secondary: '#5eead4'
  }
];

const selectedScheme = ref(null);
const customColors = ref({
  primary: '#000000',
  secondary: '#666666'
});

const selectScheme = (scheme) => {
  selectedScheme.value = scheme;
  emit('select-color', {
    id: scheme.id,
    primary: scheme.primary,
    secondary: scheme.secondary
  });
};

const applyCustomColors = () => {
  const customScheme = {
    id: 'custom',
    name: 'Custom Colors',
    primary: customColors.value.primary,
    secondary: customColors.value.secondary
  };
  selectScheme(customScheme);
};

// Set default color scheme based on template
watch(() => props.templateId, (newTemplateId) => {
  if (newTemplateId) {
    // Set default color scheme based on template
    const defaultScheme = colorSchemes.find(scheme => 
      scheme.id === (newTemplateId === 'modern' ? 'professional' : 'modern')
    ) || colorSchemes[0];
    selectScheme(defaultScheme);
  }
}, { immediate: true });
</script>

<style scoped>
/* Custom color picker styling */
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 0.375rem;
}
</style> 