const seedrandom = require('seedrandom');

const unit = 50;
const tiles = {
    "LR": "M 0 5 h 50 M 0 15 h 50 M 0 25 h 50 M 0 35 h 50 M 0 45 h 50",
    "LR_": "M 0 0 h 50 v 50 h -50 z",
    "TB": "M 5 0 v 50 M 15 0 v 50 M 25 0 v 50 M 35 0 v 50 M 45 0 v 50",
    "TB_": "M 0 0 v 50 h 50 v -50 z",
    "LB":  "M -0 5 A 45 45 0 0 1 45 50 M -0 15 A 35 35 0 0 1 35 50 M -0 25 A 25 25 0 0 1 25 50 M -0 35 A 15 15 0 0 1 15 50 M -0 45 A 5 5 0 0 1 5 50",
    "LB_": "M -0 0 A 50 50 0 0 1 50 50 h -50 z",
    "LT":  "M 45 0 A 45 45 0 0 1 0 45 M 35 0 A 35 35 0 0 1 0 35 M 25 0 A 25 25 0 0 1 0 25 M 15 0 A 15 15 0 0 1 0 15 M 5 0 A 5 5 0 0 1 0 5",
    "LT_": "M 50 0 A 50 50 0 0 1 0 50 v -50 z",
    "RT": "M 50 45 A 45 45 0 0 1 5 0 M 50 35 A 35 35 0 0 1 15 0 M 50 25 A 25 25 0 0 1 25 0 M 50 15 A 15 15 0 0 1 35 0 M 50 5 A 5 5 0 0 1 45 0",
    "RT_": "M 50 50 A 50 50 0 0 1 0 0 h 50 v 50 z",
    "RB": "M 5 50 A 45 45 0 0 1 50 5 M 15 50 A 35 35 0 0 1 50 15 M 25 50 A 25 25 0 0 1 50 25 M 35 50 A 15 15 0 0 1 50 35 M 45 50 A 5 5 0 0 1 50 45",
    "RB_": "M 0 50 A 50 50 0 0 1 50 0 v 50 z",
}
const tileTypes = Object.keys(tiles);

function drawTile(type,x,y,col,background) {
    let result = "";
    if (tiles[type+"_"]) {
        result += `<path d="${tiles[type+"_"]}" transform="translate(${x*unit},${y*unit})" fill="${background}" />`;
    }
    return result + `<path d="${tiles[type]}" transform="translate(${x*unit},${y*unit})" stroke="${col}" stroke-width="5px" />`;
}

module.exports = function(seed) {
    const rng = seedrandom(seed);
    const cols = [
        '#EEEEEE',
        "#BC3838",
        "#1F2937",
        "#2DB2B8"
    ]
    let colIndex = 0;
    let background = cols.splice(1+Math.floor(rng()*(cols.length-1)),1)
    let content = "";
    for (var i=0;i<10;i++) {
        let x = Math.floor(rng()*2) === 0 ? 0 : 15;
        let y = Math.floor(rng()*8);
        // let heading = Math.floor(rng()*2)*2;
        let heading = (x === 0)?2:0
        let previousHeading = heading;
        let col = cols[colIndex]
        colIndex = (colIndex+1)%cols.length
        // let col = cols[Math.floor(rng()*cols.length)]

        while (x > -1 && x < 17 && y > -1 && y < 9) {
            let tileType = (heading%2===0)?"LR":"TB"
            previousHeading = heading;

            let r = Math.floor(rng()*20);
            if (r < 4) {
                if (heading === 0) tileType = "RB";
                if (heading === 1) tileType = "LB";
                if (heading === 2) tileType = "LT";
                if (heading === 3) tileType = "RT";
                heading--
            } else if (r > 15) {
                if (heading === 0) tileType = "RT";
                if (heading === 1) tileType = "RB";
                if (heading === 2) tileType = "LB";
                if (heading === 3) tileType = "LT";
                heading++
            }
            if (heading === -1) { heading = 3 }
            if (heading === 4) { heading = 0 }

            content += drawTile(tileType,x,y,col,background)

            switch(heading) {
                case 0: x -= 1; break;
                case 1: y -= 1; break;
                case 2: x += 1; break;
                case 3: y += 1; break;
            }
        }
    }
    return `<svg viewbox="0 0 800 400" class="h-auto w-full" style="background: ${background}"><g fill="none">${content}</g></svg>`
}
