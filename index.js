const PORT = 3000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const url = "https://news.ycombinator.com/news";
arr3 = [];

app.get("/", function (req, res) {
  res.json("This is my webscraper");
});

app.get("/results", (req, res) => {
  axios(url) // axios reads the url const & makes the necessary HTTP requests
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html); // cheerio loads requested data from the server , saved as $ for reference
      arr1 = [];
      arr2 = [];
      arrC = [];

      $(".athing", html).each(function () {
        // selects all sections with classname athing
        const title = $(this).find(".titlelink").text(); // grab title from titlelink classname
        const rank = $(this).find(".rank").text(); // grab rank from rank classname
        const wordcount = title.split(" ").length; // store title length in const wordcount

        arr1.push({
          // push the data into array1
          title: title,
          rank: rank,
          wordcount: wordcount,
        });
      });
      $(".subtext", html).each(function () {
        const score1 = $(this).find(".score").text();
        const score2 = score1.replace(/points|point/gi, "");
        const score = score2.replace(/\s+/g, "");

        const comments1 = $(this).find("a:last").text(); // grabs comments from last a tag, no classname but cheerio handles this
        const comments2 = comments1.replace(/comments|comment/gi, ""); // removing unwanted data in string for filtering
        comments2 = comments1.replace(/discuss|hide/gi, "");
        const comments = comments2.replace(/\s+/g, "");
        arr2.push({
          // push data into array2
          score: score,
          comments: comments,
        });
      });
      const arr3 = arr1.map((el, index) => {
        // merge arr1 & arr2 by index
        return {
          ...el,
          ...arr2[index],
        };
      });
      //console.log(arr3);

      function filterByPlus5Words(item) {
        if (Number.isFinite(item.wordcount) && item.wordcount > 5) {
          return true;
        }
      }

      function filterBy5WordsOrLess(item) {
        if (Number.isFinite(item.wordcount) && item.wordcount <= 5) {
          return true;
        }
      }

      let arrBy5WordPlus = arr3.filter(filterByPlus5Words);
      arrBy5WordPlus.sort((a, b) => {
        return b.comments - a.comments;
      });

      let arrLessThan5Words = arr3.filter(filterBy5WordsOrLess);
      arrLessThan5Words.sort((a, b) => {
        return b.score - a.score;
      });

      res.json(arr3);
    })
    .catch((err) => console.log(err));
});

app.get("/5plus", (req, res) => {
  axios(url) // axios reads the url const & makes the necessary HTTP requests
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html); // cheerio loads requested data from the server , saved as $ for reference
      arr1 = [];
      arr2 = [];
      arrC = [];

      $(".athing", html).each(function () {
        // selects all sections with classname athing
        const title = $(this).find(".titlelink").text(); // grab title from titlelink classname
        const rank = $(this).find(".rank").text(); // grab rank from rank classname
        const wordcount = title.split(" ").length; // store title length in const wordcount

        arr1.push({
          // push the data into array1
          title: title,
          rank: rank,
          wordcount: wordcount,
        });
      });
      $(".subtext", html).each(function () {
        const score1 = $(this).find(".score").text();
        const score2 = score1.replace(/points|point/gi, "");
        const score = score2.replace(/\s+/g, "");

        const comments1 = $(this).find("a:last").text(); // grabs comments from last a tag, no classname but cheerio handles this
        const comments2 = comments1.replace(/comments|comment/gi, ""); // removing unwanted data in string for filtering
        const comments = comments2.replace(/\s+/g, "");
        arr2.push({
          // push data into array2
          score: score,
          comments: comments,
        });
      });
      const arr3 = arr1.map((el, index) => {
        // merge arr1 & arr2 by index
        return {
          ...el,
          ...arr2[index],
        };
      });
      //console.log(arr3);

      function filterByPlus5Words(item) {
        if (Number.isFinite(item.wordcount) && item.wordcount > 5) {
          return true;
        }
      }

      let arrBy5WordPlus = arr3.filter(filterByPlus5Words);
      arrBy5WordPlus.sort((a, b) => {
        return b.comments - a.comments;
      });
      res.json(arrBy5WordPlus);
    })
    .catch((err) => console.log(err));
});

app.get("/Less5", (req, res) => {
  axios(url) // axios reads the url const & makes the necessary HTTP requests
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html); // cheerio loads requested data from the server , saved as $ for reference
      arr1 = [];
      arr2 = [];
      arrC = [];

      $(".athing", html).each(function () {
        // selects all sections with classname athing
        const title = $(this).find(".titlelink").text(); // grab title from titlelink classname
        const rank = $(this).find(".rank").text(); // grab rank from rank classname
        const wordcount = title.split(" ").length; // store title length in const wordcount

        arr1.push({
          // push the data into array1
          title: title,
          rank: rank,
          wordcount: wordcount,
        });
      });
      $(".subtext", html).each(function () {
        const score1 = $(this).find(".score").text();
        const score2 = score1.replace(/points|point/gi, "");
        const score = score2.replace(/\s+/g, "");

        const comments1 = $(this).find("a:last").text(); // grabs comments from last a tag, no classname but cheerio handles this
        const comments2 = comments1.replace(/comments|comment/gi, ""); // removing unwanted data in string for filtering
        const comments = comments2.replace(/\s+/g, "");
        arr2.push({
          // push data into array2
          score: score,
          comments: comments,
        });
      });
      const arr3 = arr1.map((el, index) => {
        // merge arr1 & arr2 by index
        return {
          ...el,
          ...arr2[index],
        };
      });

      function filterBy5WordsOrLess(item) {
        if (Number.isFinite(item.wordcount) && item.wordcount <= 5) {
          return true;
        }
      }

      let arrLessThan5Words = arr3.filter(filterBy5WordsOrLess);
      arrLessThan5Words.sort((a, b) => {
        return b.score - a.score;
      });

      res.json(arrLessThan5Words);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
