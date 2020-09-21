module.exports = (mongoose) => {
    const Ideas = mongoose.model(
        'idea',
        mongoose.Schema({
            title: String,
            description: String,
            active: Boolean
        }, { timestamps: true })
    );
    return Ideas
}