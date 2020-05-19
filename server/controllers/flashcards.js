exports.postTranslation = (req, res, next) => {
    console.log('request received');
    res.status(200).json({message: 'Hello'});
};