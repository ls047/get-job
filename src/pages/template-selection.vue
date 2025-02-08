<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <ProgressSteps :current-step="1" />
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Choose Your CV Template</h1>
          <router-link 
            to="/" 
            class="text-blue-500 hover:text-blue-600"
          >
            Back to Form
          </router-link>
        </div>

        <TemplateSelector
          :cv-data="cvData"
          @generate="generateFinalCV"
        />

        <div v-if="selectedTemplate && selectedColor" class="mt-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
          <CVRenderer
            :cv-data="cvData"
            :template-id="selectedTemplate"
            :colors="selectedColor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TemplateSelector from '../components/TemplateSelector.vue';
import CVRenderer from '../components/CVRenderer.vue';
import ProgressSteps from '../components/ProgressSteps.vue';

const router = useRouter();
const selectedTemplate = ref(null);
const selectedColor = ref(null);

// Get CV data from localStorage
const cvData = JSON.parse(localStorage.getItem('cvData'));

onMounted(() => {
  // Redirect to form if no CV data exists
  if (!cvData) {
    router.push('/');
  }
});

const generateFinalCV = (data) => {
  // Store selected template and colors
  localStorage.setItem('selectedTemplate', data.template);
  localStorage.setItem('selectedColors', JSON.stringify(data.color));
  
  // Navigate to CV display page
  router.push('/cv-display');
};
</script> 