let shapeClassifier
let canvas
let resultsDiv

function setup() {
  canvas = createCanvas(400, 400);
  const options = {
      inputs: [32, 32, 4],
      task: "imageClassification",
  }
  shapeClassifier  = ml5.neuralNetwork(options)
  const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin"
  }
  shapeClassifier.load(modelDetails, modelLoaded)
  background(255)
  resultDiv = createDiv("loading model...")
}

const classifyImage = () => {
  let input = createGraphics(32, 32)
  input.copy(canvas, 0,0,400,400,0,0,32,32)
  image(input, 0,0) 
  shapeClassifier.classify( { image: input }, gotResults )
}

const gotResults = (err, results) => {
  if(err) return console.log(err.message)
  let label = results[0].label
  let confidence = nf(100*results[0].confidence,2,2)
  let label1 = results[1].label
  let confidence1 = nf(100*results[1].confidence,2,2)
  resultDiv.html(`${label} ${confidence} <br> ${label1}, ${confidence1}`)
  classifyImage()
}

const modelLoaded = () => {
  console.log("model ready!")
  classifyImage()
}

function draw() {
  if(mouseIsPressed) {
    strokeWeight(4)
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}