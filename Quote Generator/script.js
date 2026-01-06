function generate() {
  var quotes = {
    "Albert Einstein":
      "“Our task must be to free ourselves... by widening our circle of compassion to embrace all living creatures and the whole of nature and its beauty.”",
    "Arthur Schopenhauer": `"A man can be himself only so long as he is alone, and if he does not love solitude, he will not love freedom, for it is only when he is alone that he is really free."`,
    "Jane Eyre": `“I am no bird; and no net ensnares me: I am a free human being with an independent will.”`,
    "Soren Kierkegaard": `“People demand freedom of speech as a compensation for the freedom of thought which they seldom use.”`,
    "Nelson Mandela": `“When a man is denied the right to live the life he believes in, he has no choice but to become an outlaw.”`,
  };

  var authors = Object.keys(quotes);
  var author = authors[Math.floor(Math.random() * authors.length)];
  var quote = quotes[author];
  document.getElementById("quote").innerHTML = quote;
  document.getElementById("author").innerHTML = author;
}
