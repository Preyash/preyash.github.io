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
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
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

const dropdown = document.querySelector(".dropdown");
const input = document.querySelector("input");
const listOfOptions = document.querySelectorAll(".option");
const body = document.body;
let projects = Array.from(document.querySelectorAll("main section"));
document.querySelector(".count").textContent = projects.length;

projects.forEach((project, index) => {
  project.dataset.order = index;
});

const originalProjects = [...projects];

if (listOfOptions.length > 0) {
  input.value = listOfOptions[0].textContent;
  projects.reverse();
  projects.forEach((project) => project.parentNode.appendChild(project));
}

const toggleDropdown = (event) => {
  event.stopPropagation();
  dropdown.classList.toggle("opened");
};


// Initialize Select2
$(document).ready(function() {
  $('#project-filter').select2({
    placeholder: "Filter by technology",
    allowClear: true
  });

  // Populate filter options
  const uniqueBadges = new Set();
  document.querySelectorAll('.overlay__badge').forEach(badge => {
    uniqueBadges.add(badge.textContent.trim());
  });

  const filterSelect = $('#project-filter');
  uniqueBadges.forEach(badgeText => {
    filterSelect.append(new Option(badgeText, badgeText));
  });

  // Filter logic
  $('#project-filter').on('change', function() {
    const selectedBadge = $(this).val();
    
    $('.project').each(function() {
      const projectBadges = $(this).find('.overlay__badge').map(function() { return $(this).text().trim(); }).get();
      
      if (selectedBadge === 'all' || projectBadges.includes(selectedBadge)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});

const selectOption = (event) => {
  input.value = event.currentTarget.textContent;

  projects = [...originalProjects];

  if (event.currentTarget.dataset.index === "1") {
    projects.reverse();
    projects.forEach((project) => project.parentNode.appendChild(project));
  } else {
    projects.forEach((project) => project.parentNode.appendChild(project));
  }
};

const closeDropdownFromOutside = () => {
  if (dropdown.classList.contains("opened")) {
    dropdown.classList.remove("opened");
  }
};

body.addEventListener("click", closeDropdownFromOutside);

listOfOptions.forEach((option) => {
  option.addEventListener("click", selectOption);
});

dropdown.addEventListener("click", toggleDropdown);
