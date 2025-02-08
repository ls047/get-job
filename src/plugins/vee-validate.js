import { defineRule, configure } from 'vee-validate';
import { required, email, min, max, url } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// Define the rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('url', url);

// Configure Vee-Validate
configure({
  generateMessage: localize('en', {
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email',
      min: 'This field must be at least {length} characters',
      max: 'This field must be less than {length} characters',
      url: 'Please enter a valid URL'
    }
  })
}); 