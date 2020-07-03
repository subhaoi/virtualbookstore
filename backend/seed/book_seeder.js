var Book = require('../models/bookModel');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/ngBookStore');

var books = [
		new Book({
			title: "Beginning Node.js",
            description: "Beginning Node.js is your step-by-step guide to learning all the aspects of creating maintainable Node.js applications. You will see how Node.js is focused on creating high-performing, highly-scalable websites, and how easy it is to get started. Many front-end devs regularly work with HTML, CSS, PHP, even WordPress, but haven't yet got started with Node.js. This book explains everything for you from a beginner level, enabling you to start using Node.js in your projects right away.",
            author: "Basarat Ali Syed",
            publisher: "Apress",
            category: "Software Development",
            price: 3500,
            cover: "https://images-na.ssl-images-amazon.com/images/I/41VWmy1rkqL._SX403_BO1,204,203,200_.jpg",
		}),
		new Book({
			title: "Node.Js Web Development",
            description:"Create real-time applications using Node.js 10, Docker, MySQL, MongoDB, and Socket.IO with this practical guide and go beyond the developer's laptop to cover live deployment, including HTTPS and hardened security. Key Features Learn server-side JavaScript coding through the most up-to-date book on Node.js Explore the latest JavaScript features, and EcmaScript modules Walk through different stages of developing robust applications using Node.js 10 Book Description Node.js is a server-side",
            author: "David Herron",
            publisher: "Ingram",
            category: "Software Development",
            price: 500,
            cover: "https://images-na.ssl-images-amazon.com/images/I/51QGomXnwvL._SX404_BO1,204,203,200_.jpg",
		}),
		new Book({
			title: "Java Script on Things: Hacking Hardware for Web Developers",
            description: "This book teaches the fundamentals of electronics and embedded systems for folks who are comfortable with basic JavaScript but who may have no experience what-so-ever wiring up even the simplest circuit. Emphasis is put on the topics that will be new to software developers: the critical basics of designing and building circuits, hardware components (sensors, motors, resistors and the like) and the interface between hard-ware and software. Over the course of this book, you’ll get hands-on with a variety of",
            author: "Lyza Danger Gardner",
            publisher: "Dreamtech Press",
            category: "Software Development",
            price: 900,
            cover: "https://images-na.ssl-images-amazon.com/images/I/41LFFu+ffJL._SX380_BO1,204,203,200_.jpg",
		}),
		new Book({
			title: "Core Python Programming",
            description: "At present, Java occupies number 1 rank as the most used programming language since almost all the projects are developed in Java. Python is already occupying 2nd to 4th position and will be the most demanded language after Java in near future. Python is used with other programming languages on Internet as well as for developing standalone applications. Python programmers are paid high salaries in the software development industry. Hence, it is time for beginners as well as existing programmers to focus their attention on Python.",
            author: "Dr. R. Nageswara Rao",
            publisher: "Dreamtech Press",
            category: "Software Development",
            price: 525,
            cover: "https://images-na.ssl-images-amazon.com/images/I/51Ss-7j3v5L._SX362_BO1,204,203,200_.jpg",
		}),
		new Book({
			title: "Machine Learning using Python",
            description: "This book is written to provide a strong foundation in machine learning using Python libraries by providing real-life case studies and examples. It covers topics such as foundations of machine learning, introduction to Python, descriptive analytics and predictive analytics. Advanced machine learning concepts such as decision tree learning, random forest, boosting, recommended systems, and text analytics are covered. The book takes a balanced approach between theoretical understanding and",
            author: "U Dinesh Kumar",
            publisher: "Wiley",
            category: "Software Development",
            price: 450,
            cover: "https://images-na.ssl-images-amazon.com/images/I/51bffNVIcmL._SX385_BO1,204,203,200_.jpg",
		})
];

for (var i = 0, done=0; i < books.length; i++) {
	books[i].save(function (err, result) {
		done++;
		if(done == books.length)
			mongoose.disconnect();
	});
}