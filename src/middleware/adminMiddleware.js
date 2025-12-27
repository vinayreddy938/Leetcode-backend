const  = async(req,res,next)=>{
    const token = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found. Please login first",
    });
  }
  const { _id } = await jwt.verify(token, JWT_SECRET);
  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if(user?.role !== 'admin'){
     return res.status(404).json({
      success: false,
      message: "Invalid Token",
    });
    

  }
  const isBlocked = await RedisClient.exists(`token:${token}`)
  if(isBlocked){
    return res.status(404).json({
        success: false,
        message: "Invalid Token",
      });


  }
  req.user = user;
  next();
}
export default adminMiddleware;