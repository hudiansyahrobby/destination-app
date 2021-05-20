module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    console.log("AHHAHA");
    fn(req, res, next).catch(next);
  };
};
