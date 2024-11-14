 // Wait for the DOM to be fully loaded before running the script
 document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and the main navigation element
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Add click event listener to the menu toggle button
    menuToggle.addEventListener('click', function() {
        // Toggle the 'show' class on the main navigation to show/hide the menu
        mainNav.classList.toggle('show');
    });

    // Menu data (in a real application, this might come from a database or API)
    const menuItems = [
        { category: 'Appetizers', items: [
            { name: 'Bruschetta', description: 'Toasted bread topped with fresh tomatoes, garlic, and basil', price: 8.99, image: '../images/restaurant/bruschetta.jpg' },
            { name: 'Calamari', description: 'Lightly breaded and fried squid rings with marinara sauce', price: 10.99, image: '../images/restaurant/calamari.jpg' },
            { name: 'Spinach Artichoke Dip', description: 'Creamy dip served with toasted pita chips', price: 9.99, image: '../images/restaurant/spinach-artichoke-dip.jpg' }
        ]},
        { category: 'Main Courses', items: [
            { name: 'Grilled Chicken', description: 'Herb-marinated chicken breast with roasted vegetables', price: 15.99, image: '../images/restaurant/grilled-chicken.jpg' },
            { name: 'Beef Tenderloin', description: 'Pan-seared beef tenderloin with red wine reduction', price: 24.99, image: '../images/restaurant/beef-tenderloin.jpg' },
            { name: 'Vegetarian Pasta', description: 'Penne pasta with roasted vegetables and pesto sauce', price: 14.99, image: '../images/restaurant/vegetarian-pasta.jpg' }
        ]},
        { category: 'Desserts', items: [
            { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey center', price: 7.99, image: '../images/restaurant/chocolate-lava-cake.jpg' },
            { name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: 6.99, image: '../images/restaurant/tiramisu.jpg' },
            { name: 'Fruit Tart', description: 'Buttery tart shell filled with custard and fresh fruits', price: 5.99, image: '../images/restaurant/fruit-tart.jpg' }
        ]}
    ];

    // Function to create menu category sections
    function createMenuCategories() {
        const menuCategoriesSection = document.getElementById('menu-categories');
        
        // Iterate through each category and add the items to the corresponding section
        menuItems.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'menu-category';
            categorySection.id = category.category.toLowerCase().replace(' ', '-');
            
            // Add the category title
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.category;
            categorySection.appendChild(categoryTitle);
            
            // Add each item within the category
            category.items.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="menu-item-details">
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-description">${item.description}</div>
                    </div>
                    <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                `;
                categorySection.appendChild(menuItem);
            });
            
            // Append the category section to the menu categories section
            menuCategoriesSection.appendChild(categorySection);
        });
    }

    // Call the function to create menu categories
    createMenuCategories();

    // Function to handle responsive image loading for the featured dish only
    function handleResponsiveImages() {
        const featuredImg = document.getElementById('featured-img');
        
        // Check the viewport width and set the appropriate image source
        function setImageSource() {
            if (window.innerWidth < 601) {
                featuredImg.src = '../images/restaurant/featured-dish-small.jpg';
            } else if (window.innerWidth < 901) {
                featuredImg.src = '../images/restaurant/featured-dish-medium.jpg';
            } else {
                featuredImg.src = '../images/restaurant/featured-dish-large.jpg';
            }
        }

        // Set initial image source
        setImageSource();

        // Update image source on window resize
        window.addEventListener('resize', setImageSource);
    }

    // Call the function to handle responsive images for the featured dish
    handleResponsiveImages();
});