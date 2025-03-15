let sliderInner = document.querySelector(".slider-inner");
let images = document.querySelectorAll(".slider-inner img");
let index = 0;

function nextSlide() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    let percentage = index * -100;
    sliderInner.style.transform = `translateX(${percentage}%)`;
}

setInterval(nextSlide, 3000); 