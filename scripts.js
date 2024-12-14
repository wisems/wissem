// Select necessary elements
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
const visitBtn = document.querySelector('.visit-btn');
const contactFormButton = document.querySelector('.contact .btn');
const githubBtn = document.getElementById('github-btn');
const linkedinBtn = document.getElementById('linkedin-btn');

// GitHub button click handler
githubBtn.addEventListener('click', () => {
    window.open('https://github.com/Wisems', '_blank');
});

// LinkedIn button click handler
linkedinBtn.addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/wissem-abidi-b31ab8176/', '_blank');
});

// Toggle mobile navigation menu
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('fa-times');
});

// Demo functionality
const demoBtns = document.querySelectorAll('.project-card .btn');
const demoModal = document.getElementById('demoModal');
const demoImage = document.getElementById('demoImage');
const closeModal = document.querySelector('.close-modal');

// Demo button click handlers
demoBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const demoImages = [
            'demo1.jpg',  // Portfolio Website demo
            'demo2.jpg',  // Restaurant Management System demo
            'demo3.jpg'   // Restaurant Menu Application demo
        ];
        demoImage.src = demoImages[index];
        demoModal.style.display = 'flex';
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    demoModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        demoModal.style.display = 'none';
    }
});

// Smooth scroll for navigation links
const links = document.querySelectorAll('.nav-links a, footer ul li a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
        }
    });
});

// Theme switcher functionality
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(isDark) {
    if (isDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    themeToggle.checked = savedTheme === 'dark';
    setTheme(savedTheme === 'dark');
}

// Theme switch handler
themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked);
    console.log('Theme switched:', e.target.checked ? 'dark' : 'light'); // Debug log
});

// Log initial state
console.log('Initial theme:', localStorage.getItem('theme')); // Debug log

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Form submitted");

        const btn = document.querySelector('.submit-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Create the parameters object
        const params = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            subject: document.getElementById('subject').value
        };

        console.log("Sending with params:", params);

        // Make sure to use your actual template ID here
        emailjs.send("service_03vs62i", "template_brixsz8", params, "9hCzR9i7VSQje3jbR")
            .then(
                function(response) {
                    console.log("SUCCESS", response);
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    form.reset();
                },
                function(error) {
                    console.log("FAILED", error);
                    btn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
                }
            )
            .finally(function() {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 3000);
            });
    });
});