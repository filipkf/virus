/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
var node;
var nodeArr = [];
infected_nodes = [];
susceptible_nodes = [];
cured_nodes = [];
var n_nodes = 500;
var time_step = 1 / 50;
var acc = 10;
var infection_radius = 50;
var bkgrnd_clr = 200;
var infection_threshold = 250 * time_step;
var time_to_heal = 5;
var canvasSize = 1300;

function setup() {
  // put setup code here
    createCanvas(canvasSize, canvasSize);
    frameRate(1 / time_step);
    
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

function checkInfection(){
    for (var i = 0; i < infected_nodes.length; i++){
        for (var j = 0; j < susceptible_nodes.length; j++){

            delta_x = nodeArr[infected_nodes[i]].x - nodeArr[susceptible_nodes[j]].x;
            delta_y = nodeArr[infected_nodes[i]].y - nodeArr[susceptible_nodes[j]].y;
            rad_dis = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
            
            if (rad_dis <= infection_radius){
                dice = random(0,1000);
                if (dice < infection_threshold){
                    nodeArr[susceptible_nodes[j]].infect();
                }
            }
        }
    }
}
