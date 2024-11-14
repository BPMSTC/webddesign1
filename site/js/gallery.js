 // Wait for the DOM to be fully loaded before running the script
 document.addEventListener('DOMContentLoaded', function() {
    // Function to generate a greeting based on the time of day
    function generateGreeting() {
        // Get the current hour (0-23)
        const currentHour = new Date().getHours();
        let greeting;

        // Determine the appropriate greeting based on the time
        if (currentHour < 12) {
            greeting = "Good morning";
        } else if (currentHour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        // Add a personalized touch to the greeting
        greeting += ", nature lover!";

        return greeting;
    }

    // Function to update the greeting message in the DOM
    function updateGreeting() {
        // Get the greeting element
        const greetingElement = document.getElementById('greeting');

        // Set the greeting text
        greetingElement.textContent = generateGreeting();
    }

    // Call the updateGreeting function when the page loads
    updateGreeting();

    // Optional: Update the greeting every minute to keep it current
    setInterval(updateGreeting, 60000); // 60000 milliseconds = 1 minute
});