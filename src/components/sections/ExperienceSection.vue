<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Work Experience</h2>
    <div v-for="(_, index) in experienceCount" :key="index" class="mb-6 p-4 border rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          :name="`experience[${index}].title`"
          label="Job Title"
          :rules="validateRequired"
          placeholder="Software Engineer"
        />
        <BaseInput
          :name="`experience[${index}].company`"
          label="Company"
          :rules="validateRequired"
          placeholder="Company Name"
        />
        <BaseDateInput
          :name="`experience[${index}].startDate`"
          label="Start Date"
          :rules="validateRequired"
        />
        <BaseDateInput
          :name="`experience[${index}].endDate`"
          label="End Date"
        />
      </div>
      <div class="mt-4">
        <BaseTextarea
          :name="`experience[${index}].description`"
          label="Description"
          :rules="validateRequired"
          placeholder="Describe your responsibilities and achievements..."
          :rows="3"
        />
      </div>
      <button
        type="button"
        @click="removeExperience(index)"
        class="mt-4 text-red-500 hover:text-red-700 transition-colors"
      >
        Remove Experience
      </button>
    </div>
    <button
      type="button"
      @click="addExperience"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
    >
      Add Experience
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseTextarea from '../BaseTextarea.vue';
import BaseDateInput from '../BaseDateInput.vue';
import * as yup from 'yup';

const experienceCount = ref([{}]);
const validateRequired = yup.string().required('This field is required');

const addExperience = () => experienceCount.value.push({});
const removeExperience = (index) => {
  if (experienceCount.value.length > 1) {
    experienceCount.value.splice(index, 1);
  }
};
</script> 