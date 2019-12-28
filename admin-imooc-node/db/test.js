// /**
//  * @param {number[][]} image
//  * @param {number} sr
//  * @param {number} sc
//  * @param {number} newColor
//  * @return {number[][]}
//  */
// var floodFill = function (image, sr, sc, newColor) {
//   var startColor = image[sr][sc]
//   image[sr][sc] = newColor
//   const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
//   var vis = new Array(image.length)
//   for (let i = 0; i < image.length; i++) {
//     vis[i] = new Array(image[0].length).fill(0)
//   }
//   function dfs(x, y) {
//     vis[x][y] = 1
//     for (let i = 0; i < 4; i++) {
//       const nextX = x + dir[i][0]
//       const nextY = y + dir[i][1]
//       if (nextX >= 0 && nextX < image.length && nextY >= 0 && nextY < image[0].length && vis[nextX][nextY] == 0 && image[nextX][nextY] == startColor) {
//         image[nextX][nextY] = newColor
//         dfs(nextX, nextY)
//       }
//     }
//   }
//   dfs(sr, sc)
//   return image
// };

var arr = [1,2,3,[4,5]]
const a = [].concat(arr)
const b = [].concat(...arr)
console.log(b, a)