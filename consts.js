module.exports = {
  patterns: {
    password: new RegExp("^[a-zA-Z0-9@_-]{6,30}$"),
    ads_kind: new RegExp("^(buy|sell)$", 'i')
  },
};
