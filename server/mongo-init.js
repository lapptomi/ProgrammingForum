db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('users');
db.createCollection('posts');
db.createCollection('comments');

db.users.insert({
  _id: ObjectId("5dd62b4070fb13eec3963bea"),
  email: 'testmail12@random.com',
  username: 'testusername123123',
  password: 'testpassword123123'
});

db.posts.insert({
  _id: ObjectId("6dd62b4070fb13eec3963bea"),
  original_poster: ObjectId("5dd62b4070fb13eec3963bea"),
  title: 'Random post 11',
  description: 'Hello world!',
});

db.posts.insert({
  _id: ObjectId("8dd62b4070fb13eec3963bea"),
  original_poster: ObjectId("5dd62b4070fb13eec3963bea"),
  title: 'Random post 21',
  description: 'Hello world!',
});

db.comments.insert({
  _id: ObjectId("7dd62b4070fb13eec3963bea"),
  comment_writer: ObjectId("5dd62b4070fb13eec3963bea"),
  comment: 'Hello hello',
})

db.posts.updateOne(
  { _id : ObjectId("6dd62b4070fb13eec3963bea")},
  { $push: { "comments": ObjectId("7dd62b4070fb13eec3963bea")  } }
);