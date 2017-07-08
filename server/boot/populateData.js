'use strict';
var async = require('async');

module.exports = function(server) {
  var db = server.datasources.db;
  async.parallel(
    {
      topics: async.apply(createTopics),
    },
    function(err, results) {
      if (err) throw err;
      createComments(results.topics, function(err) {
        console.log('Completed');
      });
    }
  );

  function createTopics(cb) {
    console.log('Populating topics');
    db.automigrate('Topic', function(err) {
      var Topic = server.models.Topic;
      Topic.create(
        [
          {
            title: 'loren ipsum',
            content:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          },
          {
            title: 'loren ipsum',
            content:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          },
          {
            title: 'loren ipsum',
            content:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          },
        ],
        cb
      );
    });
  }

  function createComments(topics, cb) {
    console.log('Populating comments');
    db.automigrate('Comment', function(err) {
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      var Comment = server.models.Comment;
      Comment.create(
        [
          {
            topic_id: topics[0].id,
            comment: 'Hello, comments',
            commentor: 'user1',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 4,
          },
          {
            topic_id: topics[0].id,
            comment: 'Test comment2',
            commentor: 'user2',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 3,
          },
          {
            topic_id: topics[1].id,
            comment: 'I am the king of the world',
            commentor: 'user1',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 4,
          },
          {
            topic_id: topics[1].id,
            comment: 'Long long time ago in future',
            commentor: 'user2',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 3,
          },
          {
            topic_id: topics[2].id,
            comment: 'Today is wednesday',
            commentor: 'user1',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 4,
          },
          {
            topic_id: topics[2].id,
            comment: 'Marry is happy',
            commentor: 'user2',
            created_date: Date.now() - DAY_IN_MILLISECONDS * 3,
          },
        ],
        cb
      );
    });
  }
};
