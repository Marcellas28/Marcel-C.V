document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor - only initialize on non-touch devices
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })

    document.addEventListener("mousedown", () => {
      cursor.style.width = "8px"
      cursor.style.height = "8px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
    })

    // Add hover effect to links and buttons
    const links = document.querySelectorAll("a, button, .filter-btn, .social-link")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "0px"
        cursor.style.height = "0px"
        cursorFollower.style.width = "50px"
        cursorFollower.style.height = "50px"
        cursorFollower.style.borderColor = "var(--primary-color)"
        cursorFollower.style.backgroundColor = "rgba(139, 0, 0, 0.1)"
      })

      link.addEventListener("mouseleave", () => {
        cursor.style.width = "10px"
        cursor.style.height = "10px"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
        cursorFollower.style.borderColor = "var(--primary-color)"
        cursorFollower.style.backgroundColor = "transparent"
      })
    })
  } else {
    // Hide cursor elements on touch devices
    if (cursor && cursorFollower) {
      cursor.style.display = "none"
      cursorFollower.style.display = "none"
    }
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const hamburger = document.querySelector(".hamburger")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Dark Mode Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      localStorage.setItem("theme", "light")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  })

  // Update typing effect with new professions
  const typedTextSpan = document.querySelector(".typed-text")
  const cursorSpan = document.querySelector(".cursor")

  const textArray = [
    "Web Developer",
    "Student @Co-op Uni Kenya",
     "SRHR Advocate",
  ]
  const typingDelay = 100
  const erasingDelay = 50
  const newTextDelay = 2000
  let textArrayIndex = 0
  let charIndex = 0

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
      charIndex++
      setTimeout(type, typingDelay)
    } else {
      cursorSpan.classList.remove("typing")
      setTimeout(erase, newTextDelay)
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
      charIndex--
      setTimeout(erase, erasingDelay)
    } else {
      cursorSpan.classList.remove("typing")
      textArrayIndex = (textArrayIndex + 1) % textArray.length
      setTimeout(type, typingDelay + 1100)
    }
  }

  if (textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250)

  // Active Navigation Link
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavLink() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const indicators = document.querySelectorAll(".indicator")
  let currentSlide = 0

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    testimonialSlides[index].classList.add("active")
    indicators[index].classList.add("active")
    currentSlide = index
  }

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    showSlide(currentSlide)
  })

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  })

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Auto-advance testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    showSlide(currentSlide)
  }, 5000)

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (barPosition < screenPosition) {
        const width = bar.style.width
        bar.style.width = width
      }
    })
  }

  // Counter animation
  const counters = document.querySelectorAll(".counter")

  function animateCounters() {
    counters.forEach((counter) => {
      const counterPosition = counter.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (counterPosition < screenPosition) {
        const target = Number.parseInt(counter.textContent)
        let count = 0
        const increment = Math.ceil(target / 50)

        const updateCount = () => {
          if (count < target) {
            count += increment
            if (count > target) count = target
            counter.textContent = count
            setTimeout(updateCount, 30)
          }
        }

        updateCount()
      }
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

      setTimeout(() => {
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
        submitBtn.disabled = false
        submitBtn.innerHTML = originalText
      }, 2000)
    })
  }

  // Download CV Button
  const downloadBtn = document.getElementById("download-cv")

  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault()
      alert("CV download functionality would be implemented here.")
    })
  }

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // AOS-like scroll animations
  const animatedElements = document.querySelectorAll("[data-aos]")

  function checkScroll() {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight * 0.85

      if (elementPosition < screenPosition) {
        element.classList.add("aos-animate")
      }
    })
  }

  // Add the animation class
  animatedElements.forEach((element) => {
    const delay = element.getAttribute("data-aos-delay") || 0
    element.style.transitionDelay = `${delay}ms`
    element.classList.add("aos-init")
  })

  const passiveSupported = () => {
    let passive = false
    try {
      const options = {
        get passive() {
          passive = true
          return false
        },
      }
      window.addEventListener("test", null, options)
      window.removeEventListener("test", null, options)
    } catch (err) {
      passive = false
    }
    return passive
  }

  const passiveOption = passiveSupported() ? { passive: true } : false

  window.addEventListener(
    "scroll",
    () => {
      checkScroll()
      highlightNavLink()
      animateSkillBars()
      animateCounters()
    },
    passiveOption,
  )

  // Add touch support for mobile devices
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device")

    // Improve touch experience for project cards
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      card.addEventListener(
        "touchstart",
        function () {
          this.classList.add("touch-focus")
        },
        passiveOption,
      )

      card.addEventListener(
        "touchend",
        function () {
          setTimeout(() => {
            this.classList.remove("touch-focus")
          }, 300)
        },
        passiveOption,
      )
    })
  }

  // Initial call to set up the page
  highlightNavLink()
  checkScroll()
  animateSkillBars()
  animateCounters()

  // Start typing animation
  if (typedTextSpan) {
    setTimeout(type, 1000)
  }
})
