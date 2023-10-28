import { Request, Response, NextFunction } from "express";
import URL,{url} from "../model/urlModel";
import ErrorHandler from "../utils/errorHandler";
import shortid from "shortid";
import validator from "validator"

//**********************************Short Url Post request *********************************/

export const urlShort = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const { url } = req.body;
      
    if (!url) {
      return next(new ErrorHandler("url is required", 400));
    }
    if (!validator.isURL(url)) {
      return next(new ErrorHandler("invalid url",400))
    
  }
    const isUrlExist = await URL.findOne({redirectURL:url });
    if (isUrlExist) {
      return next(new ErrorHandler("url already shorten", 400));
    }
    const shortID = shortid();

    await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
    });

    res.status(200).json({
      shortID,
    });
  } catch (error) {
    return next(new ErrorHandler(error as string, 400));
  }
};

//**********************************Short Url redirect GET request *********************************/

export const redirectShortUrl = async (req: Request, res: Response, next: NextFunction) => {
  
  
    const shortId = req.params.shortId;
    const entry= await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    ) as url
    
    
    res.redirect(entry?.redirectURL);
  }

//**********************************Serach Url   *********************************/
  
export const searchUrl = async(req:Request,res:Response,next:NextFunction) =>{
    try {
      const { term } = req.query;
     
      
      const results = await URL.find({ redirectURL: { $regex: term, $options: 'i' } },);
      return res.status(200).json({
        results
      })

    } catch (error) {
        return next(new ErrorHandler(error as string ,400))
    }
}

//**********************************Get All Url   *********************************/

export const GetAllUrl = async(req:Request,res:Response,next:NextFunction) =>{
  try {
    const allUrl = await URL.find({})
    res.status(200).json({
      allUrl
    })

  } catch (error) {
      return next(new ErrorHandler(error as string ,400))
  }
}

//**********************************Short Url Analytics  *********************************/
  
export const handleGetAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId }) as url;
    const redirectShortUrl = result.redirectURL
    const ShortId=result.shortId
    return res.json({
    ShortId:ShortId,
     redirectShortUrl:redirectShortUrl,
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
