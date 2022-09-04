let slideIndex = 1
let canVibrate = window.navigator.vibrate

document.addEventListener("DOMContentLoaded", () => {
 start_app()
})

function start_app() {
 AllImagesLoaded()

 if (window.innerWidth < 550) {
  mobile_header_shrink()
  ActiveMobileSidebar()
 } else {
  ActiveHeaderNav()
 }
 Active_img_Gallery()
 ActiveServicesDescription()
}

function ActiveHeaderNav() {
 let allNavLinks = document.querySelectorAll(".nav-link")

 let allSections = document.querySelectorAll(".section-target")
 let mainSection = document.querySelector(".main-sections")
 let len = null

 function activeMenuScrollHighlight() {
  len = allSections.length
  while (--len && mainSection.scrollTop + 200 < allSections[len].offsetTop) {}
  allNavLinks.forEach(link => link.classList.remove("active"))
  allNavLinks[len].classList.add("active")
 }
 mainSection.addEventListener("scroll", activeMenuScrollHighlight)
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

function mobile_header_shrink() {
 let HorPos = null
 let logo = document.querySelector(".logo-mb-content")
 let main_header_container = document.querySelector(".main-header-container")
 var css_var = document.querySelector(":root")
 // shrink header
 document.querySelector(".main-sections").addEventListener("scroll", event => {
  HorPos = event.target.scrollTop
  if (window.innerWidth < 550) {
   if (HorPos >= 350) {
    main_header_container.style["height"] = "90px"
    logo.style["height"] = "65px"
    logo.children[0].style["width"] = "90px"
    logo.parentElement.style["padding-bottom"] = "0px"
    css_var.style.setProperty("--header-height", "90px")
   } else {
    main_header_container.style["height"] = ""
    logo.style["height"] = ""
    logo.children[0].style["width"] = ""
    logo.parentElement.style["padding-bottom"] = ""
    css_var.style.setProperty("--header-height", "")
   }
  }
 })
}

function ActiveMobileSidebar() {
 let allSections = document.querySelectorAll(".section-target")
 let mainSection = document.querySelector(".main-sections")
 let sidebar_menu_btn = document.querySelector(".menu-hamburger-content")
 let blank_content = document.querySelector(".blank-content")
 let sidebar_menu_container = document.querySelector(".sideBar-mb-container")
 let sideBar_closeBtn_content = document.querySelector(".sideBar-closeBtn-content")
 let sideBar_nav_link = document.querySelectorAll(".sideBar-nav-link")
 let social_btn_sticky_group_container = document.querySelector(".social-btn-sticky-group-container")
 let len = null
 //  --------------------
 sidebar_menu_btn.addEventListener("click", ev => {
  blank_content.classList.toggle("show")
  sidebar_menu_container.classList.toggle("show")
  social_btn_sticky_group_container.classList.toggle("sideBar_open")
  if (canVibrate) window.navigator.vibrate(5)
 })

 sideBar_closeBtn_content.addEventListener("click", () => {
  blank_content.classList.toggle("show")
  sidebar_menu_container.classList.toggle("show")
  social_btn_sticky_group_container.classList.toggle("sideBar_open")
 })

 sideBar_nav_link.forEach(element => {
  element.addEventListener("click", () => {
   blank_content.classList.toggle("show")
   sidebar_menu_container.classList.toggle("show")
   social_btn_sticky_group_container.classList.toggle("sideBar_open")
  })
 })

 function activeMenuScrollHighlight() {
  len = allSections.length
  while (--len && mainSection.scrollTop + 200 < allSections[len].offsetTop) {}
  sideBar_nav_link.forEach(link => {
   link.classList.remove("active")
  })
  sideBar_nav_link[len].classList.add("active")
 }
 mainSection.addEventListener("scroll", activeMenuScrollHighlight)
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
   }
   if (element.getAttribute("name") == "nailCare") {
    service_nailCare_desc.style["display"] = "flex"
   }
   if (element.getAttribute("name") == "bodyCare") {
    service_bodyCare_desc.style["display"] = "flex"
   }
   if (element.getAttribute("name") == "faceCare") {
    service_faceCare_desc.style["display"] = "flex"
   }
  })
 })
}

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
  ".landPage-mobile-bottom-section"
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


