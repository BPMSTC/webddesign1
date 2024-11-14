// accessiblepage.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Menu Toggle for Mobile Devices
    const navToggle = document.createElement('button');
    navToggle.innerText = 'Menu';
    navToggle.setAttribute('aria-controls', 'navigation');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('id', 'nav-toggle');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.style.display = 'none'; // Hidden by default, will be shown on small screens

    const header = document.querySelector('header');
    header.insertBefore(navToggle, header.firstChild);

    const nav = document.querySelector('nav ul');
    nav.setAttribute('id', 'navigation'); // Ensure the nav has an ID for aria-controls

    // Function to toggle navigation menu
    function toggleNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        nav.style.display = isExpanded ? 'none' : 'flex';
        
        // Update ARIA attributes for accessibility
        if (!isExpanded) {
            nav.setAttribute('aria-hidden', 'false');
            navToggle.setAttribute('aria-label', 'Close navigation menu');
        } else {
            nav.setAttribute('aria-hidden', 'true');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    }

    navToggle.addEventListener('click', toggleNav);

    // Show toggle button on small screens
    function handleResize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            nav.style.display = 'none';
            nav.setAttribute('aria-hidden', 'true');
        } else {
            navToggle.style.display = 'none';
            nav.style.display = 'flex';
            nav.setAttribute('aria-hidden', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    // Enhance keyboard accessibility for the navigation toggle
    navToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleNav();
        }
    });

    // Close navigation when clicking outside (optional enhancement)
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && window.innerWidth <= 768) {
            if (navToggle.getAttribute('aria-expanded') === 'true') {
                toggleNav();
            }
        }
    });

    // Form Validation (Enhanced for Accessibility)
    const form = document.querySelector('footer form');

    // Create ARIA live region for error messages
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('id', 'form-errors');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-9999px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);

    form.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let errors = [];

        // Clear previous errors
        liveRegion.innerHTML = '';

        if (name === '') {
            errors.push('Name is required.');
        }
        if (email === '') {
            errors.push('Email is required.');
        } else if (!validateEmail(email)) {
            errors.push('Please enter a valid email address.');
        }
        if (message === '') {
            errors.push('Message is required.');
        }

        if (errors.length > 0) {
            event.preventDefault();
            liveRegion.innerHTML = errors.join(' ');

            // Focus the first invalid input
            if (name === '') {
                document.getElementById('name').focus();
            } else if (email === '' || !validateEmail(email)) {
                document.getElementById('email').focus();
            } else {
                document.getElementById('message').focus();
            }
        }
    });

    // Email validation function
    function validateEmail(email) {
        // Simple email regex for demonstration purposes
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // TODO: Improve form accessibility by managing focus and providing ARIA live regions for error messages
    // Example:
    // - Implement real-time validation feedback as users fill out the form fields.
    // - Announce successful submissions or additional errors.
    
    // Additional TODOs:

    // TODO: Add real-time validation to form fields to provide immediate feedback
    // Example:
    // document.getElementById('email').addEventListener('input', function() {
    //     if (validateEmail(this.value)) {
    //         // Provide positive feedback
    //     } else {
    //         // Provide error feedback
    //     }
    // });

    // TODO: Ensure that all interactive elements are reachable via keyboard
    // - Verify that no element is skipped or inaccessible when navigating with the Tab key.

    // TODO: Implement ARIA roles where necessary
    // - Example: Add role="navigation" to the <nav> element if not already present.

    // TODO: Enhance focus management for dynamic content
    // - Ensure that when new content is added dynamically (e.g., error messages), focus is appropriately managed.

    // TODO: Provide skip navigation links
    // - Allow users to skip repetitive navigation links and jump directly to main content.
    // Example:
    // <a href="#main-content" class="skip-link">Skip to main content</a>
});
