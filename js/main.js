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
    var theme;
    
    function create()
    {
        background = game.add.image(0, 0, 'space');
        
        player = game.add.sprite(game.world.centerX, game.world.height - 45, 'mummy');
        
        theme = game.add.audio('core');
        theme.play()
    }
    
    function update()
    {
        
    }
};
