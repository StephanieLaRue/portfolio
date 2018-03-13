let damageTotal = 20;
let computerDamageTotal = 20;
let streakCount = 0;
userWinStreak = {
  'wins': 0,
  'losses': 0
};
let playing = true;

function play() {

  if (playing) {

    let attack = Math.floor(Math.random() * 2);
    let computerAttack = Math.floor(Math.random() * 2);

    let damage = Math.floor(Math.random() * 10 + 1);
    let computerDamage = Math.floor(Math.random() * 10 + 1);

    if (attack > computerAttack) {
      computerDamageTotal -= damage;
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let hitstats = 'Direct hit! ' + 'You inflicted ' + damage + ' damage!' + '\n' + ' comp ' + computerDamageTotal + ' user ' + damageTotal;
      let text = document.createTextNode(hitstats);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(15, 116, 34)';
      li.className = 'listLog';
    } else if (attack == computerAttack) {
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let nohitstats = 'No one was hit! ' + ' user ' + damageTotal + ' comp ' + computerDamageTotal;
      let text = document.createTextNode(nohitstats);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(80, 78, 78)';
      li.className = 'listLog';
    } else {
      damageTotal -= computerDamage;
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let damagestats = 'The T-rex inflicted ' + computerDamage + ' damage!' + ' user ' + damageTotal + ' comp ' + computerDamageTotal
      let text = document.createTextNode(damagestats);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(177, 14, 14)';
      li.className = 'listLog';
    }

    if (damageTotal <= 0) {
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let gameoverlog = 'The T-Rex killed you!' + '\nGame over';
      let text = document.createTextNode(gameoverlog);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(15, 8, 8)';
      li.className = 'listLog';
      playing = false;
      reset();
      streakCount = 0;
      displayStreak();
    } else if (computerDamageTotal <= 0) {
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let killedtrexlog = 'You killed the T-Rex!' + 'Congratulations!';
      let text = document.createTextNode(killedtrexlog);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(15, 8, 8)';
      li.className = 'listLog';
      console.log();
      streakCount++;
      playing = false;
      reset();
      scores();
      displayStreak();
    }
    // else {
    //   console.log("Battle is still going!");
    //   let logContainer = document.getElementById('combatLog');
    //   let stillgoing = "Battle is still going!";
    //   logContainer.innerHTML = stillgoing;
    //   logContainer.style.color = 'rgb(15, 8, 8)';
    // }
  } else {
      let ul = document.getElementById('logEntries');
      let li = document.createElement('li');
      let gameover = "Game Over!";
      let text = document.createTextNode(killedtrexlog);
      li.appendChild(text);
      ul.prepend(li);
      li.style.color = 'rgb(15, 8, 8)';
      li.className = 'listLog';
    reset();
  }
}

function displayStreak() {
  let streakDisplay = document.getElementById('winStreakDisplay');
  streakDisplay.className = 'streakNumber';
  streakDisplay.innerHTML = streakCount;
}

function choosePlayer() {
  $('#raptorButton').fadeIn('slow');
  $('#trexButton').fadeIn('slow');
  $('#choosePlayer').fadeOut('fast');
}

function chooseRaptor() {
  let attackButton = document.getElementById('attack');
  $('#raptorImg').fadeIn('slow');
  $('#raptorText').show('fast');
  setTimeout(function() {
    $('#raptorText').fadeOut(1500);
  }, 1300);
  $('#trexImg').delay(1800).fadeToggle(1);
  attackButton.disabled = false;
}

function chooseTrex() {
  let attackButton = document.getElementById('attack');
  $('#trexImg').fadeIn('slow');
  $('#trexText').show('fast');
  setTimeout(function() {
    $('#trexText').fadeOut(1500);
  }, 1300);
  $('#raptorImg').delay(1800).fadeToggle(1);
  attackButton.disabled = false;
}

function disablePlayerButtons() {
  raptorButton.disabled = true;
  trexButton.disabled = true;
}

function beginAttack() {

}

function scores() {
  localStorage.setItem('userWinStreak', JSON.stringify(userWinStreak));
  let streak = localStorage.getItem('userWinStreak');
  if (streakCount > userWinStreak.wins) {
    userWinStreak.wins = parseInt(streakCount);
    localStorage.setItem('userWinStreak', userWinStreak.wins);
    console.log('streak:', JSON.parse(userWinStreak.wins));
  }
}

function reset() {
  localStorage.removeItem('userWinStreak');
  localStorage.setItem('userWinStreak', JSON.stringify(userWinStreak));
  let streak = localStorage.getItem('userWinStreak');
  if (streakCount > userWinStreak.wins) {
    userWinStreak.wins = parseInt(streakCount);
    localStorage.setItem('userWinStreak', userWinStreak.wins);
    console.log('streak:', JSON.parse(userWinStreak.wins));
  }
  damageTotal = 20;
  computerDamageTotal = 20;
  playing = true;
}

// function restartGame() {
//     let confirm = document.getElementById('restartConfirm');
//     let cancel = document.getElementById('cancel');
//     confirm.onclick = function() {
//       let attackButton = document.getElementById('attack');
//       damageTotal = 20;
//       computerDamageTotal = 20;
//       attackButton.disabled = true;
//       playing = false;
//       let displayRestart = document.getElementById('restartContainer');
//       displayRestart.style.display = 'none';
//       let overlay = document.getElementById('overlay');
//       overlay.style.display = 'none';
//       location.reload();
//     }
//     cancel.onclick = function() {
//       let displayRestart = document.getElementById('restartContainer');
//       displayRestart.style.display = 'none';
//       let overlay = document.getElementById('overlay');
//       overlay.style.display = 'none';
//       play();
//     }
//   }


$(document).ready(function() {
  let attackButton = document.getElementById('attack');
  attackButton.disabled = true;
  restart.disabled = true;
  $('#choosePlayer').on('click', function() {
    choosePlayer();
  });
  let raptorText = document.getElementById('raptorText');
  let trexText = document.getElementById('trexText');
  $('#raptorButton').on('click', function() {
    chooseRaptor();
    disablePlayerButtons();
  });
  $('#trexButton').on('click', function() {
    chooseTrex();
    disablePlayerButtons();
  })

  $('#attack').on('click', function() {
    restart.disabled = false;
    play();
  });
  $('#restart').on('click', function() {
    console.log('Restart Game')
    // let displayRestart = document.getElementById('restartContainer');
    // displayRestart.style.display = 'block';
    // let overlay = document.getElementById('overlay');
    // overlay.style.display = 'block';
    location.reload();
    // restartGame();
  });

  // $('#block').on('click', function() {
  //   block();
  // })
  // $('#heal').on('click', function() {
  //
  // });

});
