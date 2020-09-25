/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
function Node(){
    this.radius = 5;
    this.max_vel = 100;
    this.x = random(this.radius, canvasSize - this.radius);
    this.y = random(this.radius, canvasSize - this.radius);
    this.xp = random(-this.max_vel, this.max_vel);
    this.yp = random(-this.max_vel, this.max_vel);
    this.xpp = random(-5, 5);
    this.ypp = random(-5, 5);
    
    this.box_idx = [];

    this.susceptible = true;
    this.infected = false;
    this.cured = false;
    this.time_infected = 0;

    this.infect = function(){
        this.susceptible = false;
        this.infected = true;
        this.cured = false;
    }
    
    this.cure = function(){
        this.susceptible = false;
        this.infected = false;
        this.cured = true;
    }
    
    this.set_acc = function(x_acc, y_acc){
        this.xpp = x_acc;
        this.ypp = y_acc;
    }
    
    this.update = function(){
        this.x += this.xp*time_step + this.xpp*time_step*time_step/2;
        this.y += this.yp*time_step + this.ypp*time_step*time_step/2;
        
        this.xp += this.xpp*time_step;
        this.yp += this.ypp*time_step;
        this.checkConstraints();

        
        /*
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
        */
    }
    
    this.show = function(){
        
        if (this.susceptible){
            fill(100,150,255);  // Susceptible
        } else if(this.infected){
            fill(255,0,0);      // Infectious
            ellipse(this.x, this.y, infection_radius, infection_radius);
            fill(bkgrnd_clr)
            ellipse(this.x, this.y, infection_radius-10, infection_radius-10);
            fill(255,0,0);
        } else if (this.cured){
            fill(0,255,0);      // Recovered
        } else{
            fill(0)             // Something went wrong
        }
        
        ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
    }
    
    this.checkConstraints = function(){
        if (this.x <= 0 + this.radius || this.x >= width - this.radius){    // Wall collition
            this.xp = -this.xp
        }
        if (this.y <= 0 + this.radius || this.y >= height - this.radius){    // Wall collition
            this.yp = -this.yp
        }
        if (this.xp >= this.max_vel){
            this.xp = this.max_vel;
        }
        if (this.yp >= this.max_vel){
            this.yp = this.max_vel;
        }
        if (this.xp <= -this.max_vel){
            this.xp = -this.max_vel;
        }
        if (this.yp <= -this.max_vel){
            this.yp = -this.max_vel;
        }
    }

    this.updateTimeInfected = function(){
        if(this.infected){
            this.time_infected += time_step;
            // print(this.time_infected)
            if(this.time_infected >= time_to_heal){
                this.cure();
            }
        }
    }
}