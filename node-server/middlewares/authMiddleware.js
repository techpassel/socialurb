import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let rejectReason;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        rejectReason = "Invalid token";
      }
      if (decodedToken) {
        var dateNow = new Date();
        if (decodedToken.exp < dateNow.getTime() / 1000) {
          rejectReason = "Token is expired";
        } else {
          try {
            const user = await User.findById(decodedToken.id).select({
              password: 0,
            });
            if (user) {
              if (!user.isAdmin && req.originalUrl.startsWith('/admin')) {
                rejectReason = "Insufficient permission";
              } else {
                req.user = user;
              }
            } else {
              rejectReason = "Invalid token";
            }
          } catch (error) {
            rejectReason = "Invalid token";
          }
        }
      }
    } catch (error) {
      throw new Error('Some error occured.Please try again');
    }
  } else {
    rejectReason = "No token found";
  }

  if (rejectReason) {
    res.status(401);
    throw new Error(`Not authorized, ${rejectReason}`);
  }
  next();
});

export default protect;