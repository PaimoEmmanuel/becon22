const backPage = document.querySelector(".back");
const uploadButton = document.querySelectorAll(".upload-button");
let translateValue = 0;
const uploadWrapper = document.querySelectorAll(".upload-wrapper");
const image = document.querySelectorAll(".user-image");

backPage.addEventListener("click", () => {
  if (translateValue < 0) {
    translateValue += 100;
    uploadWrapper.forEach((item) => {
      item.style.transform = `translate(${translateValue}%)`;
      item.style.position = 'relative';
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});
uploadButton.forEach((item, index) => {
  item.addEventListener("click", () => {
    console.log(index, uploadWrapper.length - 1);
     if (
      translateValue < uploadWrapper.length * 100 &&
      image[index].value
    ) {
      translateValue -= 100;
      uploadWrapper.forEach((item) => {
        item.style.transform = `translate(${translateValue}%)`;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if (index === uploadWrapper.length - 2) {
      // uploadWrapper[index].style.transform = "translate(0%)";
      uploadWrapper.forEach((item) => {
        item.style.position = `absolute`;
      });
      uploadWrapper[uploadWrapper.length-1].style.transition = "all 0s";
      uploadWrapper[uploadWrapper.length-1].style.position = 'relative'
      uploadWrapper[uploadWrapper.length-1].style.transform = "translate(0%)";
    }
  });
});

// Modal
const modalBtn = document.querySelector(".modal-btn");
const modalSection = document.querySelectorAll(".modal-section");
let index = 1;
let modalTransition = 0;
modalBtn.addEventListener("click", () => {
  if (index >= 3) {
    document.querySelector(".modal").style.display = "none";
  } else {
    modalTransition -= 100;
    modalSection.forEach((item) => {
      item.style.transform = `translate(${modalTransition}%)`;
    });
    document.querySelectorAll(".modal-indicator span")[
      index
    ].style.backgroundColor = "#a58543";
  }
  index++;
  if (index > 2) {
    modalBtn.innerHTML = "Yay! I’m ready";
  }
});

const modalBg = document.querySelector(".modal-bg");
modalBg.addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
});
// forwardPage.addEventListener("click", () => {
//   translateValue -= 100;
//   uploadWrapper.forEach((item) => {
//     item.style.transform = `translate(${translateValue}%)`;
//   });
//   document.body.scrollTop = document.documentElement.scrollTop = 0;
// });
