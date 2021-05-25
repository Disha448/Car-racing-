class Game{
    constructor(){

    }

    play(){
        form.hide()
        textSize(30)
        text("Game Start",120,100)
        Player.getPlayerinfo()
            if(allPlayers!=undefined){
                var display_position = 130
                var x = 0 , y= 0, index =0
                for(var plr in allPlayers){
                    index = index+1 
                    x = x+200
                    y = displayHeight - allPlayers[plr].distance
                    cars[index -1].x = x
                    cars[index -1].y = y
                
                    if(index == player.index){
                       cars[index -1].shapeColor = "red"
                       camera.position.x = displayWidth/2
                       camera.position.y = cars[index-1].y
                    }
                    else{
                        fill("black")
                    }
                    display_position = display_position+20
                    text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position)
                }
            }  
            if(keyIsDown(UP_ARROW) && player.index!=null){
                player.distance = player.distance + 50
                player.update()
            } 
            drawSprites()
}
    
    

    getState(){
        var gameStateref = database.ref('gameState')
      gameStateref.on("value",function(data){
          gameState = data.val()
      })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState == 0){
            player = new Player()
            var playercountref1 = await database.ref('playercount').once("value")
            if(playercountref1.exists()){
                playercount = playercountref1.val()
                player.getCount()
            }
           

            form = new Form()
            form.display()
        }
        car1 = createSprite(100,200)
        car2 = createSprite(300,200)
        car3 = createSprite(500,200)
        car4 = createSprite(700,200)
        cars = [car1,car2,car3,car4]
    }
}