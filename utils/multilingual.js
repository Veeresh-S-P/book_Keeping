const messages = {
    en: {
      notFound: 'Not Found',
      unauthorized: 'Not authorized',
      userExists: 'User already exists',
      invalidUserData: 'Invalid user data',
      invalidEmailOrPassword: 'Invalid email or password',
      bookNotFound: 'Book not found',
      libraryNotFound: 'Library not found',
      bookRemoved: 'Book removed',
      bookAddedToInventory: 'Book added to inventory',
      bookRemovedFromInventory: 'Book removed from inventory',
    }
  };
  
  const setLocale = (req, res, next) => {
    const locale = req.query.lang || 'en';
    req.locale = locale;
    req.t = (key) => messages[locale][key] || key;
    next();
  };
  
  module.exports = {
    setLocale,
  };
  