window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
    
    function preload()
    {   
        game.load.image('space', 'assets/pics/space.png');
        game.load.image('ground', 'assets/pics/ground.png');
        
        game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        
        game.load.audio('core', 'assets/audio/core.mp3');
    }
    
    var player;
    var background;
    var surface;
    var theme;
    var controls;
    
    function create()
    {
        //
        game.world.resize(6000, 600);
        
        // Enable Arcade Physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set game background
        background = game.add.image(0, 0, 'space');
        
        // Creates the surface
        surface = game.add.group();
        surface.enableBody = true;
        
        var floor = surface.create(0, game.world.height - 64, 'ground');
        floor.body.immovable = true;
        
        // Creates the player
        player = game.add.sprite(0, game.world.height - 106, 'mummy');
        player.fixedToCamer = true;
        
        // Player's Physics
        game.physics.arcade.enable(player);
        player.body.gravity.y = 250;
        player.body.colliderWorldBounds = true;
        
        // Player's Movements
        player.animations.add('left', [4, 3, 2, 1, 18, 17, 16]);
        player.animations.add('right');
        
        // Keyboard controls
        controls = game.input.keyboard.createCursorKeys();
        
        // Sets up music
        theme = game.add.audio('core');
        theme.play();
    }
    
    function movements()
    {
        player.body.velocity.x = 0;
        
        // Horizontal Movements
        if (controls.left.isDown)
        {
            player.body.velocity.x = -150;
            
            player.animations.play('left', 30, true);
            
            game.camera.x -= 4;
        }
        else if (controls.right.isDown)
        {
            player.body.velocity.x = 150;
            
            player.animations.play('right', 30, true);
            
            game.camera.x +- 4;
        }
        else
        {
            player.animations.stop();
            
            player.frame = 5;
        }
        
        // Vertical Movements
        if (controls.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -150;
        }
    }
    
    function update()
    {
        game.physics.arcade.collide(player, surface);
        
        movements();
    }
};
