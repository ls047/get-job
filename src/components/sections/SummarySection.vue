<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Professional Summary</h2>
    <BaseTextarea
      name="summary"
      label="Summary"
      :rules="validateRequired"
      placeholder="Write a brief professional summary..."
      :rows="4"
    />
  </div>
</template>

<script setup>
import BaseTextarea from '../BaseTextarea.vue';
import * as yup from 'yup';

const validateRequired = yup.string().required('This field is required');
</script> 