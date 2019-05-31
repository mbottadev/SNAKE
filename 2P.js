window.onload = () => {
    
    let cadre=document.getElementById("cadre");
    let contexte=cadre.getContext("2d");
    let afficheWinner=document.getElementById("afficheWinner");
    let scoreP1 = document.getElementById("scoreP1");
    let scoreP2 = document.getElementById("scoreP2");
    let colorP1 = document.getElementById("colorP1");
    let colorP2 = document.getElementById("colorP2");
    document.addEventListener("keydown",keyPush);

    const cases = 30;
    let endGame = false;

    let pomme = {

        x:Math.floor(Math.random()*cases),
        y:Math.floor(Math.random()*cases),
        
        newApple: function(){
            contexte.fillStyle="red";
            contexte.fillRect(this.x*cases,this.y*cases,cases,cases);
            Object.keys(snakes).forEach((serpentId)=>{
                if(this.x==snakes[serpentId].x && this.y==snakes[serpentId].y) {
                    snakes[serpentId].queue++;
                    this.x=Math.floor(Math.random()*cases);
                    this.y=Math.floor(Math.random()*cases);
                }
            })
        }
    }

    class snake {
        constructor(id){
            this.x = Math.floor(Math.random()*cases);
            this.y = Math.floor(Math.random()*cases);
            this.deplHor = 0;
            this.deplVert = 0;
            this.tabSnake = [];
            this.queue = 1;
            this.skin = ['lime', 'blue', 'orange']
            this.color = this.skin[id]
        }
        move(){        
            this.x=this.x+this.deplHor;
            this.y=this.y+this.deplVert;
            
            if(this.x<0) {
                this.x= cases-1;
            }
            if(this.x>cases-1) {
                this.x= 0;
            }
            if(this.y<0) {
                this.y= cases-1;
            }
            if(this.y>cases-1) {
                this.y= 0;
            }
        }

        show(){
            contexte.fillStyle = this.color;
            for(var i=0;i<this.tabSnake.length;i++) {
                contexte.fillRect(this.tabSnake[i].x*cases,this.tabSnake[i].y*cases,cases-2,cases-2);
                if(this.tabSnake[i].x==this.x && this.tabSnake[i].y==this.y) {
                    this.queue = 1;
                }
            }
        }

        retainPos(){
            this.tabSnake.push({x:this.x,y:this.y});
            while(this.tabSnake.length>this.queue) {
                this.tabSnake.shift();
            }
        }

        turnLeft(){
            setTimeout(()=>{
                this.deplHor=-1;
                    this.deplVert=0;
                }, 1000/15)
        }

        turnRight(){
            setTimeout(()=>{
                this.deplHor=1;
                this.deplVert=0;
            }, 1000/15)
        }

        turnUp(){
            setTimeout(()=>{
                this.deplHor=0;
                this.deplVert=-1;
            }, 1000/15)
        }

        turnDown(){
            setTimeout(()=>{
                this.deplHor=0;
                this.deplVert=1;
            }, 1000/15)
        }

        direction(keyCode){
            if(this.deplHor == 0 && this.deplVert==0){
                switch(keyCode) {
                    case 'left':
                    this.turnLeft()
                    break;
                    case 'right':
                    this.turnRight()
                    break;
                    case 'up':
                    this.turnUp()
                    break;
                    case 'down':
                    this.turnDown()
                    break;
                }
            } else if (this.deplVert== -1 || this.deplVert== 1){
                switch(keyCode) {
                    case 'left':
                    this.turnLeft()
                    break;
                    case 'right':
                    this.turnRight()
                    break;
                }
            } else {
                switch(keyCode) {
                    case 'up':
                    this.turnUp()
                    break;
                    case 'down':
                    this.turnDown()
                    break;
                }
            }
        }

        checkCollision(snakes, ownId){
            Object.keys(snakes).forEach((serpentId)=>{
                if(serpentId !== ownId){
                    snakes[serpentId].tabSnake.forEach((tab)=>{
                        if(this.x === tab.x && this.y === tab.y){
                            this.queue = 1
                        }
                    })
                }
            })
        }

        // curve fever 

        cornerFever(){
            this.queue ++
        }
    }

    const snakes = {
        p1: new snake(0),
        p2: new snake(1),
    };

    setInterval(game,1000/10);
    
    
    function game() {
        if(endGame !== true){
            contexte.fillStyle="black";
            contexte.fillRect(0,0,cadre.width,cadre.height);
            Object.keys(snakes).forEach((serpentId)=>{
                snakes[serpentId].move()
                snakes[serpentId].show()
                snakes[serpentId].retainPos()
                // snakes[serpentId].cornerFever()
                // snakes[serpentId].checkCollision(snakes, serpentId)
                
                console.log(snakes[serpentId])

                if (snakes[serpentId].queue > 25){

                    afficheWinner.innerText = snakes[serpentId].color + " snake won";
                    afficheWinner.style.backgroundColor = "black";
                    afficheWinner.style.color = snakes[serpentId].color;
                    afficheWinner.style.fontSize = "200px";
                    afficheWinner.style.fontFamily = "'Raleway Dots', cursive";        
                    afficheWinner.style.fontFamily = "'Raleway Dots', cursive";                    
                    endGame = true
                }            
            })
            colorP1.innerText = snakes.p1.color;
            colorP2.innerText = snakes.p2.color;
            scoreP1.innerText = snakes.p1.queue-1;
            scoreP2.innerText = snakes.p2.queue-1;
            pomme.newApple()
        }
    }
        
    function keyPush(e) {
        let direction
        if(e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 37){
                switch(e.keyCode) {
                    case 38:
                    direction = 'up'
                break;
                case 40:
                    direction = 'down'
                break;
                case 39:
                    direction = 'right'
                break;
                case 37:
                    direction = 'left'
                break;
            }

            snakes.p1.direction(direction)
        }else if(e.keyCode === 90 || e.keyCode === 83 || e.keyCode === 68 || e.keyCode === 81){
            switch(e.keyCode) {
                case 90:
                    direction = 'up'
                break;
                case 83:
                    direction = 'down'
                break;
                case 68:
                    direction = 'right'
                break;
                case 81:
                    direction = 'left'
                break;
            }
            snakes.p2.direction(direction)
        }
    }    
}
