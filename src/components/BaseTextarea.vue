<template>
  <Field :name="name" :rules="rules" v-slot="{ field, errorMessage }">
    <div class="flex flex-col gap-1">
      <label v-if="label" class="text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <textarea
        v-bind="field"
        :rows="rows"
        :placeholder="placeholder"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        :class="{ 'border-red-500': errorMessage }"
      ></textarea>
      <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
    </div>
  </Field>
</template>

<script setup>
import { Field } from 'vee-validate';

defineProps({
  name: {
    type: String,
    required: true
  },
  rules: {
    type: [String, Function, Object],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  placeholder: {
    type: String,
    default: ''
  }
});
</script> 