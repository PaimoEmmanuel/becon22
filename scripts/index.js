const sliderText = document.querySelectorAll(".heading-subtext span");
const heading = document.querySelector(".heading-subtext-wrapper");
let topValue = -0;
sliderText.forEach((text, index) => {
  setTimeout(function () {
    topValue -= 5;
    heading.style.top = `${topValue}rem`;
    // text.style.transform = "translateY(-2rem)";
    text.style.opacity = 0.2;
  }, index * 3000);
});

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

//Timer

var countDownDate = new Date("Aug 8, 2021 18:37:25").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  const timerEl = document.querySelectorAll(".countdown-big");
  timerEl[0].innerHTML = days;
  timerEl[1].innerHTML = hours;
  timerEl[3].innerHTML = minutes;
  timerEl[5].innerHTML = seconds;

  const timer = document.querySelectorAll(".timer");
  timer.forEach((timer) => {
    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  });
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    timerEl.forEach((timer) => {
      timer.innerHTML = "0";
    });
  }
}, 1000);
