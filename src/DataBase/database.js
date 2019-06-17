const persistence = { "test@test.com": 45, "test4@test.com": 0 };

const data = (persistence = {}) => {
  const findByEmail = async email =>
    await new Promise(resolve => resolve(persistence[email]));
  const setByEmail = async (email, amount) =>
    new Promise(resolve => {
      persistence[email] = amount;
      resolve(amount);
    });
  return {
    findByEmail,
    setByEmail
  };
};

module.exports = data(persistence);
