// To connect with your mongoDB database
import mongoose from 'mongoose';
import express from 'express';
import cors from "cors";


mongoose.connect('mongodb://localhost:27017/', {
	dbName: 'react-practice',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err: any) => err ? console.log(err) :
	console.log('Connected to react-practice database'));

// Schema for users of app
const BoardSchema = new mongoose.Schema({
	date: {
		type: Date,
	},
	categories: [{id: Number,title: String}],
	questions: [{question: String,answer: String,value: Number,category_id: Number}],
	
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/create-board", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(5000);
