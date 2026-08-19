const validateAnswerRequest = (req, res, next) => {
    const { questionId, answer } = req.body;

    if (!questionId || !answer) {
        return res.status(400).json({
            success: false,
            message: "questionId and answer are required"
        });
    }

    next();
};

export { validateAnswerRequest };