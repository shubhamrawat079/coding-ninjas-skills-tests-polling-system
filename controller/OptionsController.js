const Option = require('../models/options');
const Question = require('../models/questions');

module.exports.create = async function (req, res) {
    console.log(req.body)
    const { title } = req.body
    const newObj = new Question({ title })
    newObj.save();
    res.send(newObj)
}

module.exports.add_vote = async function (req, res) {
    // in this votes will be added to the particular option of the question
    console.log(req.params.id)
    // this the increment query in which the vote is incremented by one 
    const opt = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } })
    if (opt) {
        console.log(opt);
        opt.vote+=1;
        res.send(await opt.save());
    }
    // handling the bad requests
    else {
        res.send('option does not exits')
    }
}

module.exports.delete = async function (req, res) {
    // delete the id option 
    console.log('id', req.params.id);
    const opt = await Option.findById(req.params.id);
    if (opt) {
        const quesId = opt.question;
        // finding the question to which the option is deleted and removing that option from its option array
        const ques = await Question.findByIdAndUpdate(quesId, { $pull: { options: req.params.id } });
        // now absolutely deleting that option
        await Option.findByIdAndDelete(req.params.id)

        console.log(ques);
        res.send('option deleted')
    }
    // handling the bad request
    else {
        res.send('id not exists')
    }
}
