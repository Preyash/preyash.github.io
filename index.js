const menuLinks = Array.from(document.querySelectorAll(".menu .links"));
menuLinks?.map((i) =>
  i.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll(".menu .active"), (i) => {
      i.classList.remove("active");
      i.children[0].src = i.children[0]?.src?.replace("_filled", "");
    });
    i.className += " active";
    i.children[0].src = i.children[0].src.split(".png")[0] + "_filled.png";
    
    // Add smooth scroll to section
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  })
);

const viewLinks = Array.from(document.querySelectorAll(".view .links"));
viewLinks?.map((i) =>
  i.addEventListener("click", function () {
    [].forEach.call(document.querySelectorAll(".view .active"), (i) => {
      i.classList.remove("active");
      i.children[0].src = i.children[0]?.src?.replace("_filled", "");
    });
    i.className += " active";
    i.children[0].src = i.children[0].src.split(".png")[0] + "_filled.png";

    const projects = document.querySelectorAll(".project");
    const isGrid = i.children[0].src.includes("grid_filled");
    projects.forEach((project) => {
      const carousel = project.querySelector(".owl-carousel");
      if (isGrid) {
        project.classList.add("grid-view");
        if (carousel) {
          carousel.style.display = "none";
          const firstImage = carousel.querySelector("img");
          if (firstImage) {
            const gridImage = document.createElement("img");
            gridImage.src = firstImage.src;
            gridImage.className = "grid-image";
            gridImage.alt = firstImage.alt;
            project.insertBefore(gridImage, carousel);
          }
        }
      } else {
        project.classList.remove("grid-view");
        const gridImage = project.querySelector(".grid-image");
        if (gridImage) {
          gridImage.remove();
        }
        if (carousel) {
          carousel.style.display = "block";
        }
      }
    });

    const projectsContainer = document.querySelector(".projects");
    if (isGrid) {
      projectsContainer.classList.add("grid-container");
    } else {
      projectsContainer.classList.remove("grid-container");
    }
  })
);

window.onload = () => {
  Array.from(document.querySelectorAll(".slider2 .slick-list img")).map((i) =>
    i.classList.add("img-fluid")
  );
};

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    margin: 10,
    responsiveClass: true,
    navText: [
      "<img class='slick-prev' src='./img/left.png' />",
      "<img class='slick-next' src='./img/left.png'/>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      1000: {
        items: 1,
      },
    },
  });
});

document.querySelector(".more-button").addEventListener("click", function () {
  this.classList.toggle('active');
  document.querySelector(".list-container").classList.toggle("menu-active");
  
  // Add animation class for better feedback
  if (this.classList.contains('active')) {
    this.style.transform = 'rotate(180deg)';
  } else {
    this.style.transform = 'rotate(0deg)';
  }
});

// Add event listeners for mobile menu links
const mobileMenuLinks = Array.from(document.querySelectorAll(".more-button-list .links"));
mobileMenuLinks?.map((i) =>
  i.addEventListener("click", function () {
    // Remove active class from all mobile menu links
    [].forEach.call(document.querySelectorAll(".more-button-list .active"), (i) => {
      i.classList.remove("active");
      i.children[0].src = i.children[0]?.src?.replace("_filled", "");
    });
    // Add active class to clicked link
    i.classList.add("active");
    i.children[0].src = i.children[0].src.split(".png")[0] + "_filled.png";
    
    // Close the mobile menu after clicking a link
    document.querySelector(".list-container").classList.remove("menu-active");
    document.querySelector(".more-button").classList.remove('active');
    document.querySelector(".more-button").style.transform = 'rotate(0deg)';
    
    // Add smooth scroll to section
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  })
);

$(document).ready(function () {
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight;
    var winHeight = window.innerHeight;
    var height = docHeight - winHeight;
    
    // Ensure we don't divide by zero
    if (height <= 0) {
      progressPath.style.strokeDashoffset = pathLength;
      return;
    }

    var percentage = scroll / height;
    // Cap at 1 to ensure it doesn't overfill, and use a small buffer for the bottom
    if (scroll + winHeight >= docHeight - 2) percentage = 1;
    
    var progress = pathLength - (percentage * pathLength);
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

let projects = Array.from(document.querySelectorAll("main section"));
document.querySelector(".count").textContent = projects.length;

projects.forEach((project, index) => {
  project.dataset.order = index;
});

const originalProjects = [...projects];

// Default sort: New to Old
projects.reverse();
projects.forEach((project) => project.parentNode.appendChild(project));


// Initialize Select2
$(document).ready(function() {
  // Add icons to badges
  document.querySelectorAll('.overlay__badge').forEach(badge => {
    const badgeText = badge.textContent.trim();
    let iconName = badgeText.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
    
    // Special case mappings for specific technologies
    const specialMappings = {
      'reactjs': 'react',
      'react.js': 'react',
      'nextjs': 'nextjs',
      'vuejs': 'vue',
      'nuxtjs': 'nuxt',
      'javascript': 'javascript',
      'jquery': 'jquery',
      'tailwind': 'tailwind',
      'bootstrap': 'bootstrap',
      'figma': 'figma',
      'mysql': 'mysql',
      'laravel': 'laravel',
      'vuex': 'vuex',
      'redux': 'redux',
      'html': 'html-5',
      'css': 'css',
      'material-ui': 'material-ui',
      'google-maps': 'google-maps',
      'api-integration': 'api'
    };
    
    // Check for special mappings
    if (specialMappings[iconName]) {
      iconName = specialMappings[iconName];
    }
    
    // Try different extensions
    const extensions = ['.png', '.svg', '.webp'];
    let imgElement = null;
    
    for (const ext of extensions) {
      const imgPath = `./img/${iconName}${ext}`;
      const tempImg = new Image();
      tempImg.src = imgPath;
      
      // Check if image exists
      tempImg.onload = function() {
        if (!imgElement) {
          imgElement = document.createElement('img');
          imgElement.src = imgPath;
          imgElement.alt = badgeText;
          imgElement.style.maxWidth = '24px';
          imgElement.style.maxHeight = '24px';
          imgElement.style.marginRight = '8px';
          imgElement.style.verticalAlign = 'middle';
          badge.prepend(imgElement);
        }
      };
    }
  });
  
  // Populate filter options with counts BEFORE initializing SlimSelect
  const badgeCounts = {};
  document.querySelectorAll('.project').forEach(project => {
    const badges = project.querySelectorAll('.overlay__badge');
    badges.forEach(badge => {
      const badgeText = badge.textContent.trim();
      badgeCounts[badgeText] = (badgeCounts[badgeText] || 0) + 1;
    });
  });

  const filterSelect = document.getElementById('project-filter');
  // Add the "All" option first
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.text = 'All';
  filterSelect.appendChild(allOption);
  
  // Add other options with counts
  Object.keys(badgeCounts).sort().forEach(badgeText => {
    const option = document.createElement('option');
    option.value = badgeText;
    option.text = `${badgeText} (${badgeCounts[badgeText]})`;
    filterSelect.appendChild(option);
  });

  // Initialize sort dropdown as SlimSelect (no search)
  const sortFilter = new SlimSelect({
    select: '#sort-filter',
    settings: {
      showSearch: false,
    }
  });

  // Sort change handler
  document.getElementById('sort-filter').addEventListener('change', function() {
    const selectedValue = this.value;
    projects = [...originalProjects];
    if (selectedValue === "1") {
      projects.reverse();
    }
    projects.forEach((project) => project.parentNode.appendChild(project));
  });

  // Initialize project filter dropdown as SlimSelect
  const projectFilter = new SlimSelect({
    select: '#project-filter',
    settings: {
      placeholder: 'Filter by technology',
      allowDeselect: true,
    }
  });

  // Filter logic
  document.getElementById('project-filter').addEventListener('change', function() {
    const selectedBadge = this.value;
    
    document.querySelectorAll('.project').forEach(function(project) {
      const projectBadges = Array.from(project.querySelectorAll('.overlay__badge')).map(b => b.textContent.trim());
      
      if (selectedBadge === 'all' || selectedBadge === '' || projectBadges.includes(selectedBadge)) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  });

  // Dark Mode Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
  });

});

