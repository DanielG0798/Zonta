// Client-side validation and flexible submit handling
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const feedback = document.getElementById('formFeedback');

  // Disable submit button after submission to prevent spam
  let isSubmitting = false;

  form.addEventListener('submit', function (e) {
    // Don't prevent default - let FormSubmit handle it
    
    if (isSubmitting) {
      e.preventDefault();
      return; // Prevent double submission
    }

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const consent = form.consent ? form.consent.checked : true;

    if (!name || !email || !message) {
      e.preventDefault();
      feedback.textContent = 'Please complete the required fields.';
      return;
    }
    if (!consent) {
      e.preventDefault();
      feedback.textContent = 'Please agree to be contacted.';
      return;
    }

    isSubmitting = true;
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Show popup before submitting
    showSuccessPopup();
    // Let form submit normally - don't prevent default
  });

  function showSuccessPopup() {
    // Create popup modal
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      text-align: center;
      max-width: 400px;
      font-family: inherit;
    `;

    const heading = document.createElement('h2');
    heading.textContent = '✓ Message Sent!';
    heading.style.cssText = 'color: #2d5016; margin: 0 0 10px 0; font-size: 24px;';

    const message = document.createElement('p');
    message.textContent = "Thank you for contacting us. We'll get back to you soon!";
    message.style.cssText = 'color: #555; margin: 0 0 20px 0; line-height: 1.5;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
      background: #9b2c70;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    `;
    closeBtn.addEventListener('click', () => {
      popup.remove();
      backdrop.remove();
    });

    popup.appendChild(heading);
    popup.appendChild(message);
    popup.appendChild(closeBtn);

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 9998;
    `;
    backdrop.addEventListener('click', () => {
      popup.remove();
      backdrop.remove();
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
  }
});
