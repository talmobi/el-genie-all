$(function() {
  var pMopde = (~'localhost'.indexOf(document.URL));

  if (!console || pMopde) {
    console = {
      log: function(str) {
        // do nothing
      }
    } 
  }

  var utils = {
    isCanvasSupported: function() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
  };

  // initalizes lamp rotation container
  $('#lamp').rotate(0);

  var ticks = 0;
  var container = $('#container');
  var lamp = $('#lamp');
  var amount = 10;
  var wobble = 0;

  function rub() {
    wobble += 1;

    if (utils.isCanvasSupported()) { // Canvas available

    } else { // No Canvas Fallback

    }
  }

  container.on('click', function(e) {
    rub();
    return false;
  });

  var MSPF = 1000 / 20;
  var frames = 0;
  var speed = 1;
  var running = true;


  function dropIntro() {
    var oldLamp = $('#lamp');
    var oP = oldLamp.position().top; // old position
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
        } else {
          wobble -= (yspd / (15 * (bounceCount * 1 + 1) ) );
        }
        console.log("bounce speed: " + yspd | 0);

        yspd = -(yspd / 1.80);
        bounceCount++;

        if (bounceCount > 1) {
          setTimeout(videoTransition, 2000);
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
      render(loop)
    }
    loop();

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

  } else { // No Canvas Fallback

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