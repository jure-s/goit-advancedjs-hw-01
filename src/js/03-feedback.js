import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('.feedback-form');
    const storedFeedbackState = localStorage.getItem('feedback-form-state');

    const saveFeedbackState = throttle(function() {
        const email = feedbackForm.querySelector('[name="email"]').value;
        const message = feedbackForm.querySelector('[name="message"]').value;

        const feedbackState = {
            email,
            message
        };

        localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
    }, 500);

    feedbackForm.addEventListener('input', saveFeedbackState);

    if (storedFeedbackState) {
        const feedbackState = JSON.parse(storedFeedbackState);

        feedbackForm.querySelector('[name="email"]').value = feedbackState.email;
        feedbackForm.querySelector('[name="message"]').value = feedbackState.message;
    }

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = feedbackForm.querySelector('[name="email"]').value;
        const message = feedbackForm.querySelector('[name="message"]').value;

        const feedbackState = {
            email,
            message
        };

        console.log(feedbackState);

        localStorage.removeItem('feedback-form-state');

        feedbackForm.reset();
    });
});
