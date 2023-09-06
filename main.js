function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    s = window.speechSynthesis;
}
function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}
function limpar() {
    background("white");
}
function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "avaliação:" + results[0].label;
    document.getElementById("confidence").innerHTML = "probabilidade:" + Math.round(results[0].confidence * 100) + "%";
    utter = new SpeechSynthesisUtterance(results[0].label);
    s.speak(utter);
}