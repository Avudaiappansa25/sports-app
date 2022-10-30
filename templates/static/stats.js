// Stats based on http://sofifa.com/player/20801?hl=en-US (march 2016)

function Player(options) {
  this.averageStats = [];
  this.infos = options.infos;
  this.stats = options.stats;
}

/**
 * Get the average stats for the specific category
 * @param {string} category name (e.g. 'attacking')
 * @return {Number} category average (rounded)
 **/
Player.prototype.averageCategoryStats = function averageStats(category) {
  var ar = [];
  for (var i in this.stats[category]) {
    ar.push(this.stats[category][i]);
  }
  var total = ar.reduce(function (prev, stat) {
    return prev + stat;
  });
  return Math.round(total / ar.length);
};

// Chart manipulation
var polygon = document.getElementById("polygon"),
  r = 100,
  sin30 = 1 / 2,
  cos30 = Math.sqrt(3) / 2,
  Points = {
    x: [1, 1 + cos30, 1 + cos30, 1, 1 - cos30, 1 - cos30],
    y: [0, sin30, 1 + sin30, 2, 1 + sin30, sin30]
  },
  playerPoints = {
    x: [0, cos30, cos30, 0, -cos30, -cos30],
    y: [0, -sin30, sin30, 1, sin30, -sin30]
  };

for (var i = 0; i < polygon.points.numberOfItems; i++) {
  polygon.points.getItem(i).x = Points.x[i] * r;
  polygon.points.getItem(i).y = Points.y[i] * r;
}

var svg = document.getElementById("chart"),
  playerHexagon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );

playerHexagon.setAttribute("id", "playerHexagon");
playerHexagon.setAttribute(
  "points",
  "100,100 100,100 100,100 100,100 100,100 100,100"
);
playerHexagon.setAttribute(
  "style",
  "stroke:hsla(180, 70%, 70%, 1); fill:hsla(180, 70%, 70%, .5); marker-start: url(#markerCircle); marker-mid: url(#markerCircle);"
);
svg.appendChild(playerHexagon);

// CR7 Creation
var ronaldo = new Player({
  infos: {
    photo:
      "//sport.niooz.fr/cache/mediaurl/600x200/8c4a7b8e5efe12a51e8e2e00491d37c8.jpg",
    name: "Cristiano Ronaldo",
    team: "Real Madrid FC",
    age: 31,
    nation: "Portugal",
    position: "Forward",
    foot: "Right"
  },
  stats: {
    attacking: {
      Crossing: 82,
      Finishing: 95,
      "Heading Accuracy": 86,
      "Short Passing": 81,
      Volleys: 87
    },
    skill: {
      Dribbling: 93,
      Curve: 88,
      "Free Kick Accuracy": 77,
      "Long Passing": 72,
      "Ball Control": 91
    },
    movement: {
      Acceleration: 91,
      "Sprint Speed": 93,
      Agility: 90,
      Reactions: 92,
      Balance: 62
    },
    power: {
      "Shot Power": 94,
      Jumping: 94,
      Stamina: 90,
      Strength: 79,
      "Long Shots": 93
    },
    mentaly: {
      Aggression: 62,
      Interceptions: 29,
      Positioning: 93,
      Vision: 81,
      Penalties: 85
    },
    defending: {
      Marking: 22,
      "Standing Tackle": 31,
      "Sliding Tackle": 23
    }
  }
});

// T.Silva creation
var silva = new Player({
  infos: {
    photo:
      "//www.footmercato.net/images/a/thiago-silva-fait-l-eloge-de-pogba_150564.jpg",
    name: "Thiago Silva",
    team: "Paris Saint-Germain",
    age: 30,
    nation: "Brazil",
    position: "Center-back",
    foot: "Right"
  },
  stats: {
    attacking: {
      Crossing: 60,
      Finishing: 38,
      "Heading Accuracy": 82,
      "Short Passing": 79,
      Volleys: 63
    },
    skill: {
      Dribbling: 68,
      Curve: 61,
      "Free Kick Accuracy": 73,
      "Long Passing": 81,
      "Ball Control": 80
    },
    movement: {
      Acceleration: 72,
      "Sprint Speed": 76,
      Agility: 75,
      Reactions: 84,
      Balance: 68
    },
    power: {
      "Shot Power": 78,
      Jumping: 93,
      Stamina: 74,
      Strength: 81,
      "Long Shots": 71
    },
    mentaly: {
      Aggression: 77,
      Interceptions: 91,
      Positioning: 59,
      Vision: 74,
      Penalties: 71
    },
    defending: {
      Marking: 90,
      "Standing Tackle": 91,
      "Sliding Tackle": 89
    }
  }
});

// Pogba Creation
var pogba = new Player({
  infos: {
    photo:
      "//cdn.images.express.co.uk/img/dynamic/67/590x/Paul-Pogba-602242.jpg",
    name: "Paul Pogba",
    team: "Juventus FC",
    age: 22,
    nation: "France",
    position: "Centre midfield",
    foot: "Right"
  },
  stats: {
    attacking: {
      Crossing: 76,
      Finishing: 70,
      "Heading Accuracy": 72,
      "Short Passing": 85,
      Volleys: 84
    },
    skill: {
      Dribbling: 88,
      Curve: 82,
      "Free Kick Accuracy": 80,
      "Long Passing": 81,
      "Ball Control": 89
    },
    movement: {
      Acceleration: 75,
      "Sprint Speed": 79,
      Agility: 75,
      Reactions: 86,
      Balance: 61
    },
    power: {
      "Shot Power": 91,
      Jumping: 85,
      Stamina: 90,
      Strength: 91,
      "Long Shots": 91
    },
    mentaly: {
      Aggression: 80,
      Interceptions: 71,
      Positioning: 83,
      Vision: 86,
      Penalties: 76
    },
    defending: {
      Marking: 71,
      "Standing Tackle": 77,
      "Sliding Tackle": 83
    }
  }
});

var currentPlayerAllStats = [0, 0, 0, 0, 0, 0],
  newPlayerAllStats = [0, 0, 0, 0, 0, 0],
  otherPlayer = document.getElementsByClassName("otherPlayer"),
  otherPlayerArray = Array.prototype.slice.call(otherPlayer),
  playerLine = document.getElementsByClassName("playerLine"),
  playerLineArray = Array.prototype.slice.call(playerLine);

otherPlayerArray.forEach(function (player) {
  player.addEventListener("click", runStats);
  player.addEventListener("mouseenter", displayName);
  player.addEventListener("mouseleave", displayName);
});

// This below function is so dirty and repetitive, I should refactor it
function displayName(event) {
  playerLineArray.forEach(function (line) {
    if (event.target.classList.contains("silva")) {
      if (line.classList.contains("silva")) {
        line.classList.toggle("playerLineShow");
      }
    } else if (event.target.classList.contains("ronaldo")) {
      if (line.classList.contains("ronaldo")) {
        line.classList.toggle("playerLineShow");
      }
    } else if (event.target.classList.contains("pogba")) {
      if (line.classList.contains("pogba")) {
        line.classList.toggle("playerLineShow");
      }
    }
  });

  otherPlayerArray.forEach(function (el) {
    if (el.classList.contains("playerName")) {
      if (
        event.target.classList.contains("silva") &&
        el.classList.contains("silva")
      ) {
        event.type == "mouseleave"
          ? el.classList.add("transparent")
          : el.classList.remove("transparent");
      }
      if (
        event.target.classList.contains("ronaldo") &&
        el.classList.contains("ronaldo")
      ) {
        event.type == "mouseleave"
          ? el.classList.add("transparent")
          : el.classList.remove("transparent");
      }
      if (
        event.target.classList.contains("pogba") &&
        el.classList.contains("pogba")
      ) {
        event.type == "mouseleave"
          ? el.classList.add("transparent")
          : el.classList.remove("transparent");
      }
    }
  });
}

function runStats(event) {
  if (event.target.classList.contains("silva")) {
    newPlayerAllStats = silva.averageStats;
    removeFilter("imageSilva");
  } else if (event.target.classList.contains("ronaldo")) {
    newPlayerAllStats = ronaldo.averageStats;
    removeFilter("imageRonaldo");
  } else if (event.target.classList.contains("pogba")) {
    newPlayerAllStats = pogba.averageStats;
    removeFilter("imagePogba");
  }
}

var playerImages = document.getElementsByTagName("image"),
  playerImagesArray = Array.prototype.slice.call(playerImages);

function removeFilter(playerImage) {
  playerImagesArray.forEach(function (image) {
    image.id == playerImage
      ? image.classList.remove("grayscale")
      : image.classList.add("grayscale");
  });
}

/**
 * Draw the new playerHexagon points
 * @param {Array} player stats (e.g. 'ronaldo.averageStats')
 **/
function drawPlayerStats(playerStats) {
  for (var i = 0; i < playerHexagon.points.numberOfItems; i++) {
    playerHexagon.points.getItem(i).x = r + playerPoints.x[i] * playerStats[i];
    if (i === 0) {
      playerHexagon.points.getItem(i).y = r - playerStats[i];
    } else {
      playerHexagon.points.getItem(i).y =
        r + playerPoints.y[i] * playerStats[i];
    }
  }
}

/**
 * Get the average stats for all categories
 * @param {Object} instance of Player (e.g. 'ronaldo')
 * @return {Array} categories average stats (rounded)
 **/
function getPlayerStats(player) {
  for (var category in player.stats) {
    player.averageStats.push(player.averageCategoryStats(category));
  }
}

var textStats = document.getElementsByClassName("textStats"),
  textStatsArray = Array.prototype.slice.call(textStats);
/**
 * Draw the new hexagon points according to the currentPlayerAllStats {Array} values.
 * The currentPlayerAllStats are updated until they are equal to their corresponding newPlayerAllStats values.
 **/
function anim() {
  currentPlayerAllStats.forEach(function (element, index) {
    if (currentPlayerAllStats[index] > newPlayerAllStats[index]) {
      currentPlayerAllStats[index]--;
      textStatsArray[index].textContent -= 1;
    } else if (currentPlayerAllStats[index] < newPlayerAllStats[index]) {
      currentPlayerAllStats[index]++;
      textStatsArray[index].textContent =
        Number(textStatsArray[index].textContent) + 1;
    }
  });
  drawPlayerStats(currentPlayerAllStats);
  window.requestAnimationFrame(anim);
}

getPlayerStats(ronaldo);
getPlayerStats(silva);
getPlayerStats(pogba);
anim();
