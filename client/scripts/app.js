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
  app.send();
  app.fetch();    
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
    },
    error: function (data) {
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
          
          if (obj.text.length > 0) {
            if (!_.contains($('#chats').children()), obj) {
              app.addMessage(obj);
            }
          }

          app.addRoom(obj);
        });
      });
      $('#chats p blink a').click(function(event) {
        var name = event.currentTarget.getAttribute('href');
        app.addFriend(name);
      });
    },
    error: function (data) {
      console.log('broken');    
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty().animate();
};

app.addMessage = function(message) {
  var name = message.username;
  $('#chats').prepend('<p><blink class=' + name + '><a href=#' + name + '>' + name + '</a>: ' + message.text + '</blink></p>');
};

app.handleSubmit = function() {
  $('#send .submit').click(function() {
    var msg = $('input[name="message"]').val();
    var message = {
      text: msg,
      username: getUserName(window.location.search)
    };
    app.addMessage(message);
    app.send(message);
    $('#message_box').val('');
  });
};

app.addRoom = function(obj) {
  var roomname = obj.roomname;
  if (!$('option').hasClass(roomname)) {
    $('#roomSelect').append('<option value="None" class="' + roomname + '">' + roomname + '</option>');
  }
};

$('#room_button').click(function() {
  var name = $('input[name="roomName"]').val();
  var roomObj = {
    roomname: name
  };

  app.addRoom(roomObj);
  app.send(roomObj);
});

var friendList = [];

app.addFriend = function(friendName) {
  
  friendName = friendName.slice(1);

  if (friendList.indexOf(friendName) === -1) {
    $('.actual_list').append('<p>' + friendName + '</p>');
    friendList.push(friendName);
  }

  var highlightFriendPosts = function(friend) {
    $('.' + friend).css('font-weight', 'bold');
  }; 
  highlightFriendPosts(friendName);

};


$(document).ready(function() {

  app.init();
  app.handleSubmit();
  
});