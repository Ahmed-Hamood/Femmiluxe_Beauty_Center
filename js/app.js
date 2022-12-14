let slideIndex = 1
let canVibrate = window.navigator.vibrate
let mainSection = null
let allSections = null
let headerHeight = null
let isMenuHeaderShrink = false
let iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)

document.addEventListener("DOMContentLoaded", () => {
 mainSection = document.querySelector(".main-sections")
 allSections = document.querySelectorAll(".section-title")
 headerHeight = document.querySelector(".main-header-container").clientHeight
 start_app()
})

function start_app() {
 AllImagesLoaded()
 if (window.innerWidth < 900) {
  ActiveMobileFooter()
 }
 //  -------------
 if (window.innerWidth < 550) {
  mobile_header_shrink()
  ActiveMobileSidebar()
 } else {
  ActiveHeaderNav()
 }
 // -------------
 Active_img_Gallery()
 ActiveServicesDescription()
}

function ActiveHeaderNav() {
 let len = null
 let allNavLinks = document.querySelectorAll(".nav-link")

 mainSection.addEventListener("scroll", () => {
  len = allSections.length
  while (--len && mainSection.scrollTop + headerHeight < allSections[len].offsetTop) {}
  allNavLinks.forEach(link => link.classList.remove("active"))
  allNavLinks[len].classList.add("active")
 })

 // enable navbar link scroll to section position
 allNavLinks.forEach((element, index) => {
  element.addEventListener("click", () => {
   mainSection.scrollTo(0, allSections[index].offsetTop - headerHeight)
  })
 })

 // View service scroll to its section
 document.querySelector(".view-services-btn").addEventListener("click", e => {
  mainSection.scrollTo(0, allSections[2].offsetTop - headerHeight)
 })
}

function Active_img_Gallery() {
 let prev_btn = document.querySelector(".prev")
 let next_btn = document.querySelector(".next")
 let viewImage = document.getElementsByClassName("view-img")
 let all_thumbnail_images = document.querySelectorAll(".thumbnail-img")
 let thumbnail_img_content = document.querySelector(".thumbnail-images-content")

 if (window.innerWidth > 1000) {
  prev_btn.addEventListener("click", () => {
   showSlides((slideIndex += -1))
   thumbnail_img_content.scrollLeft -= 120
  })

  next_btn.addEventListener("click", () => {
   showSlides((slideIndex += 1))
   thumbnail_img_content.scrollLeft += 120
  })
 }

 all_thumbnail_images.forEach(element => {
  element.addEventListener("click", ev => {
   showSlides((slideIndex = parseInt(ev.target.getAttribute("index_no"))))
  })
 })

 document.querySelector(".thumbnail-next").addEventListener("mouseup", () => {
  thumbnail_img_content.scrollLeft += 600
 })
 document.querySelector(".thumbnail-prev").addEventListener("mouseup", () => {
  thumbnail_img_content.scrollLeft -= 600
 })

 showSlides((slideIndex = 1))

 function showSlides() {
  let i

  if (slideIndex > viewImage.length) {
   slideIndex = viewImage.length
  }

  if (slideIndex < 1) {
   slideIndex = 1
  }

  for (i = 0; i < viewImage.length; i++) {
   viewImage[i].classList.remove("show-img")
  }

  for (i = 0; i < all_thumbnail_images.length; i++) {
   all_thumbnail_images[i].className = all_thumbnail_images[i].className.replace(" active", "")
  }

  viewImage[slideIndex - 1].classList.add("show-img")
  all_thumbnail_images[slideIndex - 1].className += " active"
 }
}

function ActiveServicesDescription() {
 let all_service_type_link = document.querySelectorAll(".service-type-link")
 let service_hairCare_desc = document.querySelector(".hairCare")
 let service_nailCare_desc = document.querySelector(".nailCare")
 let service_bodyCare_desc = document.querySelector(".bodyCare")
 let service_faceCare_desc = document.querySelector(".faceCare")

 all_service_type_link.forEach(element => {
  element.addEventListener("click", el1 => {
   all_service_type_link.forEach(el2 => el2.classList.remove("active"))

   el1.target.classList.add("active")

   service_hairCare_desc.style["display"] = "none"
   service_nailCare_desc.style["display"] = "none"
   service_bodyCare_desc.style["display"] = "none"
   service_faceCare_desc.style["display"] = "none"

   if (element.getAttribute("name") == "hairCare") {
    service_hairCare_desc.style["display"] = "flex"
    mainSection.scrollTo(0, service_hairCare_desc.offsetTop - headerHeight)
   }
   if (element.getAttribute("name") == "nailCare") {
    service_nailCare_desc.style["display"] = "flex"
    mainSection.scrollTo(0, service_nailCare_desc.offsetTop - headerHeight)
   }
   if (element.getAttribute("name") == "bodyCare") {
    service_bodyCare_desc.style["display"] = "flex"
    mainSection.scrollTo(0, service_bodyCare_desc.offsetTop - headerHeight)
   }
   if (element.getAttribute("name") == "faceCare") {
    service_faceCare_desc.style["display"] = "flex"
    mainSection.scrollTo(0, service_faceCare_desc.offsetTop - headerHeight)
   }
  })
 })
}

// mobile

function mobile_header_shrink() {
 let HorPos = null
 let logo = document.querySelector(".logo-mb-content")
 let main_header_container = document.querySelector(".main-header-container")
 let css_var = document.querySelector(":root")

 mainSection.addEventListener(
  "scroll",
  event => {
   HorPos = event.target.scrollTop
   if (window.innerWidth < 550) {
    if (HorPos >= 330) {
     isMenuHeaderShrink = true
     main_header_container.style["height"] = "90px"
     logo.style["height"] = "65px"
     logo.children[0].style["width"] = "90px"
     logo.parentElement.style["padding-bottom"] = "0px"
     css_var.style.setProperty("--header-height", "90px")
    } else {
     isMenuHeaderShrink = false
     main_header_container.style["height"] = ""
     logo.style["height"] = ""
     logo.children[0].style["width"] = ""
     logo.parentElement.style["padding-bottom"] = ""
     css_var.style.setProperty("--header-height", "")
    }
   }
  },
  { passive: true }
 )

 // shrink header
}

function ActiveMobileSidebar() {
 let len = null
 let sidebar_menu_btn = document.querySelector(".menu-hamburger-content")
 let blank_content = document.querySelector(".blank-content")
 let sidebar_menu_container = document.querySelector(".sideBar-mb-container")
 let sideBar_closeBtn_content = document.querySelector(".sideBar-closeBtn-content")
 let sideBar_nav_links = document.querySelectorAll(".sideBar-nav-link")
 let social_btn_sticky_group_container = document.querySelector(".social-btn-sticky-group-container")
 let main_sections = document.querySelector(".main-sections")
 //  --------------------
 sidebar_menu_btn.addEventListener("click", ev => {
  blank_content.classList.toggle("show")
  sidebar_menu_container.classList.toggle("show")
  social_btn_sticky_group_container.classList.toggle("sideBar_open")
  if (canVibrate) window.navigator.vibrate(5)
 })

 // enable sidebar link scroll to section position
 sideBar_nav_links.forEach((element, index) => {
  if (index == 4) index = 3
  element.addEventListener("click", () => {
   headerHeight = document.querySelector(".main-header-container").clientHeight
   if (iOS && !isMenuHeaderShrink) {
    main_sections.style["scroll-behavior"] = "auto"
    setTimeout(() => (main_sections.style["scroll-behavior"] = ""), 1000)
   }
   mainSection.scrollTo(0, allSections[index].offsetTop - headerHeight)
  })
 })

 // View service scroll to its section
 document.querySelector(".view-services-btn").addEventListener("click", e => {
  headerHeight = document.querySelector(".main-header-container").clientHeight
  if (iOS && !isMenuHeaderShrink) {
   main_sections.style["scroll-behavior"] = "auto"
   setTimeout(() => (main_sections.style["scroll-behavior"] = ""), 1000)
  }
  mainSection.scrollTo(0, allSections[2].offsetTop - headerHeight)
 })

 sideBar_closeBtn_content.addEventListener("click", () => {
  blank_content.classList.toggle("show")
  sidebar_menu_container.classList.toggle("show")
  social_btn_sticky_group_container.classList.toggle("sideBar_open")
 })

 sideBar_nav_links.forEach(element => {
  element.addEventListener("click", () => {
   blank_content.classList.toggle("show")
   sidebar_menu_container.classList.toggle("show")
   social_btn_sticky_group_container.classList.toggle("sideBar_open")
  })
 })

 mainSection.addEventListener("scroll", () => {
  len = allSections.length
  while (--len && mainSection.scrollTop + headerHeight < allSections[len].offsetTop) {}
  sideBar_nav_links.forEach(link => link.classList.remove("active"), { passive: true })
  sideBar_nav_links[len].classList.add("active")
  if (len == 3) sideBar_nav_links[4].classList.add("active")
 })
}

function ActiveMobileFooter() {
 let footer_mb_nav_link = document.querySelectorAll(".footer-mb-nav-link")

 // enable footer link scroll to section position
 footer_mb_nav_link.forEach((element, index) => {
  element.addEventListener("click", () => {
   if (index == 4) index = 3
   headerHeight = document.querySelector(".main-header-container").clientHeight
   mainSection.scrollTo(0, allSections[index].offsetTop - headerHeight)
  })
 })
}

// ------

function AllImagesLoaded() {
 let allElement = document.querySelectorAll("#loadWait")
 let allOtherElements = document.querySelectorAll([
  ".logo-content",
  ".social-btn-sticky-group-container",
  ".logo-mb-content",
  ".view-services-btn",
  ".book-now-btn",
  ".landPage-left-inner-content",
  ".landPage-right-section-content",
  ".landPage-mobile-bottom-section",
 ])

 Promise.all(
  Array.from(allElement)
   .filter(img => !img.complete)
   .map(
    img =>
     new Promise(resolve => {
      img.onload = img.onerror = resolve
     })
   )
 ).then(eee => {
  console.log("all images loaded...")

  allOtherElements.forEach(element => {
   element.classList.add("run-animation")
  })

  allElement.forEach(element => {
   element.classList.add("run-animation")
  })
 })
}
