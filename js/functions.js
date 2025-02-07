"use strict";

// Function to get the current year
export const getCurrentYear = () => {
  const year = new Date().getFullYear();
  return year;
};

// Function to replace the inner html of an element
export const replaceInnerHtml = (el, val) => {
  el.innerHTML = val;
};

// Function to clone elements
export const cloneElement = (el, parent) => {
  el.forEach((el) => {
    const clone = el.cloneNode(true);
    parent.appendChild(clone);
  });
};

// Function to slide an element
export const slideElement = (el, speed = 0) => {
  let scrollAmount = speed;
  const animate = () => {
    scrollAmount += 0.5;
    if (scrollAmount >= el.scrollWidth / 2) {
      scrollAmount = 0;
    }
    el.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(animate);
  };
  animate();
};

// Function to populate Popup for portfolio images
export const populatePopup = (el, e) => {
  if (e.target.localName === "img") {
    el.style.height = "100vh";
    el.style.width = "100vw";
    el.style.opacity = 1;
    el.style.visibility = "visible";

    el.children[0].src = e.target.currentSrc;
    el.children[0].style.height = "90%";
    el.children[0].style.width = "90%";
  }
};

//Function to close Popup for portfolio images
export const closePopup = (el, e) => {
  if (
    e.target.localName === "button" ||
    e.target.localName === "use" ||
    e.target.localName === "svg"
  ) {
    el.style.height = "0";
    el.style.width = "0";
    el.style.opacity = 0;
    el.style.visibility = "hidden";
    el.children[0].src = "";
    el.children[0].style.height = 0;
    el.children[0].style.width = 0;
  }
};

//Function to toggle the faqs
export const toggleFaqs = (el) => {
  //icons to switch
  const plusIcon = "../../img/sprite.svg#circle-plus";
  const minusIcon = "../../img/sprite.svg#circle-minus";

  el.forEach((el) => {
    el.addEventListener("click", () => {
      //check for plus icon or minus
      let x =
        el.children[0].children[1].children[0].children[0].getAttribute(
          "xlink:href"
        );

      if (x === plusIcon) {
        el.children[0].children[1].children[0].children[0].setAttribute(
          "xlink:href",
          minusIcon
        );
      }
      if (x === minusIcon) {
        el.children[0].children[1].children[0].children[0].setAttribute(
          "xlink:href",
          plusIcon
        );
      }

      el.children[1].children[0].classList.toggle("open-question");
    });
  });
};

//Function to move the slider to the next slide
export const moveSlider = (
  direction,
  index,
  len,
  slider,
  percentageToMove = 1
) => {
  const width =
    window.getComputedStyle(slider).width.slice(0, -2) * 1 * percentageToMove;
  if (direction === "next") {
    if (index < len - 1) {
      index++;
      translateSlider(slider, width, index);
      return index;
    }
    if (index === len - 1) {
      index = 0;
      translateSlider(slider, width, index);
      return index;
    }
  } else if (direction === "back") {
    if (index > 0) {
      index--;
      translateSlider(slider, width, index);
      return index;
    }
    if (index === 0) {
      index = len - 1;
      translateSlider(slider, width, index);
      return index;
    }
  } else {
    return;
  }
};

//function to translate the slider
const translateSlider = (slider, width, index) => {
  const slidesArray = [...slider.children].filter(
    (child) => child.tagName === "DIV"
  );

  slidesArray.forEach((slide) => {
    slide.style.transform = `translateX(-${width * index}px)`;
  });
};

//Function to add a class to an element
export const addClass = (el, className) => {
  el.classList.add(className);
};

//Function to remove a class to an element
export const removeClass = (el, className) => {
  el.classList.remove(className);
};

//Function to toggle a class to an element
export const toggleClass = (el, className) => {
  el.classList.toggle(className);
};

//Function to highlight the active slider image
export const highlightActiveCard = (slider, position, percentageToMove = 1) => {
  const width =
    window.getComputedStyle(slider[0].parentElement).width.slice(0, -2) * 1;
  slider[position].style.transform = `translateX(-${
    width * position * percentageToMove
  }px) translateY(-2rem) scale(1.02)`;
};

//Function to switch the images in the service slider
export const checkActiveSliderImage = (slider, headline1, headline2) => {
  let activeSliderImage;

  slider.forEach((el) => {
    if (el.classList.contains("active")) {
      activeSliderImage = window
        .getComputedStyle(el)
        .backgroundImage.split("/")
        .at(-1)
        .split('"')[0];

      el.parentElement.parentElement.style.backgroundImage = `url(../../img/service/${activeSliderImage})`;
      headline1.textContent = el.children[1].textContent;
      headline2.textContent = el.children[0].textContent;
    }
  });
};

//Function to activate and scroll to the active slider
export const activateSlider = (slider, card) => {
  let p;
  if (!card.classList.contains("active")) {
    slider.forEach((el) => {
      el.classList.remove("active");
    });
    card.classList.add("active");
    //check to see the index of the card clicked
    p = Array.from(card.parentNode.children).indexOf(card);
  }
  return p;
};

//Observer function
export const observeSection = (target, func, inTime) => {
  let intervalId;
  // Define the callback function
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Element is in the viewport!");
        if (!intervalId) {
          intervalId = setInterval(func, inTime);
        }
      } else {
        // console.log("Element is out of the viewport!");
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null; // <span style="color: red;">// Reset the intervalId to null</span>
        }
      }
    });
  };

  // Define the options (optional)
  const options = {
    root: null, // Use the viewport as the container
    rootMargin: "0px", // No margin
    threshold: 1, // Trigger when 50% of the element is visible
  };

  //Create the IntersectionObserver
  const observer = new IntersectionObserver(callback, options);
  // Observe the target element
  observer.observe(target);
};

//Function to open social media links
export const openSocialMediaLinks = (social) => {
  social = social.children[0].children[0]
    .getAttribute("xlink:href")
    .split("#")[1]
    .split("-")[1];

  if (social === "facebook") {
    window.open("https://www.facebook.com", "_blank");
    return;
  }

  if (social === "instagram") {
    window.open("https://www.instagram.com/pixeleado_", "_blank");
    return;
  }

  if (social === "linkedin") {
    window.open("https://www.linkedin.com", "_blank");
    return;
  }
  if (social === "whatsapp") {
    window.open("https://wa.me/18295536280", "_blank");
    return;
  }
  if (social === "behance") {
    window.open("https://www.behance.com/hendyhernandez", "_blank");
    return;
  }
};

//Function to check if the menu is open to switch the menu icon

export const checkMenuStatus = (menu, btn) => {
  const menuIcon = "../../img/sprite.svg#bars-staggered";
  const closeIcon = "../../img/sprite.svg#close";

  if (menu.classList.contains("active")) {
    //if it is opened, switch the menu icon to a X
    btn.children[0].children[0].setAttribute("xlink:href", closeIcon);
    return;
  }

  if (!menu.classList.contains("active")) {
    //if it is opened, switch the menu icon to a X
    btn.children[0].children[0].setAttribute("xlink:href", menuIcon);
    return;
  }
};

//Function to switch languages

export const switchLanguage = (el) => {
  const lang = el.value;

  switch (lang) {
    case "en":
      window.location.href = "/lang/en";
      break;

    case "es":
      window.location.href = "/lang/es";
      break;

    default:
      break;
  }
};
