var app = {};

app.init = function() {

};

app.send = function(message) {
  $.ajax({
    type: 'POST',
    data: JSON.stringify(message),
    url: 'https://api.parse.com/1/classes/messages'
  });
};

app.fetch = function() {
  $.ajax({
    type: 'GET'
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  $('#chats').append('<blink class=".username">' + JSON.stringify(message) + '</blink>');
};

app.addRoom = function(roomName) {
  var room = $('#roomSelect').append('<option value="' + roomName + '">' + roomName + '</option>');
};

app.friends = [];

app.addFriend = function(friendName) {
  app.friends.push(friendName);
};

$('.username').on('click', function(user) {
  app.addFriend(user.username);
});