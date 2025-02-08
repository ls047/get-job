<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
    
    <!-- Photo Upload -->
    <div class="mb-6 flex items-start space-x-6">
      <div class="shrink-0">
        <img
          v-if="photoPreview"
          :src="photoPreview"
          class="h-32 w-32 object-cover rounded-lg"
          alt="Profile photo"
        />
        <div
          v-else
          class="h-32 w-32 rounded-lg bg-gray-100 flex items-center justify-center"
        >
          <i class="fas fa-user text-4xl text-gray-400"></i>
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Profile Photo</label>
          <p class="text-xs text-gray-500">Optional. Recommended size: 400x400px</p>
        </div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          ref="fileInput"
          @change="handlePhotoUpload"
        />
        <div class="flex space-x-2">
          <button
            type="button"
            @click="$refs.fileInput.click()"
            class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Photo
          </button>
          <button
            v-if="photoPreview"
            type="button"
            @click="removePhoto"
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Existing Personal Information Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        name="fullName"
        label="Full Name"
        :rules="validateRequired"
        placeholder="John Doe"
      />
      <BaseInput
        name="email"
        type="email"
        label="Email"
        :rules="validateEmail"
        placeholder="john@example.com"
      />
      <BaseInput
        name="phone"
        label="Phone"
        :rules="validatePhone"
        placeholder="+1234567890"
      />
      <BaseInput
        name="location"
        label="Location"
        :rules="validateRequired"
        placeholder="City, Country"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../BaseInput.vue';
import * as yup from 'yup';

const validateRequired = yup.string().required('This field is required');
const validateEmail = yup.string().required('Email is required').email('Invalid email format');
const validatePhone = yup.string().required('Phone is required').matches(/^\+?\d{10,}$/, 'Invalid phone number');

const photoPreview = ref(null);
const fileInput = ref(null);

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target.result;
      // Store the photo in form data
      emit('update:photo', photoPreview.value);
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  photoPreview.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('update:photo', null);
};

const emit = defineEmits(['update:photo']);
</script> 