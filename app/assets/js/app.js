var slider = document.querySelector("#myrange");
var output = document.getElementById("demo");
output.innerText = slider.value;

slider.addEventListener('change', function(evt) {
    output.innerHTML = this.value;
});
var stepCounter = 1;

var prevBtn = document.querySelector('.calculator .prev-btn');
var nextBtn = document.querySelector('.calculator .next-btn');

prevBtn.addEventListener('click', function(evt){
    if (stepCounter > 1) {
    stepCounter --;
    var stepElm = document.querySelector('step-'.concat(stepCounter ++));
    }
})

nextBtn.addEventListener('click', function(evt){
    if (stepCounter < 8) {
        stepCounter ++;
        var stepElm = document.querySelector('step-'.concat(stepCounter ++))
    }
})
alert('hi!');
