const router = require('express').Router();
const User = require('../models/user');
const validation = require('../validation')

router.get('/', (req, res) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(201).send({
                userCount: docs.length,
                users: docs
            })
        })
        .catch(err => console.log(err))
    
});

router.post('/', (req, res) => {
    const { error } = validation(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    };

    User.findOne({email: req.body.email})
        .exec()
        .then(result => {
            console.log('This is the result '+ result)
            if (result != null) return res.status(400).json('Email already existed, use another')
            else {
                const user = new User ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_no: req.body.phone_no,
                    address: req.body.address,
                    slack: req.body.slack,
                    suggestion: req.body.suggestion
                })
                user.save()
                    .then(result => {
                                console.log(result)
                                res.status(201).json(result)
                            })
                    .catch(err => {
                            console.log(err)
                            res.status(500).send({
                            message: err
                        });
                    })
                }
            }) 
        .catch(err => {
            res.status(500).send({
            message: err
        })
    })               
});
        

router.get('/:id', (req, res) => {
        User.findById(req.params.id)
            .exec()
            .then(user => {
                if (!user) return res.status(404).json('User info is Unavaliable, please register')
                else res.status(200).json({
                    user: user,
                })
            })
            .catch ( err => {
                console.log(err)
                res.status(500).send({
                    message: err
            });
    })
});

router.patch ('/:id', (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.update({_id : id}, {$set : updateOps})
        .exec()
        .then(result => {
                console.log(result)
                res.status(200).send({
                updated_user : result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
});

router.delete('/:id', (req,res) => {
    User.findById(req.params.id)     
    .then(user => {
            if (!user) {
                return res.status(404).json('The User is Unavaliable')
            } else user.remove()
                        .then(() => res.status(201).send('User removed successfully'))
                })       
    .catch((err) => {
        console.log(err);
        res.status(500).json('User not found')    
    });
});

module.exports = router;