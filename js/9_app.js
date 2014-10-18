$(function() {
  var pMopde = (~'localhost'.indexOf(document.URL));

  if (!console || pMopde) {
    console = {
      log: function(str) {
        // do nothing
      }
    } 
  }

  /**
    * App config
    */
  var ismobile = (WURFL) ? WURFL.is_mobile : true;
  var WIDTH = 960 || window.innerWidth;
  var HEIGHT = window.innerHeight;
  var FPS = 20;
  var MSPF = 1000 / FPS;
  var TPS = 25;
  var MSPT = 1000 / TPS;

  var frames = 0; // rendered frame count
  var speed = 1; // wobble speed
  var running = true; // paints genie lamp if true

  var GeniePlace = {
    x: 70,
    y: 200
  }

  var utils = {
    isCanvasSupported: function() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    },
    movePolygon: function(vertices, x, y) {
      if (vertices.length < 2)
        return;

      for (var i = 0; i < vertices.length; i+=2) {
        vertices[i] += x;
        vertices[i+1] += y;
      }
    },
    drawPolygon: function(graphics, vertices) {
      if (vertices.length < 2)
        return;
      var g = graphics;

      var counter = 0;
      g.moveTo(vertices[counter++], vertices[counter++]);

      while (counter < vertices.length - 1) {
        g.lineTo(vertices[counter++], vertices[counter++]);
      }

      g.endFill();
    },
    distance: function(point1, point2) {
      var x = point2.x - point1.x;
      var y = point2.y - point1.y;
      return Math.sqrt( x*x + y*y );
    },
    randomFlip: function(val) {
      val = Math.abs(val);
      return ((Math.random() * (val * 2)) - val);
    }
  };

  // initalizes lamp rotation container
  $('#lamp').rotate(0);

  var ticks = 0;
  var container = $('#container');
  var lamp = $('#lamp');
  var amount = 10;
  var wobble = 0;

  /**
    * Configure Canvas if available
    */
  if (utils.isCanvasSupported()) {
    var canvas;

    var canvas_width = WIDTH || window.innerWidth;
    var canvas_height = HEIGHT || window.innerHeight;

    var canvasContainer = 'canvasContainer';

    canvas = document.createElement('canvas');
    $('#' + canvasContainer).append(canvas);

    if (!canvas || typeof canvas !== 'object') {
      // Canvas not available - disable canvas support
      console.log("Canvas not available, using no canvas fallback.");
      utils.isCanvasSupported = function() {
        return false;
      }
    }

    // Initialize PIXI.js
    var stage = new PIXI.Stage(0x222), // w, h, canvas, transparency
        renderer = PIXI.autoDetectRenderer(canvas_width, canvas_height, canvas, true);

    // position renderer
    renderer.view.style.position = "absolute";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";
    //renderer.view.style.padding = "0";


    // draw polygon of lamp to spawn sparkles from (collision detection)
    var vertices = [0, 100, 420, 0, 740, 50,
                    750, 250, 510, 350, 300, 350,
                    0, 160];

    if (!pMopde) {
      var _g = new PIXI.Graphics();
      _g.beginFill(0x00EE00, 0.1); // half transparent, green
      utils.movePolygon(vertices, GeniePlace.x, GeniePlace.y);
      utils.drawPolygon(_g, vertices);
      stage.addChild(_g);
    }

    var polygon = new PIXI.Polygon( vertices );

    /**
      * Particle System
      */
    var particleLimit = (ismobile) ? 6 : 12;
    var particleCounter = 0;

    var mouseTrailTroggle = true;

    var pBatch = new PIXI.SpriteBatch();
    stage.addChild(pBatch); // add batch to stage !important

    var pTexture = PIXI.Texture.fromImage("img/sparkle_sheet.png")

    // slice sheet into subimages for animation
    var pSheet = [];
    var w = 32, h = 32; 
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 4; j++) {
        pSheet.push( new PIXI.Texture( pTexture,
                          new PIXI.Rectangle( i * w, j * h, w, h ) ) );
      }
    }

    var particles = [];

    function Particle(x, y) {
      console.log("Particle Spawned!");

      var p = new PIXI.Sprite( pSheet[0] );
      p.interactive = p.buttonMode = false;
      p.anchor.x = p.anchor.y = 0.5;
      p.position.x = x;
      p.position.y = y;
      p.ticks = 0;
      p.limit = 0 + Math.random() * 4 - 1 | 0;
      p.subImg = 0;
      p.removed = false;
      p.g = .02 * Math.random(); // gravity
      p.v = {
        x: utils.randomFlip(.8),
        y: 0
      } // velocity

      p.tick = function() {
        this.ticks++;
        if (this.ticks > this.limit) {
          this.ticks = 0;
          this.texture = (pSheet[this.subImg++ % pSheet.length]);
        }
        // update the particle
        this.rotation += 0.001;

        if (this.subImg >= pSheet.length) {
          this.kill();
        }

        this.move();
      }

      p.move = function() {
        this.v.y += this.g;
        this.x += this.v.x;
        this.y += this.v.y;
      }

      // destroy the particle and free memory
      p.kill = function() {
        this.removed = true;
      }

      return p;
    }

    function spawnParticle(x, y, size, max) {
      if (!x || !y) {
        var lamp = $('#lamp');
        if (lamp) {
          var m = (ismobile ? 40 : 100)
          for (var i = 0; i < m; i++) { // try max 40 times
            x = lamp.position().left + Math.random() * lamp.width();
            y = lamp.position().top + Math.random() * lamp.height();
            if (polygon.contains(x, y)) {
              console.log("Inside Polygon ["+x+"]["+y+"]! " + i + " attempts.");
              break;
            }
          }
        }
      } // X Y initialized

      //var p = new Particle(50, 50);
      var p = new Particle(x, y);

      var q = size || 1;
      if (max) {
        q += (Math.random() * (max - size) | 0);
        if (q < 0) {
          q = -q;
        }
      }
      p.scale.x = p.scale.y = q || 1;
      //p.scale.x = p.scale.y = 10;

      particles.push(p);
      pBatch.addChild(p);
    }
  }

  function spawnLampParticles() {
    spawnParticle(null, null, 1, 2);
    spawnParticle(null, null, 1, 2);
    spawnParticle(null, null, 3, 4);
  }

  function rub() {
    wobble += 1;

    if (utils.isCanvasSupported()) { // Canvas available
      spawnLampParticles();
    } else { // No Canvas Fallback

    }
  }

  container.on('click', function(e) {
    rub();
    return false;
  });

  // disable mouse double selection

  function dropIntro() {
    var oldLamp = $('#lamp');
    var oP = GeniePlace.y; // old position
    console.log(oP);
    var newHeight = -oldLamp.height() * 1.2;
    console.log("new: " + newHeight);
    oldLamp.css('top', newHeight - 50);
    console.log("new real position: " + oldLamp.position().top);
    var from = newHeight;
    var now = from;
    console.log("from: " + from);

    var grav = 3;
    var yspd = 10;
    var bounceCount = 0;
    var bounceMax = 4;

    // loop
    function introLoop() {
      introAnimation(introLoop);
    }
    introLoop();

    function introAnimation(callback) {
      var lamp = $('#lamp');

      yspd += grav;
      var s = (now + yspd);

      var oldY = oP;

      if (s > oldY) { // bounce from ground
        s = oldY - (s - oldY);
        
        if (bounceCount < 1) {
          wobble += (yspd / (20 * (bounceCount * 3 + 1) ) );
          spawnLampParticles();
          spawnLampParticles();
          spawnLampParticles();
        } else {
          wobble -= (yspd / (15 * (bounceCount * 1 + 1) ) );
          spawnLampParticles();
        }
        spawnParticle();
        console.log("bounce speed: " + yspd | 0);

        yspd = -(yspd / 1.80);
        bounceCount++;

        if (bounceCount > 1) {
          //setTimeout(videoTransition, 2000);
        }
      }

      // update lamp position
      lamp.css({ top: s });
      now = s;

      if (bounceCount < bounceMax) {
        setTimeout(callback, MSPF);
      } else {
        // set position to original value
        lamp.css({ top: oP });
      }
    }

  }
  dropIntro();


  function start() {
    function loop() {
      render(loop);
    }
    loop();
    console.log("Rendering Started!");

    function update() {
      tick(update);
    }
    // run only if canvas is available
    if (utils.isCanvasSupported()) {
      update();
      console.log("Ticking Started!");
    }

    function tick(callback) {
      ticks++;

      var buf = [];
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        if (!p.removed) {
          p.tick();
          buf.push(p);
        } else {
          pBatch.removeChild(p);
          console.log('particle removed.');
        }
      }
      // swap
      particles = buf;

      renderer.render(stage);

      // Schedule next tick
      if (running) {
        setTimeout(callback, MSPT);
      }
    }

    function render(callback) {
      frames++;

      var lamp = $('#lamp');


      if (lamp) {
        if (wobble > 0) {
          // animate lamp
          var a = (wobble * amount);

          var rot = ( Math.sin(frames++ / ( 5 * speed )) * wobble * 2 );

          //$('#lamp').rotate( Math.sin(frames++ / a) * a - (a / 2) );
          lamp.rotate( rot );
        }

        wobble *= .99;
        if (wobble < 0.2) {
          wobble = 0.2;
        }

      }

      if (running) {
        setTimeout(callback, MSPF);
      }
    }
  }
  start();

  /**
    * Resize function
    */
  function resize() {
    var width = WIDTH;
    var height = window.innerHeight;

    // position the app
    renderer.view.style.position = "absolute";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";
    renderer.resize(width, height);

    //initPolygon();

    // set mobile frindly hit area
    //mobileHitAreaFix();

    // draw hitbox for testing
    if (!pMopde) {
      var g = new PIXI.Graphics();
      g.beginFill(0x00FF00, 0.5);
      g.drawRect(sprGenie.hitArea.x + sprGenie.width * sprGenie.anchor.x,
                 sprGenie.hitArea.y + sprGenie.height * sprGenie.anchor.y, sprGenie.hitArea.width, sprGenie.hitArea.height);
      g.endFill();
      stage.addChild(g);
    }
  }

  /**
    * Glowy stars
    */
  var glowing = true;
  (function() {
    var img = $('#glow');
    var duration = 1000;
    function loop() {
      if (glowing) {
        img.fadeIn(duration, function() {
          img.fadeOut(duration, loop);
        })
      }
    }
    if (img) {
      loop();
    }
  })();


  /**
    * Video Transition
    */
  function videoTransition() {

    var t = 3000;
    var vc = $('#video_container');
    var v = $('#video_id');
    vc.fadeIn(t, function() {
      running = false;
      v[0].player.play();
    });

    $('#lamp').animate({ opacity: 0}, t, function() {
      $(this).remove();
    });
  } // f.videoTransition


  /**
    * Configure sparkles and mouse trails for canvas
    * and fallback to jquery animations if not supported (ie8)
    */
  if (utils.isCanvasSupported()) {
    console.log("Canvas Supported!~~");



  } else { // No Canvas Fallback
    console.log("NO CANVAS SUPPORT!");

    /**
      * Initialize Mouse Trail Effect
      */
    $(document).ready(function() {
      var gifs = ['twinkle', 'gcspinny', 'sparkles29jc', 'sparkle'];
      var ticker = 0; // loops through all sparkles
      var skip = 10; // # of mouse move events to skip before a sparkle
      var counter = 0; // counts # of sparkles to skip

      function mouse(e) {
        counter++;
        if (counter < skip) {
          return;
        }
        counter = 0;

        var pointer = $('<img>').attr({'src':'img/' + gifs[ticker++ % gifs.length] + '.gif'});

        pointer.addClass('trail');

        var x = e.pageX - pointer.width() / 2;
        var y = e.pageY - pointer.height() / 2;

        var duration = 1000;
        var nx = x + (Math.random() * 6 - 3) * (duration >> 7);
        var ny = y + (Math.random() * 6) * (duration >> 7);

        var props = {
          opacity: 0,
          left: nx,
          top: ny
        }

        // add to document
        $(document.body).append(pointer);

        pointer.css({
          'position': 'absolute',
          left: x,
          top: y
        }).animate(props, duration, function(){ $(this).remove(); });

      } // f.mouse(e)

      $(document).mousemove(function(e) {
        mouse(e);

        return false;
      });

      try {
        $(document).on('touchmove', function(e) {
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

          mouse(touch);

          return false; // prevent default
        })
      } catch (err) {
        console.log(err);
      }

    }); // document ready

  } // No Canvas Fallback



}); // $()