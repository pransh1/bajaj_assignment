import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config()
app.use(express.json());

const PORT = process.env.PORT || 3000;

const userName = "john_doe";
const date_of_birth = "17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "please add data"
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum_of_all_number = 0;
    let all_letters = "";

    for (let j = 0; j < data.length; j++) {
      let str = String(data[j]);
      // console.log(str);
      if (/^\d+$/.test(str)) {
        const num = parseInt(str);
        // console.log(num)
        if (num % 2 === 0) {
          even_numbers.push(str);
        } else {
          odd_numbers.push(str);
        }
        sum_of_all_number += num;
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        all_letters += str;
      } else {
        special_characters.push(str);
      }
    }

    const reversed = all_letters.split("").reverse().join("");
    // console.log(reversed)
    let concat_string =  "";
    for (let i = 0; i < reversed.length; i++) {
       concat_string  += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
     }
    //  console.log(concat_string)

    res.status(200).json({
      is_success: true,
      user_id: `${userName}_${date_of_birth}`,
      email: email,
      roll_number: roll_number,
      even_numbers,
      odd_numbers,
      alphabets,
      special_characters,
      sum: sum_of_all_number.toString(),
      concat_string
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
