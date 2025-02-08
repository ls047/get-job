<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Education</h2>
    <div v-for="(_, index) in educationCount" :key="index" class="mb-6 p-4 border rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          :name="`education[${index}].degree`"
          label="Degree"
          :rules="validateRequired"
          placeholder="Bachelor's in Computer Science"
        />
        <BaseInput
          :name="`education[${index}].institution`"
          label="Institution"
          :rules="validateRequired"
          placeholder="University Name"
        />
        <BaseDateInput
          :name="`education[${index}].startDate`"
          label="Start Date"
          :rules="validateRequired"
        />
        <BaseDateInput
          :name="`education[${index}].endDate`"
          label="End Date"
        />
      </div>
      <button
        type="button"
        @click="removeEducation(index)"
        class="mt-4 text-red-500 hover:text-red-700 transition-colors"
      >
        Remove Education
      </button>
    </div>
    <button
      type="button"
      @click="addEducation"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
    >
      Add Education
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseDateInput from '../BaseDateInput.vue';
import * as yup from 'yup';

const educationCount = ref([{}]);
const validateRequired = yup.string().required('This field is required');

const addEducation = () => educationCount.value.push({});
const removeEducation = (index) => {
  if (educationCount.value.length > 1) {
    educationCount.value.splice(index, 1);
  }
};
</script> 