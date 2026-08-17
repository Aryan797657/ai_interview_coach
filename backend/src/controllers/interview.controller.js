const generateQuestion = async (req, res) => {
    const { topic, difficulty } = req.body;

    res.json({
        message: "Question generation endpoint is working",
        topic,
        difficulty
    });
};

export { generateQuestion };