document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    // Helper function to show an error message
    const showError = (field, message) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        field.classList.add('error');
        errorElement.textContent = message;
    };

    // Helper function to clear an error message
    const clearError = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        field.classList.remove('error');
        errorElement.textContent = '';
    };

    // Helper function to validate email format
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default browser submission
        
        // Clear previous status messages
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Get all form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;

        // --- Validation Logic ---
        // Clear all previous errors before re-validating
        clearError(name);
        clearError(email);
        clearError(message);

        // Name validation
        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Full Name is required.');
        }

        // Email validation
        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Email Address is required.');
        } else if (!validateEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address.');
        }

        // Message validation
        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Message is required.');
        }
        
        // --- Form Submission ---
        if (isValid) {
            const formData = {
                name: name.value,
                email: email.value,
                message: message.value
            };

            // Mock submission using Fetch API to a fake endpoint
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                
                // Success UI
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.classList.add('success');
                form.reset(); // Clear the form fields

            } catch (error) {
                // Error UI
                formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                formStatus.classList.add('error');
                console.error('Submission error:', error);
            }
        }
    });
});