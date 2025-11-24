  // Exercise 1: Random Number
        function runExercise1() {
            const resultDiv = document.getElementById('result1');
            resultDiv.innerHTML = '<p>Check the browser console for results.</p>';
            
            function getEvenNumbers() {
                const randomNum = Math.floor(Math.random() * 100) + 1;
                console.log(`Random number: ${randomNum}`);
                console.log("Even numbers from 0 to " + randomNum + ":");
                
                for (let i = 0; i <= randomNum; i++) {
                    if (i % 2 === 0) {
                        console.log(i);
                    }
                }
                return randomNum;
            }
            
            const randomNumber = getEvenNumbers();
            resultDiv.innerHTML += `<p>Generated random number: ${randomNumber}</p>`;
        }

        // Exercise 2: Capitalized Letters
        function runExercise2() {
            const resultDiv = document.getElementById('result2');
            
            function capitalize(str) {
                let evenCapitalized = '';
                let oddCapitalized = '';
                
                for (let i = 0; i < str.length; i++) {
                    if (i % 2 === 0) {
                        evenCapitalized += str[i].toUpperCase();
                        oddCapitalized += str[i];
                    } else {
                        evenCapitalized += str[i];
                        oddCapitalized += str[i].toUpperCase();
                    }
                }
                
                return [evenCapitalized, oddCapitalized];
            }
            
            const input = "abcdef";
            const result = capitalize(input);
            resultDiv.innerHTML = `<p>Input: "${input}"</p>
                                  <p>Even indexes capitalized: "${result[0]}"</p>
                                  <p>Odd indexes capitalized: "${result[1]}"</p>`;
        }

        // Exercise 3: Is Palindrome?
        function runExercise3() {
            const resultDiv = document.getElementById('result3');
            
            function isPalindrome(str) {
                const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                const reversedStr = cleanStr.split('').reverse().join('');
                return cleanStr === reversedStr;
            }
            
            const test1 = "madam";
            const test2 = "hello";
            
            resultDiv.innerHTML = `<p>"${test1}" is a palindrome: ${isPalindrome(test1)}</p>
                                  <p>"${test2}" is a palindrome: ${isPalindrome(test2)}</p>`;
        }

        // Exercise 4: Biggest Number
        function runExercise4() {
            const resultDiv = document.getElementById('result4');
            
            function biggestNumberInArray(arr) {
                let max = 0;
                
                for (let i = 0; i < arr.length; i++) {
                    if (typeof arr[i] === 'number' && arr[i] > max) {
                        max = arr[i];
                    }
                }
                
                return max;
            }
            
            const array1 = [-1, 0, 3, 100, 99, 2, 99];
            const array2 = ['a', 3, 4, 2];
            const array3 = [];
            
            resultDiv.innerHTML = `<p>Array: [${array1.join(', ')}] → Biggest number: ${biggestNumberInArray(array1)}</p>
                                  <p>Array: [${array2.join(', ')}] → Biggest number: ${biggestNumberInArray(array2)}</p>
                                  <p>Array: [${array3.join(', ')}] → Biggest number: ${biggestNumberInArray(array3)}</p>`;
        }

        // Exercise 5: Unique Elements
        function runExercise5() {
            const resultDiv = document.getElementById('result5');
            
            function getUniqueElements(arr) {
                return [...new Set(arr)];
            }
            
            const list = [1, 2, 3, 3, 3, 3, 4, 5];
            const uniqueList = getUniqueElements(list);
            
            resultDiv.innerHTML = `<p>Original array: [${list.join(', ')}]</p>
                                  <p>Array with unique elements: [${uniqueList.join(', ')}]</p>`;
        }

        // Exercise 6: Calendar
        function runExercise6() {
            function createCalendar(year, month) {
                const container = document.getElementById('calendar-container');
                container.innerHTML = '';
                
                // Create table element
                const table = document.createElement('table');
                
                // Create header row with weekday names
                const headerRow = document.createElement('tr');
                const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
                
                weekdays.forEach(day => {
                    const th = document.createElement('th');
                    th.textContent = day;
                    headerRow.appendChild(th);
                });
                
                table.appendChild(headerRow);
                
                // Get first day of month and number of days in month
                const firstDay = new Date(year, month - 1, 1);
                const lastDay = new Date(year, month, 0);
                const daysInMonth = lastDay.getDate();
                
                // Calculate the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
                let firstDayOfWeek = firstDay.getDay();
                // Adjust to make Monday the first day (0 = Monday, 6 = Sunday)
                firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
                
                // Create calendar cells
                let date = 1;
                for (let i = 0; i < 6; i++) {
                    const row = document.createElement('tr');
                    
                    for (let j = 0; j < 7; j++) {
                        const cell = document.createElement('td');
                        
                        if (i === 0 && j < firstDayOfWeek) {
                            // Empty cells before the first day of the month
                            cell.textContent = '.';
                        } else if (date > daysInMonth) {
                            // Empty cells after the last day of the month
                            cell.textContent = '';
                        } else {
                            // Cells with dates
                            cell.textContent = date;
                            date++;
                        }
                        
                        row.appendChild(cell);
                    }
                    
                    table.appendChild(row);
                    
                    // Break if we've displayed all days
                    if (date > daysInMonth) {
                        break;
                    }
                }
                
                container.appendChild(table);
            }
            
            createCalendar(2012, 9); // September 2012
        }