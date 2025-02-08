<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <ProgressSteps :current-step="2" />
      
      <!-- Header Actions -->
      <div class="flex justify-between items-center mb-6">
        <router-link 
          to="/template-selection" 
          class="text-blue-500 hover:text-blue-600"
        >
          Back to Templates
        </router-link>
        <div class="flex gap-4">
          <button
            @click="downloadPDF"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
          >
            <i class="fas fa-download"></i>
            Download PDF
          </button>
          <button
            @click="printCV"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <i class="fas fa-print"></i>
            Print
          </button>
        </div>
      </div>

      <!-- CV Display -->
      <div class="bg-white shadow-lg" ref="cvContent">
        <CVRenderer
          :cv-data="cvData"
          :template-id="templateId"
          :colors="colors"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min.js';
import CVRenderer from '../components/CVRenderer.vue';
import ProgressSteps from '../components/ProgressSteps.vue';

const router = useRouter();
const cvContent = ref(null);

// Get data from localStorage
const cvData = JSON.parse(localStorage.getItem('cvData'));
const templateId = localStorage.getItem('selectedTemplate');
const colors = JSON.parse(localStorage.getItem('selectedColors'));

onMounted(() => {
  // Redirect if data is missing
  if (!cvData || !templateId || !colors) {
    router.push('/');
  }
});

// Download PDF function
const downloadPDF = () => {
  const element = cvContent.value;
  const opt = {
    margin: 1,
    filename: `${cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

// Print function
const printCV = () => {
  window.print();
};
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  #cvContent, #cvContent * {
    visibility: visible;
  }
  #cvContent {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style> 