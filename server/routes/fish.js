const express = require('express');
const router = express.Router();

const db = require('../config/db-config');
 
// GET all fish
router.get('/', (req, res) => {
    const fishRef = db.ref('fish/');

    fishRef.once('value')
        .then((fishSnap) => {
            const fish = fishSnap.val();
            res.status(200).send(fish);
        })
        .catch(() => {
            res.status(500).send({Error: 'cannot get users broh'});
        })
})

// POST a new fish object (only accessible from cURL or Postman, has not access on front-end)
router.post('/', async (req, res) => {
    const {name, img, size, speed, depth, desc, price} = req.body;
    const fishRef = db.ref('fish/');
    let fishId;
    await fishRef.push({
        name: name,
        img: img,
        size: size,
        speed: speed,
        depth: depth,
        desc: desc,
        price: price
    }, (err) => {
        if (err) {
            res.status(500).send({Error: 'Failed to create fish'})
        } else {
            res.status(200).send({Success: 'Created fish'});
        }
    }).then((snap) => fishId = snap.key);

    const singleFishRef = db.ref(`fish/${fishId}`);
    const singleFish = (await singleFishRef.once('value')).val();
    await singleFishRef.set({...singleFish, id: fishId});
});

module.exports = router;