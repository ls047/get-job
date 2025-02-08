<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Top Bar -->
      <div class="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-4 md:mb-8 flex justify-between items-center">
        <div class="flex items-center gap-2 md:gap-4">
          <button 
            @click="router.push('/')"
            class="text-gray-600 hover:text-gray-800 text-sm md:text-base"
          >
            <i class="fas fa-arrow-left mr-1 md:mr-2"></i>
            Back
          </button>
          <h1 class="text-xl md:text-2xl font-bold text-gray-800">Edit Your CV</h1>
        </div>
        
        <!-- Save & Export Options -->
        <div class="flex gap-2 md:gap-4">
          <button 
            @click="printCV"
            class="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <i class="fas fa-print"></i>
            <span class="hidden md:inline">Print</span>
          </button>
          
          <div class="relative">
            <button 
              @click="showExportOptions = !showExportOptions"
              class="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 text-sm md:text-base bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <i class="fas fa-download"></i>
              <span class="hidden md:inline">Export As</span>
            </button>
            
            <div 
              v-if="showExportOptions"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <button 
                v-for="format in exportFormats" 
                :key="format.id"
                @click="exportCV(format.id)"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md flex items-center gap-2"
              >
                <i :class="format.icon"></i>
                {{ format.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Editor Sidebar -->
        <div class="col-span-full md:col-span-3 space-y-6">
          <!-- Style Controls -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold mb-4">Formatting</h2>
            
            <!-- Template Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select 
                v-model="selectedTemplate"
                class="w-full p-2 border rounded-md"
              >
                <option v-for="template in templates" :key="template.id" :value="template.id">
                  {{ template.name }}
                </option>
              </select>
            </div>

            <!-- Colors -->
            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div class="flex gap-2">
                  <input 
                    type="color" 
                    v-model="styleOptions.primaryColor"
                    class="w-10 h-10 rounded cursor-pointer"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div class="flex gap-2">
                  <input 
                    type="color" 
                    v-model="styleOptions.secondaryColor"
                    class="w-10 h-10 rounded cursor-pointer"
                  >
                </div>
              </div>
            </div>

            <!-- Typography -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Font
                </label>
                <select 
                  v-model="styleOptions.fontFamily"
                  class="w-full p-2 border rounded-md"
                >
                  <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">12px</span>
                    <span class="text-sm font-medium">{{ styleOptions.fontSize }}px</span>
                    <span class="text-sm text-gray-500">18px</span>
                  </div>
                  <div class="flex items-center gap-4">
                    <button 
                      @click="styleOptions.fontSize = Math.max(12, styleOptions.fontSize - 1)"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <input 
                      type="range" 
                      v-model="styleOptions.fontSize"
                      min="12"
                      max="18"
                      step="1"
                      class="flex-grow"
                    >
                    <button 
                      @click="styleOptions.fontSize = Math.min(18, styleOptions.fontSize + 1)"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <!-- Preview text -->
                  <div 
                    class="mt-4 p-3 bg-gray-50 rounded-md"
                    :style="{ fontSize: `${styleOptions.fontSize}px` }"
                  >
                    <p>Preview text at {{ styleOptions.fontSize }}px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CV Editor & Preview -->
        <div class="col-span-full md:col-span-9">
          <div 
            id="cv-preview"
            class="bg-white rounded-lg shadow-lg p-2 md:p-8  origin-top"
            :style="{
              fontFamily: styleOptions.fontFamily,
              fontSize: `${styleOptions.fontSize}px`,
              '--primary-color': styleOptions.primaryColor,
              '--secondary-color': styleOptions.secondaryColor,
              '--text-primary': styleOptions.primaryColor,
              '--text-secondary': styleOptions.secondaryColor,
              '--bg-primary': styleOptions.primaryColor,
              '--bg-secondary': styleOptions.secondaryColor,
              '--border-primary': styleOptions.primaryColor,
              '--border-secondary': styleOptions.secondaryColor
            }"
          >
            <component 
              :is="currentTemplate" 
              :cv-data="cvData"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Size Selection Dialog -->
    <div 
      v-if="showSizeDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Choose Export Size</h3>
        <p class="text-gray-600 mb-6">How would you like to export your CV?</p>
        
        <div class="flex flex-col gap-3">
          <button
            @click="exportWithSize(true)"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <i class="fas fa-mobile-alt"></i>
            Mobile Size
          </button>
          
          <button
            @click="exportWithSize(false)"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <i class="fas fa-desktop"></i>
            Desktop Size
          </button>
          
          <button
            @click="showSizeDialog = false"
            class="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ModernTemplate from '../components/templates/ModernTemplate.vue';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate.vue';
import CreativeTemplate from '../components/templates/CreativeTemplate.vue';

const route = useRoute();
const router = useRouter();

// Constants
const fonts = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans'
];

const templates = [
  {
    id: 'modern',
    name: 'Modern Clean',
    component: 'ModernTemplate'
  },
  {
    id: 'professional',
    name: 'Professional',
    component: 'ProfessionalTemplate'
  },
  {
    id: 'creative',
    name: 'Creative',
    component: 'CreativeTemplate'
  }
];

const exportFormats = [
  { id: 'pdf', name: 'PDF Document', icon: 'fas fa-file-pdf' },
  { id: 'jpg', name: 'JPG Image', icon: 'fas fa-file-image' },
  { id: 'png', name: 'PNG Image', icon: 'fas fa-file-image' }
];

// State
const showExportOptions = ref(false);
const selectedTemplate = ref(history.state?.templateId || 'modern');
const styleOptions = ref({
  primaryColor: history.state?.colorScheme?.primary || '#2563eb',
  secondaryColor: history.state?.colorScheme?.secondary || '#60a5fa',
  fontFamily: 'Arial',
  fontSize: 14
});

const cvData = ref(
  history.state?.cvData || {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  }
);

const templateComponents = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate
};

const currentTemplate = computed(() => {
  return templateComponents[selectedTemplate.value] || ModernTemplate;
});

// Add new state for size selection dialog
const showSizeDialog = ref(false);
const selectedFormat = ref(null);

// Methods
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

const addExperience = () => {
  cvData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};

const removeExperience = (index) => {
  cvData.value.experience.splice(index, 1);
};

const addEducation = () => {
  cvData.value.education.push({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};

const removeEducation = (index) => {
  cvData.value.education.splice(index, 1);
};

const addSkill = () => {
  cvData.value.skills.push({ name: '', level: 3 });
};

const removeSkill = (index) => {
  cvData.value.skills.splice(index, 1);
};

const saveChanges = () => {
  // Save to localStorage or your backend
  localStorage.setItem('cvData', JSON.stringify({
    cvData: cvData.value,
    templateId: selectedTemplate.value,
    styleOptions: styleOptions.value
  }));
};

const exportCV = async (format) => {
  selectedFormat.value = format;
  showSizeDialog.value = true;
  showExportOptions.value = false;
};

const exportWithSize = async (isMobileSize) => {
  const element = document.getElementById('cv-preview');
  
  try {
    // Set temporary styles for export
    const originalWidth = element.style.width;
    const originalTransform = element.style.transform;
    
    if (isMobileSize) {
      element.style.width = '390px'; // Standard mobile width
    } else {
      element.style.width = '1024px'; // Standard desktop width
    }
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Restore original styles
    element.style.width = originalWidth;
    element.style.transform = originalTransform;

    switch (selectedFormat.value) {
      case 'pdf':
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('my-cv.pdf');
        break;

      case 'jpg':
      case 'png':
        const link = document.createElement('a');
        link.download = `my-cv.${selectedFormat.value}`;
        link.href = canvas.toDataURL(`image/${selectedFormat.value}`);
        link.click();
        break;
    }
  } catch (error) {
    console.error('Export error:', error);
  }
  
  showSizeDialog.value = false;
};

const printCV = () => {
  window.print();
};

// Initialize data from localStorage
const loadSavedData = () => {
  const savedData = localStorage.getItem('cvData');
  if (savedData) {
    const parsed = JSON.parse(savedData);
    cvData.value = parsed.cvData;
    selectedTemplate.value = parsed.templateId;
  }
};

// Load data on component mount
onMounted(() => {
  loadSavedData();
  
  // Add print styles
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      body * {
        visibility: hidden;
      }
      #cv-preview, #cv-preview * {
        visibility: visible;
      }
      #cv-preview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);
});

// Auto-save changes
watch(
  [cvData, selectedTemplate, styleOptions],
  () => {
    localStorage.setItem('cvData', JSON.stringify({
      cvData: cvData.value,
      templateId: selectedTemplate.value,
      styleOptions: styleOptions.value
    }));
  },
  { deep: true }
);
</script>

<style>
.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--secondary-color);
}

.bg-primary {
  background-color: var(--primary-color);
}

.bg-secondary {
  background-color: var(--secondary-color);
}

.border-primary {
  border-color: var(--primary-color);
}

.border-secondary {
  border-color: var(--secondary-color);
}

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
  background: var(--primary-color);
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
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}

@media print {
  .no-print {
    display: none;
  }
}
</style> 