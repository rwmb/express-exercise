import * as adviceService from './service';

const getAndStoreAdvice = async (req, res, next) => {
  try {
    // TODO: Use a more robust validation library for query,
    // like express-validator, and could be a middleware or a helper function
    const { query } = req.body;
    console.log('query', query);

    const advice = await adviceService.getAndStoreAdvice(query);

    res.status(200).json({ advice });
  } catch (error) {
    console.error('error', error);
    next(error);
  }
};

export { getAndStoreAdvice };
