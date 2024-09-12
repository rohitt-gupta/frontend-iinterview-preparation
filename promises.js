// PROMISES
/**
 * Synchronous vs Asynchronous code
 */

// function learnJS() {
// 	return new Promise((res, rej) => {
// 		setTimeout(() => {
// 			res("Learn and master Javascript");
// 		}, 1000);
// 	});
// }

// function learnReact() {
// 	return new Promise((res, rej) => {
// 		setTimeout(() => {
// 			res("Now learn Reactjs");
// 		}, 2000);
// 	});
// }

// function finallyBuild() {
// 	return new Promise((res, rej) => {
// 		setTimeout(() => {
// 			rej("Build the tools people love and use");
// 		}, 2000);
// 	});
// }

// Since JS is a single threaded language so JS engine executes sync code first and async code second
// for eg: Here since setTimeout is one of the browser API it is considered as async code hence it get's executed at last.

// Hello
// World
// My name is Rohit

// console.log("Hello");

// setTimeout(() => {
// 	console.log("My name is Rohit");
// }, 0);
// console.log("World");

// example: 2

// console.log("start"); // start

// function importantAction(username) {
// 	setTimeout(() => {
// 		return `Follow ${username} on twitter at @whyrohitwhy`;
// 	}, 1000);
// }

// const message = importantAction("ROhit");

// console.log(message); //undefined
// console.log("stop"); // stop

/**
 * TO resolve the undefined issue we use callbacks
 */

// console.log("start"); // start

// function importantAction(username, cb) {
// 	setTimeout(() => {
// 		cb(`Follow ${username} on twitter at @whyrohitwhy`);
// 	}, 1000);
// }

// const message = importantAction("ROhit", (message) => {
// 	console.log(message); // Follow ROhit on twitter at @whyrohitwhy
// });

// console.log("stop"); // stop

/**
 * WHat if you want to have multiple async tasks dependent of each other
 */

/**
 * TO resolve the undefined issue we use callbacks
 */

// console.log("start"); // start

// function importantAction(username, cb) {
// 	setTimeout(() => {
// 		cb(`Follow ${username} on twitter at @whyrohitwhy`);
// 	}, 1000);
// }

// function anotherImportantTaskBasedOnMessage(resultedMessage, cb) {
// 	setTimeout(() => {
// 		cb("Like the latest post as well!");
// 	}, 0);
// }
// importantAction("ROhit", (message) => {
// 	console.log(message); // Follow ROhit on twitter at @whyrohitwhy
// 	anotherImportantTaskBasedOnMessage(message, (second) => {
// 		console.log(second);
// 	});
// });

// console.log("stop"); // stop

// !! THIS IS CALLED CALLBACK HELL, PROMISES IS THE SOLUTION

/**
 * What is promises
 * The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
 */

// const following = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		const result = false;
// 		if (result) {
// 			resolve("Thank you for following me on Twitter");
// 		} else {
// 			reject("PLease Follow me!");
// 		}
// 	}, 2000);
// });

// following
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		throw err;
// 	});

// 2nd way

// console.log("Start");
// const sub = Promise.resolve("Thank you for following me!");

// console.log(sub);
// sub.then((res) => {
// 	console.log(res);
// });
// console.log("Start");

/**
 * Promise chaining: chain multiple promises by returning2nd promise from 1st promise
 */

// const sub = Promise.resolve("Follow to my github");
// const start = Promise.resolve("Star the repo");

// sub
// 	.then((res) => {
// 		console.log(res);
// 		return start;
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	});

/**
 * Promise combinators:
 *
 */

// 1. Promise.all : returns an array of resolved promises but if anyone of them gets rejected it

// console.log("start");
// Promise.all([learnJS(), learnReact(), finallyBuild()]).then((res) => {
// 	console.log(res);
// });
// console.log("end");

/**
 * 2. Promise.race: return first promise which fulfilled first */

// console.log("start");
// Promise.race([learnJS(), learnReact(), finallyBuild()]).then((res) => {
// 	console.log(res);
// });
// console.log("end");

/**
 * 3. Promise.allSettled: returns failed promises as well as fulfilled promises
 * [
  { status: 'fulfilled', value: 'Learn and master Javascript' },
  { status: 'fulfilled', value: 'Now learn Reactjs' },
  { status: 'rejected', reason: 'Build the tools people love and use' }
]
 *
 */

// console.log("start");
// Promise.allSettled([learnJS(), learnReact(), finallyBuild()]).then((res) => {
// 	console.log(res);
// });
// console.log("end");
// // CONSOLE
// [
// 	{ status: "fulfilled", value: "Learn and master Javascript" },
// 	{ status: "fulfilled", value: "Now learn Reactjs" },
// 	{ status: "rejected", reason: "Build the tools people love and use" },
// ];

/**
 * 2. Promise.any: returns first resolved promise and ignores all the rejected ones
 */

// console.log("start");
// Promise.any([learnJS(), learnReact(), finallyBuild()]).then((res) => {
// 	console.log(res);
// });
// console.log("end");

/**
 * ASYNC AWAIT
 */

// const result = async () => {
// 	try {
// 		const res = await learnJS();
// 		const res1 = await learnReact();
// 		const res2 = await finallyBuild();
// 		console.log(res);
// 		console.log(res1);
// 		console.log(res2);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// result();

/**
 * 1.what is the output?
 * When the execution starts JS engine will run all the sync code and then async code.
 * the sync code inside promise will also be considered as sync and will be called at first
 */
// start 1 end 2

// console.log("start");
// const promise1 = new Promise((resolve, reject) => {
// 	console.log(1);
// 	resolve(2);
// });

// promise1.then((res) => {
// 	console.log(res);
// });

// console.log("end");

/**
 * 2. What is the output?
 * start 1 3 end 2
 */

// console.log("start");
// const promise1 = new Promise((resolve, reject) => {
// 	console.log(1);
// 	resolve(2);
// 	console.log(3);
// });

// promise1.then((res) => {
// 	console.log(res);
// });

// console.log("end");

/**
 * 3.what is the output?
 * start
middle
1
end
success
 */
// console.log("start");
// const fn = () =>
// 	new Promise((resolve, reject) => {
// 		console.log(1);
// 		resolve("success");
// 	});

// console.log("middle");

// fn().then((res) => {
// 	console.log(res);
// });

// console.log("end");

/**
 * 9 . Solve promise recursively
 */

function learnJS() {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("Learn and master Javascript");
		}, 1000);
	});
}

function learnReact() {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res("Now learn Reactjs");
		}, 2000);
	});
}

function finallyBuild() {
	return new Promise((res, rej) => {
		setTimeout(() => {
			rej("Build the tools people love and use");
		}, 2000);
	});
}

// function promRecurse(funPromises) {}

// promRecurse([learnJS(), learnReact(), finallyBuild()]);

/**
 * PROMISE.ALL polyfill
 */

Promise.allPolyfill = (promises) => {
	return new Promise((resolve, reject) => {
		// here
	});
};

Promise.allPolyfill([learnJS(), learnReact(), finallyBuild()]).then((res) => {
	console.log(res);
});
