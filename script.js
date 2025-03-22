// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Property search functionality
const searchButton = document.querySelector('.search-bar button');
searchButton.addEventListener('click', function() {
    const location = document.querySelector('.search-bar input').value;
    const propertyType = document.querySelector('.search-bar select').value;
    // Add your search logic here
    alert(`Searching for ${propertyType} properties in ${location}`);
});

// Add smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.property-card');
const revealOnScroll = function() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        alert(`${productName} added to cart!`);
        // Add your cart logic here
    });
});

// Land Development Sites functionality
// Update development sites data
const developmentSites = [
    {
        id: 1,
        title: "Riverside Development",
        location: "Riverside County, CA",
        size: "25 acres",
        type: "Mixed-use Development",
        description: "Prime waterfront property ideal for mixed-use development with commercial and residential zones.",
        coordinates: { lat: 34.0522, lng: -118.2437 },
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop"
    },
    {
        id: 2,
        title: "Highland Valley Project",
        location: "Highland Valley, CA",
        size: "40 acres",
        type: "Residential Development",
        description: "Scenic hillside location perfect for luxury residential development with panoramic views.",
        coordinates: { lat: 34.1522, lng: -118.3437 },
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop"
    }
];



// Initialize development sites showcase
function initDevelopmentSites() {
    const siteCards = document.querySelectorAll('.development-card');
    
    siteCards.forEach(card => {
        // Handle card click
        card.addEventListener('click', function() {
            const siteId = this.dataset.siteId;
            const site = developmentSites.find(s => s.id === parseInt(siteId));
            showSiteDetails(site);
        });

        // Handle hover effects
        card.addEventListener('mouseenter', function() {
            this.querySelector('.site-overlay').style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.site-overlay').style.opacity = '0.8';
        });
    });
}

// Show site details in modal
function showSiteDetails(site) {
    const modal = document.getElementById('siteModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <img src="${site.image}" alt="${site.title}">
        <h2>${site.title}</h2>
        <div class="site-details">
            <p><strong>Location:</strong> ${site.location}</p>
            <p><strong>Land Size:</strong> ${site.size}</p>
            <p><strong>Development Type:</strong> ${site.type}</p>
            <p>${site.description}</p>
        </div>
        <div id="siteMap" style="height: 300px;"></div>
    `;

    modal.style.display = 'block';

    // Initialize map
    initSiteMap(site.coordinates, site.title);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

// Initialize map for site location
function initSiteMap(coordinates, title) {
    if (typeof google !== 'undefined') {
        const map = new google.maps.Map(document.getElementById('siteMap'), {
            center: coordinates,
            zoom: 12
        });

        new google.maps.Marker({
            position: coordinates,
            map: map,
            title: title
        });
    }
}

// Initialize development sites when DOM is loaded
document.addEventListener('DOMContentLoaded', initDevelopmentSites);

// Vendor search and filter functionality
const vendorSearch = document.querySelector('.vendor-search');
const vendorCategory = document.querySelector('.vendor-category');
const vendorCards = document.querySelectorAll('.vendor-card');

function filterVendors() {
    const searchTerm = vendorSearch.value.toLowerCase();
    const category = vendorCategory.value.toLowerCase();

    vendorCards.forEach(card => {
        const vendorName = card.querySelector('h3').textContent.toLowerCase();
        const vendorCategory = card.querySelector('.category').textContent.toLowerCase();
        
        const matchesSearch = vendorName.includes(searchTerm);
        const matchesCategory = category === '' || vendorCategory.includes(category);

        card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}

vendorSearch.addEventListener('input', filterVendors);
vendorCategory.addEventListener('change', filterVendors);

// Contact vendor functionality
document.querySelectorAll('.contact-vendor').forEach(button => {
    button.addEventListener('click', function() {
        const vendorName = this.closest('.vendor-card').querySelector('h3').textContent;
        const vendorEmail = this.closest('.vendor-card').querySelector('.contact-info p:nth-child(2)').textContent;
        alert(`Contacting ${vendorName}\nEmail: ${vendorEmail}`);
        // Add your contact logic here
    });
});

// Worker booking functionality
document.querySelectorAll('.book-worker').forEach(button => {
    button.addEventListener('click', function() {
        const workerName = this.closest('.worker-card').querySelector('h3').textContent;
        const designation = this.closest('.worker-card').querySelector('.designation').textContent;
        alert(`Booking request for ${workerName} (${designation})\nOur team will contact you shortly to schedule an appointment.`);
        // Add your booking logic here
    });
});

// Initialize AOS
// Remove the duplicate workers array (keep only the one at the top)
// Remove the duplicate DOMContentLoaded event listeners

// At the bottom of the file, replace multiple event listeners with a single one:
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50
    });
    
    // Initialize workers section
    function initWorkerTimeline() {
        const container = document.querySelector('.workers-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        workers.forEach((worker, index) => {
            const showcase = document.createElement('div');
            showcase.className = 'worker-showcase';
            showcase.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
            
            showcase.innerHTML = `
                <div class="worker-wrapper">
                    <div class="worker-image-section">
                        <img src="${worker.image}" alt="${worker.name}" loading="lazy">
                        <div class="experience-badge">${worker.experience}</div>
                    </div>
                    <div class="worker-content">
                        <h3>${worker.name}</h3>
                        <p class="designation">${worker.designation}</p>
                        <p class="specialization">${worker.specialization}</p>
                        <div class="expertise">
                            ${worker.expertise.map(skill => `<span>${skill}</span>`).join('')}
                        </div>
                        <div class="worker-actions">
                            <button class="book-worker" data-worker="${worker.name}">
                                <i class="fas fa-calendar-alt"></i> Schedule Consultation
                            </button>
                            <button class="view-portfolio">
                                <i class="fas fa-folder-open"></i> View Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(showcase);
        });
    
        attachWorkerBookingHandlers();
    }
    
    // Initialize other sections
    initDevelopmentSites();
    
    // Initialize vendor functionality
    if(vendorSearch && vendorCategory) {
        vendorSearch.addEventListener('input', filterVendors);
        vendorCategory.addEventListener('change', filterVendors);
    }
});

