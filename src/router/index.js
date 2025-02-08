import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import TemplateSelection from '../pages/template-selection.vue'
import CVDisplay from '../pages/cv-display.vue'
import EditCV from '../pages/edit-cv.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/template-selection',
    name: 'template-selection',
    component: TemplateSelection
  },
  {
    path: '/cv-display',
    name: 'cv-display',
    component: CVDisplay
  },
  {
    path: '/edit-cv',
    name: 'edit-cv',
    component: EditCV
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
