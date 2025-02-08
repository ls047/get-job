<template>
  <div class="bg-white shadow-lg">
    <component 
      :is="selectedTemplate" 
      :cv-data="cvData"
      :colors="colors"
    />
  </div>
</template>

<script setup>
import ModernTemplate from './templates/ModernTemplate.vue';
import ProfessionalTemplate from './templates/ProfessionalTemplate.vue';
import CreativeTemplate from './templates/CreativeTemplate.vue';

const props = defineProps({
  cvData: {
    type: Object,
    required: true
  },
  templateId: {
    type: String,
    required: true
  },
  colors: {
    type: Object,
    required: true
  }
});

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate
};

const selectedTemplate = templates[props.templateId];
</script> 