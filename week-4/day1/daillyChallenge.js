// Step 1: Define the Video class
class Video {
    constructor(title, uploader, time) {
        this.title = title;       // Video title
        this.uploader = uploader; // Person who uploaded
        this.time = time;         // Duration in seconds
    }

    // Step 2: Method to display watch message
    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}

// Step 3: Instantiate two Video objects and call watch()
const video1 = new Video("Learn JavaScript", "Alice", 300);
video1.watch(); // Alice watched all 300 seconds of Learn JavaScript!

const video2 = new Video("CSS Basics", "Bob", 180);
video2.watch(); // Bob watched all 180 seconds of CSS Basics!

// Step 4: Bonus - Store data for 5 videos in an array
const videosData = [
    { title: "React Tutorial", uploader: "Carol", time: 600 },
    { title: "Node.js Crash Course", uploader: "Dave", time: 400 },
    { title: "HTML5 Guide", uploader: "Eve", time: 250 },
    { title: "Python for Beginners", uploader: "Frank", time: 500 },
    { title: "Django Basics", uploader: "Grace", time: 450 }
];

// Step 5: Loop through the array to create Video instances and call watch()
const videoInstances = videosData.map(data => new Video(data.title, data.uploader, data.time));

videoInstances.forEach(video => video.watch());
