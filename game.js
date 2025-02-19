const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload, create, update }
};

let player, enemy, obstacles, platforms, coins, score = 0, scoreText;

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('obstacle', 'assets/obstacle.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    this.add.image(400, 200, 'background').setScale(1.5);
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 390, 'platform').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 300, 'player').setScale(0.5);
    player.setCollideWorldBounds(true);

    enemy = this.physics.add.sprite(400, 300, 'enemy').setScale(0.5);
    enemy.setVelocityX(50);

    obstacles = this.physics.add.group();
    this.time.addEvent({ delay: 2000, callback: spawnObstacle, callbackScope: this, loop: true });

    coins = this.physics.add.group();
    this.time.addEvent({ delay: 3000, callback: spawnCoin, callbackScope: this, loop: true });

    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#FFF' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, obstacles, hitObstacle, null, this);
    this.physics.add.overlap(player, coins, collectCoin, null, this);

    this.input.on('pointerdown', function (pointer) {
        if (pointer.y < 200 && player.body.touching.down) {
            player.setVelocityY(-300);
        } else if (pointer.y >= 200) {
            player.setScale(0.5, 0.3);
            setTimeout(() => player.setScale(0.5, 0.5), 500);
        }
    });
}

function update() {
    if (enemy.x > 600) {
        enemy.x = 400;
    }
}

function spawnObstacle() {
    let obstacle = obstacles.create(800, 350, 'obstacle').setScale(0.5);
    obstacle.setVelocityX(-200);
}

function spawnCoin() {
    let coin = coins.create(800, Phaser.Math.Between(200, 300), 'coin').setScale(0.5);
    coin.setVelocityX(-150);
}

function collectCoin(player, coin) {
    coin.destroy();
    score += 10;
    scoreText.setText('Score: ' + score);
}

function hitObstacle() {
    this.physics.pause();
    player.setTint(0xff0000);
    scoreText.setText('Game Over!');
}

new Phaser.Game(config);
