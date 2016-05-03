$(document).ready(function() {

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
        console.log('sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        // console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  app.fetch = function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        _.each(data, function(array, index) {
          _.each(array, function(obj, key) {
            obj.text = _.escape(obj.text);
            app.addMessage(obj);
          });
        });
      },
      error: function (data) {
        alert('broken');    
      }
    });
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.addMessage = function(message) {
    var name = message.username;
    $('#chats').append('<p><blink class="username">' + '<a href=#' + name + '>' + name + '</a>: ' + message.text + '</blink></p>');
  };

  //submit button
  $('#new_message').click(function() {
    var msg = $('input[name="message"]').val();
    var message = {
      text: msg,
      username: getUserName(window.location.search)
    };
    app.addMessage(message);
    app.send(message);
  });

  // app.addRoom = function() {
  //   var roomName = $('input[name="roomName"]').val();

  //   if ($("'option[val='" + roomName + "]") === roomName) {
  //     var room = $('#roomSelect').append('<option value="' + roomName + '">' + roomName + '</option>');
  //   }

  // };

  $('#room_button').click(function() {
    app.addRoom();
  });

  app.friends = [];

  app.addFriend = function(friendName) {
    app.friends.push(friendName);
  };

  $('body').delegate('blink', 'click', function(user) {
    app.addFriend(JSON.stringify(user.username));
  });




  app.init();
  app.send();
  app.fetch();
});