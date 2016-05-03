var app = {};

var getUserName = function(user) {
  var indexToSlice = _.indexOf(user, '=');

  user = user.slice((indexToSlice + 1));

  if (user.match(/%20/i)) {
    user = user.replace(/%20/i, ' ');
  }
  
  return user;
};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log("I'm working!");
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.log("I'm not working!");
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  var name = message.username;
  $('#main').append(message.username);
  $('#chats').append('<blink class="username">' + '<a href=#' + name + '>' + name + '</a>: ' + message.msg + '</blink>');
};

//submit button
$('#new_message').click(function() {
  var msg = $('input[name="message"]').val();

  var message = {
    msg: msg,
    username: getUserName(window.location.search)
  };
  app.addMessage(message);
});

app.addRoom = function(roomName) {
  var room = $('#roomSelect').append('<option value="' + roomName + '">' + roomName + '</option>');
};

app.friends = [];

app.addFriend = function(friendName) {
  app.friends.push(friendName);
};

$('body').delegate('blink', 'click', function(user) {
  app.addFriend(JSON.stringify(user.username));
});



$(document).ready(function() {
  app.init();
  app.send();
  app.fetch();
});