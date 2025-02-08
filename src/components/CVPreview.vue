<template>
  <div class="bg-white rounded-lg shadow-md">
    <!-- Preview Header -->
    <div class="p-6 border-b">
      <h2 class="text-xl font-semibold text-gray-800">Preview Your CV</h2>
      <p class="text-sm text-gray-600 mt-1">Review your CV before downloading</p>
    </div>

    <!-- Preview Container -->
    <div class="p-6">
      <!-- Template Preview -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Modern Template -->
        <ModernTemplate
          v-if="templateId === 'modern'"
          :cv-data="cvData"
          :colors="colorScheme"
        />
        
        <!-- Professional Template -->
        <ProfessionalTemplate
          v-else-if="templateId === 'professional'"
          :cv-data="cvData"
          :colors="colorScheme"
        />
        
        <!-- Creative Template -->
        <CreativeTemplate
          v-else-if="templateId === 'creative'"
          :cv-data="cvData"
          :colors="colorScheme"
        />
      </div>

      <!-- Download Options -->
      <div class="mt-8 space-y-4">
        <h3 class="text-lg font-medium text-gray-700">Download Options</h3>
        
        <!-- Format Selection -->
        <div class="flex space-x-4">
          <button
            v-for="format in downloadFormats"
            :key="format.id"
            @click="downloadCV(format.id)"
            class="flex items-center px-4 py-2 rounded-md border transition-colors duration-200"
            :class="[
              selectedFormat === format.id
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            ]"
          >
            <i :class="format.icon" class="mr-2"></i>
            {{ format.name }}
          </button>
        </div>

        <!-- Quality Options (for PDF) -->
        <div v-if="selectedFormat === 'pdf'" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            PDF Quality
          </label>
          <select
            v-model="pdfQuality"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="draft">Draft - Smaller file size</option>
            <option value="standard">Standard - Balanced</option>
            <option value="high">High - Best quality</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ModernTemplate from './templates/ModernTemplate.vue';
import ProfessionalTemplate from './templates/ProfessionalTemplate.vue';
import CreativeTemplate from './templates/CreativeTemplate.vue';
import html2pdf from 'html2pdf.js';

const props = defineProps({
  cvData: {
    type: Object,
    required: true
  },
  templateId: {
    type: String,
    required: true
  },
  colorScheme: {
    type: Object,
    required: true
  }
});

const selectedFormat = ref('pdf');
const pdfQuality = ref('standard');

const downloadFormats = [
  {
    id: 'pdf',
    name: 'PDF',
    icon: 'fas fa-file-pdf'
  },
  {
    id: 'png',
    name: 'Image',
    icon: 'fas fa-file-image'
  }
];

const emit = defineEmits(['preview-ready']);

const downloadCV = async (format) => {
  selectedFormat.value = format;
  const element = document.querySelector('.cv-preview');
  
  if (format === 'pdf') {
    const opt = {
      margin: 0.5,
      filename: `${props.cvData.fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: pdfQuality.value === 'high' ? 2 : 1,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  } else if (format === 'png') {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `${props.cvData.fullName.replace(/\s+/g, '_')}_CV.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Error generating image. Please try again.');
    }
  }
};

// Add this to emit the ready event when the component is mounted
onMounted(() => {
  // Wait a moment for the template to render
  setTimeout(() => {
    emit('preview-ready');
  }, 1000);
});
</script>

<style scoped>
.cv-preview {
  width: 21cm; /* A4 width */
  min-height: 29.7cm; /* A4 height */
  margin: 0 auto;
  background: white;
  padding: 2cm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media print {
  .cv-preview {
    width: 100%;
    height: 100%;
    padding: 0;
    box-shadow: none;
  }
}
</style> 