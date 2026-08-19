const validateInterviewRequest = (req, res, next) => {
    const { topic, difficulty, numberOfQuestions } = req.body;

    if (!topic || !difficulty || !numberOfQuestions) {
        return res.status(400).json({
            success: false,
            message: "Topic, difficulty and numberOfQuestions are required"
        });
    }

    if (numberOfQuestions < 1 || numberOfQuestions > 15) {
        return res.status(400).json({
            success: false,
            message: "numberOfQuestions must be between 1 and 15"
        });
    }

    next();
};

export { validateInterviewRequest };