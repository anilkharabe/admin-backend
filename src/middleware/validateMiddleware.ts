
class ValidateMiddleware {
  public validate(schema: any) {
    return (req: any, res: any, next: any) => {
      const { error } = schema.validate(req.body);

      if (error) {
        console.error({
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          message: error.message,
        });
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next();
    };
  }
}

export default new ValidateMiddleware();
