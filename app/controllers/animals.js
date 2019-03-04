exports.getAnimals = (req,res,next) => {
    res.status(200).json({
        animals: [{name: 'Billy', age: 5,breed:'Dog',ownerName:'Felipe'},
                  {name: 'Tody', age: 3,breed:'Cat',ownerName:'Gustavo'}]
    });
};