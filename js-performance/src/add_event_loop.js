var aButtons = document.querySelectorAll("button");

// 此时点击页面中的按钮，输出的索引值都是为 aButtons.length
// 全局变量i在循环完成后已经变成了 aButtons.length，当执行点击事件时，输出的就是aButtons.length
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = function () {
//     console.log(`当前索引值为${i}`);
//   };
// }

// 基于闭包思想
// 事件委托
// 添加自定义属性

// 方法1
// for (var i = 0; i < aButtons.length; i++) {
//   (function (i) {
//     aButtons[i].onclick = function () {
//       console.log(`当前索引值为${i}`);
//     };
//   })(i);
// }
// 方法2
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = (function (i) {
//     return function () {
//       console.log(`当前索引值为${i}`);
//     };
//   })(i);
// }
// 方法3-使用es6的let
// for (let i = 0; i < aButtons.length; i++) {
//   aButtons[i].onclick = (function (i) {
//     return function () {
//       console.log(`当前索引值为${i}`);
//     };
//   })(i);
// }

// 方法4-添加自定义属性
// for (var i = 0; i < aButtons.length; i++) {
//   aButtons[i].myIndex = i;
//   aButtons[i].onclick = function () {
//     console.log(`当前索引值为${this.myIndex}`);
//   };
// }

// 方法5-事件委托
// html
{
  /* <body>
  <button index="1">button1</button>
  <button index="2">button2</button>
  <button index="3">button3</button>
</body>; */
}

// js
// document.body.onclick=function(e){
//   var target = e.target
//   var targetDom = target.tagName
//   if(targetDom === 'BUTTON){
//     var index = target.getAttribute('index')
//     console.log(`当前点击的是第${index}个`)
//   }
// }
