module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
  const Contact = mongoose.model(
    'contacts',
    mongoose.Schema(
      {
        _id: {type: ObjectId, auto: true},
        firstName: String,
        lastName: String,
        email: String,
        favoriteColor: String,
        birthday: String,
      }
    )
  );

  return Contact;
};
