const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        if (entry.target.classList.contains('slide-right')) {
          entry.target.classList.add('show-slide-right');
        } else if (entry.target.classList.contains('slide-top')) {
          entry.target.classList.add('show-slide-top');
        }
      }
    });
  });

  document.querySelectorAll('.show-on-scroll').forEach((el) => observer.observe(el));