const helper = {};

helper.randomNumber = () => {
  const posible = 'a1b2c3d4e5f6g7h8i9j0kl8m7n6ñ5o4p3q2r1s0t4u5v2w65x78y86z100$-_*#=?';

  let rNumber = 0;

  for (let i = 0; i < 20; i++){
    rNumber += posible.charAt(Math.floor(Math.random() * posible.length));
  }

  return rNumber;
}

module.exports = helper;