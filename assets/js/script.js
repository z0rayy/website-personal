// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      entry.target.style.opacity = '1';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with reveal-on-scroll class
document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Mobile sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('translate-x-full');
}

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Close mobile sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
      }
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Auto hide/show navbar on scroll and active links
let lastScroll = 0;
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Auto hide/show navbar
  if (currentScroll <= 0) {
    // At the top of the page
    header.style.transform = 'translateY(0)';
  } else if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down & past 100px
    header.style.transform = 'translateY(-100%)';
  } else if (currentScroll < lastScroll) {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
  
  // Active navigation link on scroll
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (currentScroll >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('text-cyan-400');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('text-cyan-400');
    }
  });
  
  // Parallax effect
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(el => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = `translateY(${currentScroll * speed}px)`;
  });
});