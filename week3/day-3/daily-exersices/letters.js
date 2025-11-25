<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Letters Only Input</title>

    <!-- CSS inside the HTML file -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            padding: 40px;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        .container {
            width: 350px;
            margin: 30px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #aaa;
        }

        .hint {
            font-size: 13px;
            color: #666;
            margin-top: 10px;
        }
    </style>

</head>
<body>

    <h1>Letters Only Input Field</h1>

    <div class="container">
        <label for="onlyLetters">Type Letters Only:</label>
        <input type="text" id="onlyLetters" placeholder="Type here...">
        <p class="hint">Numbers and special characters will be removed automatically.</p>
    </div>

    <!-- JavaScript inside the HTML file -->
    <script>
        const input = document.getElementById("onlyLetters");

        input.addEventListener("input", function () {
            // Allow only A–Z and a–z
            this.value = this.value.replace(/[^a-zA-Z]/g, "");
        });
    </script>

</body>
</html>
