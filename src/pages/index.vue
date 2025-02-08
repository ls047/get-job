<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <ProgressSteps 
        :current-step="currentStep" 
        :steps="steps"
      />
      
      <div class="mt-8">
        <!-- Personal Details -->
        <div v-if="currentStep === 0">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-6">Personal Details</h2>
            
            <!-- Photo Upload -->
            <div class="mb-6">
              <FormLabel>Profile Photo</FormLabel>
              <div class="flex items-center gap-4">
                <div class="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                  <img 
                    v-if="formData.personal.photo" 
                    :src="formData.personal.photo" 
                    class="w-full h-full object-cover"
                    alt="Profile photo"
                  />
                  <div 
                    v-else 
                    class="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400"
                  >
                    <i class="fas fa-user text-3xl"></i>
                  </div>
                </div>
                
                <div class="flex flex-col gap-2">
                  <input
                    type="file"
                    ref="photoInput"
                    accept="image/*"
                    class="hidden"
                    @change="handlePhotoUpload"
                  />
                  <Button
                    @click="$refs.photoInput.click()"
                    variant="outline"
                    icon="mdi:upload"
                  >
                    Upload Photo
                  </Button>
                  <Button
                    v-if="formData.personal.photo"
                    @click="removePhoto"
                    variant="destructive"
                    icon="mdi:trash"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    v-model="formData.personal.fullName"
                    type="text"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    v-model="formData.personal.email"
                    type="email"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input 
                    v-model="formData.personal.phone"
                    type="tel"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input 
                    v-model="formData.personal.location"
                    type="text"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input 
                    v-model="formData.personal.website"
                    type="url"
                  />
                </FormControl>
              </FormItem>
            </div>
          </div>
        </div>

        <!-- Professional Summary -->
        <div v-if="currentStep === 1">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-6">Professional Summary</h2>
            <textarea 
              v-model="formData.summary"
              class="w-full min-h-[200px] p-2 border rounded-md"
              placeholder="Write a brief professional summary..."
            ></textarea>
          </div>
        </div>

        <!-- Work Experience -->
        <div v-if="currentStep === 2">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Work Experience</h2>
              <button 
                @click="addExperience"
                class="text-blue-500 hover:text-blue-600"
              >
                <i class="fas fa-plus mr-2"></i>Add Experience
              </button>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(exp, index) in formData.experience" 
                :key="index"
                class="p-4 border rounded-lg"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-grow space-y-4">
                    <input 
                      v-model="exp.title"
                      placeholder="Job Title"
                      class="w-full p-2 border rounded-md"
                    />
                    <input 
                      v-model="exp.company"
                      placeholder="Company Name"
                      class="w-full p-2 border rounded-md"
                    />
                    <div class="flex gap-4">
                      <input 
                        v-model="exp.startDate"
                        type="date"
                        class="flex-1 p-2 border rounded-md"
                      />
                      <input 
                        v-model="exp.endDate"
                        type="date"
                        class="flex-1 p-2 border rounded-md"
                      />
                    </div>
                    <textarea 
                      v-model="exp.description"
                      placeholder="Job Description"
                      class="w-full p-2 border rounded-md min-h-[100px]"
                    ></textarea>
                  </div>
                  <button 
                    @click="removeExperience(index)"
                    class="ml-4 text-red-500 hover:text-red-600"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div v-if="currentStep === 3">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Education</h2>
              <button 
                @click="addEducation"
                class="text-blue-500 hover:text-blue-600"
              >
                <i class="fas fa-plus mr-2"></i>Add Education
              </button>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(edu, index) in formData.education" 
                :key="index"
                class="p-4 border rounded-lg"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-grow space-y-4">
                    <input 
                      v-model="edu.degree"
                      placeholder="Degree"
                      class="w-full p-2 border rounded-md"
                    />
                    <input 
                      v-model="edu.institution"
                      placeholder="Institution"
                      class="w-full p-2 border rounded-md"
                    />
                    <div class="flex gap-4">
                      <input 
                        v-model="edu.startDate"
                        type="date"
                        class="flex-1 p-2 border rounded-md"
                      />
                      <input 
                        v-model="edu.endDate"
                        type="date"
                        class="flex-1 p-2 border rounded-md"
                      />
                    </div>
                    <textarea 
                      v-model="edu.description"
                      placeholder="Description"
                      class="w-full p-2 border rounded-md min-h-[100px]"
                    ></textarea>
                  </div>
                  <button 
                    @click="removeEducation(index)"
                    class="ml-4 text-red-500 hover:text-red-600"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div v-if="currentStep === 4">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <SkillsForm v-model="formData.skills" />
          </div>
        </div>

        <!-- Template Selection -->
        <div v-if="currentStep === 5">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-6">Choose Template</h2>
            <div class="grid grid-cols-3 gap-6">
              <div 
                v-for="template in templates"
                :key="template.id"
                @click="selectedTemplate = template.id"
                class="cursor-pointer relative rounded-lg overflow-hidden border-2 transition-all"
                :class="selectedTemplate === template.id ? 'border-blue-500' : 'border-gray-200'"
              >
                <img :src="template.preview" :alt="template.name" class="w-full aspect-[3/4] object-cover" />
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span class="text-white font-medium">{{ template.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Replace the Navigation section with this updated version -->
      <div class="fixed bottom-6 left-0 right-0">
        <div class="max-w-sm mx-auto px-2 md:max-w-4xl md:px-4">
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 p-2 md:p-4 flex items-center justify-between">
            <Button
              v-if="currentStep > 0"
              type="button"
              variant="ghost"
              @click="prevStep"
              class="min-w-[80px] md:min-w-[120px] group hover:bg-gray-100/80"
            >
              <i class="fas fa-chevron-left mr-2 text-sm group-hover:-translate-x-1 transition-transform"></i>
              Previous
            </Button>
            <div v-else class="min-w-[80px] md:min-w-[120px]"></div>

            <!-- Step Indicators -->
            <div class="flex items-center gap-1 md:gap-2">
              <!-- Start point -->
              <div 
                class="w-1.5 h-1.5 rounded-full transition-all duration-300 md:w-2 md:h-2"
                :class="currentStep === 0 ? 'bg-primary scale-125' : 'bg-primary/60'"
              ></div>
              
              <!-- Main steps -->
              <div 
                v-for="(step, index) in steps" 
                :key="index"
                class="flex items-center"
              >
                <div 
                  class="w-4 h-0.5 mx-0.5 md:w-8 md:h-0.5 md:mx-1"
                  :class="[
                    index <= currentStep ? 'bg-primary/60' : 'bg-gray-200'
                  ]"
                ></div>
                <div 
                  v-if="index < steps.length - 1"
                  class="w-1.5 h-1.5 rounded-full transition-all duration-300 md:w-2 md:h-2"
                  :class="[
                    index + 1 === currentStep ? 'bg-primary scale-125' : 
                    index + 1 < currentStep ? 'bg-primary/60' : 'bg-gray-200'
                  ]"
                ></div>
              </div>

              <!-- End point -->
              <div 
                class="w-1.5 h-1.5 rounded-full transition-all duration-300 md:w-2 md:h-2"
                :class="currentStep === steps.length - 1 ? 'bg-primary scale-125' : 
                       currentStep >= steps.length - 1 ? 'bg-primary/60' : 'bg-gray-200'"
              ></div>
            </div>
            
            <NextButton
              v-if="currentStep < steps.length - 1"
              :text="'Next'"
              @click="nextStep"
            />
            <NextButton
              v-else
              :text="'Create CV'"
              @click="finishAndEdit"
            />
          </div>
        </div>
      </div>

      <!-- Add padding to the bottom of the main content -->
      <div class="pb-28">
        <!-- ... rest of your existing content ... -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/Input.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormControl from '@/components/ui/form/FormControl.vue';
import ProgressSteps from '../components/ProgressSteps.vue';
import SkillsForm from '../components/forms/SkillsForm.vue';
import NextButton from '@/components/NextButton.vue';

const STORAGE_KEY = 'cv_form_data';
const router = useRouter();
const currentStep = ref(0);

const steps = [
  'Personal Details',
  'Professional Summary',
  'Work Experience',
  'Education',
  'Skills',
  'Choose Template'
];

const templates = [
  {
    id: 'modern',
    name: 'Modern Clean',
    preview: '/templates/modern.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    preview: '/templates/professional.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    preview: '/templates/creative.png'
  }
];

const formData = ref(
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      photo: null
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    currentStep: 0
  }
);

const selectedTemplate = ref('modern');

const photoInput = ref(null);

onMounted(() => {
  const savedStep = formData.value.currentStep;
  if (savedStep !== undefined) {
    currentStep.value = savedStep;
  }
});

watch([formData, currentStep], () => {
  formData.value.currentStep = currentStep.value;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData.value));
}, { deep: true });

const clearFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
  formData.value = {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      photo: null
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    currentStep: 0
  };
  currentStep.value = 0;
};

const addExperience = () => {
  formData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};

const removeExperience = (index) => {
  formData.value.experience.splice(index, 1);
};

const addEducation = () => {
  formData.value.education.push({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};

const removeEducation = (index) => {
  formData.value.education.splice(index, 1);
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.personal.photo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  formData.value.personal.photo = null;
};

const nextStep = () => {
  if (currentStep.value >= steps.length - 1) return;
  currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const finishAndEdit = () => {
  localStorage.setItem('cvData', JSON.stringify({
    cvData: formData.value,
    templateId: selectedTemplate.value,
    lastUpdated: new Date().toISOString()
  }));
  
  clearFormData();
  
  router.push('/edit-cv');
};
</script>

<style scoped>
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Optional: Add a gradient animation to the primary button */
.button-gradient {
  background: linear-gradient(
    45deg,
    var(--primary-color),
    color-mix(in srgb, var(--primary-color) 80%, white)
  );
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
