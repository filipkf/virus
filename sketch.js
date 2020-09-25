/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
var node;
var nodeArr = [];
infected_nodes = [];
susceptible_nodes = [];
cured_nodes = [];
var n_nodes = 3;
var frame_rate = 1; // [hz]
var time_step = 1 / frame_rate; 
var acc = 10;
var infection_radius = 40;
var bkgrnd_clr = 200;
var infection_threshold = 0; // [%/time_step]

var time_to_heal = 10;
var canvasSize = 1000;

var boxes = [[[]]];

var n_boxes = canvasSize / infection_radius;
function setup() {
  // put setup code here
    createCanvas(canvasSize, canvasSize);
    frameRate(frame_rate);
    
    for (var i = 0; i < n_nodes; i++){
        if (i == 0){
            nodeArr[i] = new Node();
            nodeArr[i].infect();
            infected_nodes[i] = i;
        }
        else{
            nodeArr[i] = new Node();
        }
    }

}

function draw() {
  // put drawing code here
    background(bkgrnd_clr);
    drawlines();
    putNodesInBox();
    Infected_nodes = [];
    Susceptible_nodes = [];
    Cured_nodes = [];
    for (i = 0; i < n_nodes; i++){
        //nodeArr[i].set_acc(random(-acc, acc), random(-acc, acc));
        nodeArr[i].update();
        nodeArr[i].show();
        if (nodeArr[i].infected){
            Infected_nodes.push(i);
        }
        if (nodeArr[i].susceptible){
            Susceptible_nodes.push(i);
        }
        if (nodeArr[i].cured){
            Cured_nodes.push(i);
        }
    }
    infected_nodes = Infected_nodes;
    susceptible_nodes = Susceptible_nodes;
    cured_nodes = Cured_nodes;

    checkInfection();

}

function putNodesInBox(){
    boxes = {};
    for(var i = 0; i < nodeArr.length; i++) {
        x_idx = Math.floor(nodeArr[i].x/infection_radius);
        y_idx = Math.floor(nodeArr[i].y/infection_radius);
        console.log("indexes "+ x_idx + "-" + y_idx)
        nodeArr[i].box_idx = [x_idx, y_idx];
        console.log(nodeArr[i].box_idx);
        var dictKey = x_idx + "-" + y_idx;
        console.log(nodeArr[i])
        console.log(nodeArr[i].box_idx);
        console.log(dictKey)
        if(dictKey in boxes){
            console.log("adding to existing key")
            boxes[dictKey] = boxes[dictKey].push(i)
        }
        else{
            console.log("new key")
            boxes[dictKey] = [i]
        }
    }
    console.log("boxes")
    console.log(boxes)
    
}

function drawlines(){
    for (var x = 0; x < canvasSize; x+=infection_radius){
        line(x, 0, x, canvasSize);
    }
    for(var y = 0; y < canvasSize; y +=infection_radius){
        line(0, y, canvasSize, y);
    }
}

function checkInfection(){
    for (var i = 0; i < infected_nodes.length; i++){
        nodeArr[infected_nodes[i]].updateTimeInfected();
        for (var j = 0; j < susceptible_nodes.length; j++){

            delta_x = nodeArr[infected_nodes[i]].x - nodeArr[susceptible_nodes[j]].x;
            delta_y = nodeArr[infected_nodes[i]].y - nodeArr[susceptible_nodes[j]].y;
            rad_dis = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
            
            if (rad_dis <= infection_radius){
                dice = random(0, 100);
                if (dice < infection_threshold){
                    nodeArr[susceptible_nodes[j]].infect();
                }
            }
        }
    }
}


