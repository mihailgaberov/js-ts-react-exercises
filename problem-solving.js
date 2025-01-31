const TRUNC_CHARS_LENGTH = 4;

const TRUNC_CHARS = " ...";

function truncNotification(message, K) {
  if (K < TRUNC_CHARS.length) return "...";

  const words = message.split(" ");
  let resultWords = [];
  let currentLength = 0;

  for (const word of words) {
    const space = resultWords.length > 0 ? 1 : 0;

    if (currentLength + space + word.length + TRUNC_CHARS.length > K) {
      break;
    }

    resultWords.push(word);
    currentLength += space + word.length;
  }

  const result = resultWords.join(" ");
  return result.length < message.length ? result + TRUNC_CHARS : result;
}

// Example usage
console.log(truncNotification("And now here is my secret", 15)); // "And now ..."
console.log(truncNotification("There is an animal with four legs", 15)); // "There is an ..."
console.log(truncNotification("super dog", 4)); // "..."
console.log(truncNotification("how are you", 20)); // "how are you"
// =======================================================================================

function isPalindrome(s) {
  let l = 0,
    r = s.length - 1;

  while (l < r) {
    while (l < r && !alphaNum(s[l])) {
      l++;
    }
    while (r > l && !alphaNum(s[r])) {
      r--;
    }
    if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false;
    }
    l++;
    r--;
  }
  return true;
}

function alphaNum(c) {
  return (
    (c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || (c >= "0" && c <= "9")
  );
}

function isPalindromeReverseStrings(str) {
  let res = "";

  for (const s of str) {
    if (alphaNum(s)) {
      res += s.toLocaleLowerCase();
    }
  }

  return res === res.split("").reverse().join("");
}

console.log(isPalindrome("Was it a car or a cat I saw?")); // Output: true
console.log(isPalindrome("tab a cat")); // Output: false
console.log(isPalindrome("As I pee, sir, I see pisa")); // Output: true
// =======================================================================================

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const squares = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === ".") {
        continue;
      }

      const currentValue = board[r][c];
      const squareIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (
        rows[r].has(currentValue) ||
        cols[c].has(currentValue) ||
        squares[squareIndex].has(currentValue)
      ) {
        return false;
      }

      rows[r].add(currentValue);
      cols[c].add(currentValue);
      squares[squareIndex].add(currentValue);
    }
  }
  return true;
};
// =======================================================================================
