import Bounce from "bounce.js"
const grow = new Bounce();
grow.scale({
    from: { x: 1, y: 1 },
    to: { x: 1.5, y: 1.5 },
    duration: 2000
});
grow.define("grow");

const moveAside = new Bounce();
moveAside.translate({
    from: { x: 0 },
    to: { x: -30 },
    duration: 500
});
moveAside.define("move-aside")