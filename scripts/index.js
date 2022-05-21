// const sliderText = document.querySelectorAll(".heading-subtext span");
// const heading = document.querySelector(".heading-subtext-wrapper");
// let topValue = -0;
// sliderText.forEach((text, index) => {
//   if (index !== sliderText.length - 1) {
//     setTimeout(function () {
//       if (window.innerWidth < 600) {
//         topValue -= 3.25;
//         console.log(window.innerWidth);
//       } else if (600 < window.innerWidth && window.innerWidth < 1200) {
//         topValue -= 4.05;
//         console.log(window.innerWidth);
//       } else if (window.innerWidth > 1200) {
//         topValue -= 5.2;
//         console.log(window.innerWidth);
//       }
//       heading.style.top = `${topValue}rem`;
//       text.style.opacity = 0;
//       sliderText[index + 1].style.opacity = 1;
//     }, index * 2000);
//   }
// });

// Typing effect
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  // css.type = "text/css";
  css.innerHTML = ".wrap { border-right: 0.08em solid #c08b1d}";
  document.body.appendChild(css);
};

// Show old content
const learnMoreButton = document.querySelector(".learn-more");
const oldContent = document.querySelector(".old-content");
learnMoreButton.addEventListener("click", () => {
  oldContent.style.height = "100%";
  oldContent.style.overflow = "visible";
  oldContent.scrollIntoView();
});

// FAQs
const faqButtons = document.querySelectorAll(".faq-button");
const faqContents = document.querySelectorAll(".faq-content");

// According button state
let faqButtonsState = [];
faqButtons.forEach(() => {
  faqButtonsState = [...faqButtonsState, false];
});

//Action
faqButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (faqButtonsState[index] === false) {
      faqContents[index].style.height = "auto";
      button.style.backgroundColor = "#C08B1D";
      faqContents[index].style.paddingTop = "1.25rem";
      faqContents[index].style.paddingBottom = "1.25rem";
      faqButtonsState[index] = !faqButtonsState[index];
      //     padding: 1.25rem 3.4375rem 1.25rem 5.9375rem;
    } else {
      faqContents[index].style.height = "0";
      faqContents[index].style.paddingTop = "0";
      faqContents[index].style.paddingBottom = "0";
      faqButtonsState[index] = !faqButtonsState[index];
      button.style.backgroundColor = "#f4f4f4";
    }
  });
});

//Video
const vids = document.querySelectorAll(".video-img");
const vidTexts = document.querySelectorAll(".video-secondary");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
window.addEventListener("scroll", () => {
  if (isInViewport(vidTexts[0])) {
    vids[0].style.display = "block";
    vids[1].style.display = "none";
    vids[2].style.display = "none";
  }
  if (isInViewport(vidTexts[1])) {
    vids[1].style.display = "block";
    vids[0].style.display = "none";
    vids[2].style.display = "none";
  }
  if (isInViewport(vidTexts[2])) {
    vids[2].style.display = "block";
    vids[0].style.display = "none";
    vids[1].style.display = "none";
  }
});

// Display Video
const videos = document.querySelectorAll(".iframe");
const videoBg = document.querySelectorAll(".iframe-inner");
const iframes = document.querySelectorAll(".iframe-vid");

vids.forEach((vid, index) => {
  vid.addEventListener("click", () => {
    if (videos[index].classList.contains("hidden")) {
      videos[index].className = "iframe";
    } else {
      videos[index].className = "iframe hidden";
      if (iframes != null) {
        for (var i = 0; i < iframes.length; i++) {
          iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
        }
      }
    }
  });
});

//Timer

var countDownDate = new Date("Aug 7, 2022 17:30:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timerEl = document.querySelectorAll(".countdown p span");
  timerEl[0].innerHTML = days;
  timerEl[1].innerHTML = hours;
  timerEl[2].innerHTML = minutes;
  timerEl[3].innerHTML = seconds;

  const timer = document.querySelectorAll(".timer");
  timer.forEach((timer) => {
    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  });
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    timerEl.forEach((timer, index) => {
      if (index !== 2 && index !== 4) {
        timer.innerHTML = "0";
      }
    });
    timer.forEach((timer) => {
      timer.innerHTML = "0d 0h 0m 0s";
    });
  }
}, 1000);
