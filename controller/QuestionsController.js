const Question = require('../models/questions')
const Option = require('../models/options')

module.exports.create = async function (req, res) {
    //  in this the question are created
    const { title } = req.body;
    const newObj = new Question({ title })
    newObj.save();
    res.send(newObj)
}

module.exports.add_option = async function (req, res) {
    const { id } = req.params;
    const { option } = req.body;
    // console.log(option);
    const opt = await Question.findById(id);
    const new_option= new Option({option});
    opt.options.push(new_option);
    opt.save();
    new_option.save();
    console.log(opt);
    if (opt) {
        res.send("added")
    }
    else
        res.send("error")
}
module.exports.showDetails = async function (req, res) {
    console.log(req.params.id)

    const ques = await Question.findById(req.params.id).populate('options')


    if (ques) {
        res.send(ques);
    }
    // handling the bad requests if that id does not exist
    else {
        res.send("id does not exits");
    }



    // in this the details about the question is displayed
}

module.exports.deleteQues = async function (req, res) {
    // in this the question will be deleted
    const ques = await Question.findById(req.params.id)
    if (ques) {
        // delete all the option ⁉️ of the option db having the question id as the req.params.id
        await Question.deleteOne(req.params.id).clone().catch(function (err) { console.log(err) })
        // deleting all the option of that question
        await Option.deleteMany({ question: req.params.id }).clone().catch(function (err) { console.log(err) })
        res.send("ques deleted");

    }
    //  if th at question of the given id does not exists then just sending a message
    else {
        res.send('question does not exists')
    }
}
