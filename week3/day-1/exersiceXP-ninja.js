// ==================== EXERCISE 1: BMI CHECK ====================

// Create person objects with BMI calculation method
const person1 = {
    fullName: "Michael Johnson",
    mass: 78,
    height: 1.80,
    calculateBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

const person2 = {
    fullName: "Sarah Williams",
    mass: 62,
    height: 1.68,
    calculateBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

const person3 = {
    fullName: "Robert Brown",
    mass: 95,
    height: 1.75,
    calculateBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

// Function to compare BMI of two people
function compareBMI(personA, personB) {
    const bmiA = personA.calculateBMI();
    const bmiB = personB.calculateBMI();
    
    console.log(`\nComparing ${personA.fullName} vs ${personB.fullName}:`);
    console.log(`${personA.fullName}: ${bmiA.toFixed(2)} BMI`);
    console.log(`${personB.fullName}: ${bmiB.toFixed(2)} BMI`);
    
    if (bmiA > bmiB) {
        console.log(`→ ${personA.fullName} has the larger BMI`);
        return personA.fullName;
    } else if (bmiB > bmiA) {
        console.log(`→ ${personB.fullName} has the larger BMI`);
        return personB.fullName;
    } else {
        console.log("→ Both have the same BMI");
        return "Tie";
    }
}

// Function to find person with highest BMI from multiple people
function findHighestBMI(peopleArray) {
    let highestBMI = 0;
    let personWithHighestBMI = null;
    
    for (let i = 0; i < peopleArray.length; i++) {
        const currentBMI = peopleArray[i].calculateBMI();
        console.log(`${peopleArray[i].fullName}: ${currentBMI.toFixed(2)} BMI`);
        
        if (currentBMI > highestBMI) {
            highestBMI = currentBMI;
            personWithHighestBMI = peopleArray[i];
        }
    }
    
    if (personWithHighestBMI) {
        console.log(`\nHighest BMI: ${personWithHighestBMI.fullName} with ${highestBMI.toFixed(2)}`);
        return personWithHighestBMI.fullName;
    }
    
    return null;
}

// ==================== EXERCISE 2: GRADE AVERAGE ====================

// Function to calculate average of grades
function calculateAverage(gradesList) {
    if (gradesList.length === 0) {
        console.log("No grades provided");
        return 0;
    }
    
    let sum = 0;
    for (let i = 0; i < gradesList.length; i++) {
        sum += gradesList[i];
    }
    
    return sum / gradesList.length;
}

// Function to check if student passed or failed
function checkPassFail(averageGrade) {
    return averageGrade > 65;
}

// Main function that combines both
function findAvg(gradesList) {
    console.log(`\nGrades: ${gradesList.join(', ')}`);
    
    const average = calculateAverage(gradesList);
    const passed = checkPassFail(average);
    
    console.log(`Average: ${average.toFixed(2)}`);
    
    if (passed) {
        console.log("Result: PASSED - Congratulations!");
    } else {
        console.log("Result: FAILED - You must repeat the course.");
    }
    
    return {
        average: average,
        passed: passed
    };
}

// ==================== TEST ALL FUNCTIONS ====================

console.log("=== EXERCISE 1: BMI COMPARISON ===");

// Test comparing two people
compareBMI(person1, person2);
compareBMI(person2, person3);
compareBMI(person1, person3);

// Test finding highest BMI among multiple people
console.log("\n=== FINDING HIGHEST BMI AMONG ALL PEOPLE ===");
const allPeople = [person1, person2, person3];
findHighestBMI(allPeople);

console.log("\n=== EXERCISE 2: GRADE AVERAGE ===");

// Test grade averages
findAvg([85, 90, 78, 92, 88]);  // Good grades
findAvg([45, 60, 55, 70, 50]);  // Failing grades
findAvg([80, 75, 65, 70, 85]);  // Borderline pass
findAvg([100, 95, 98, 92, 96]); // Excellent grades
findAvg([30, 40, 35, 45, 50]);  // Very low grades

// Test edge cases
console.log("\n=== EDGE CASES ===");
findAvg([65, 65, 65, 65, 65]);  // Exactly 65
findAvg([66, 66, 66, 66, 66]);  // Just above 65
findAvg([64, 64, 64, 64, 64]);  // Just below 65