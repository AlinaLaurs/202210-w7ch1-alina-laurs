import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import mongoose, { Schema, model } from 'mongoose';

const DBName = 'Coctails';
const uri = `mongodb+srv://${process.env.USER1}:${process.env.PASSW}@${process.env.CLUSTER}/${DBName}?retryWrites=true&w=majority`;
console.log(uri);

// Coctail.find()
// Coctail.findById()
// Coctail.create()
// Coctail.findByIdandUpdate()
// Coctail.findByIdandDelete()

//const coctailSchema = new Schema({
//name: String,
//color: String,
//ingredient: String,
//alcohol: Boolean,
//});

(async () => {
    const conector = await mongoose.connect(uri);
    console.log(mongoose.connection.readyState);

    //const Coctail = model('Coctail', coctailSchema, 'coctails');
    //Coctail.create({
    // Es lo mismo que: new Coctail(). Pero para testear es mejor create.
    //name: 'Caipiroska',
    //color: 'Transparent',
    //ingredient: 'Olive',
    //alcohol: true,
    conector.disconnect();
})();
