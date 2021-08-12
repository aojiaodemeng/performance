# 哪种循环遍历方法最快?

答案是：for(reverse)

在个人电脑上，对这几种遍历方式进行测试，最终得出了 for(reverse) 是最快的循环遍历。测试的方法是，遍历一个有 100 万个元素的数组，计算出整个过程的耗时，代码如下：

```javascript
const million = 1000000;
const arr = Array(million);
console.time("⏳");

for (let i = arr.length; i > 0; i--) {} // for(reverse) :- 1.5ms
for (let i = 0; i < arr.length; i++) {} // for          :- 1.6ms

arr.forEach((v) => v); // foreach      :- 2.1ms
for (const v of arr) {
} // for...of     :- 11.7ms

console.timeEnd("⏳");
```

这里 for 的正向遍历和反向遍历耗时几乎是一样的，只有 0.1ms 的差异。原因是 for(reverse) 只进行一次 let i = arr.length , 而在 for 中每次都要进行 i < arr.length 判断，针对这点细微的差别可以忽略。和 for 相比，foreach 和 for...of 在数组遍历过程会更耗时。

// 如果将 for (let i = 0; i < arr.length; i++) {} 改为 for (let i = 0, length = arr.length; i < length; i++) {} 那么是不是就没有什么差异了呢？

# 不同循环遍历方法的应用场景

## for 循环

for 是大家较为熟悉的循环遍历方式，而且它的遍历速度是最快的，那是不是什么场景都推荐用 for 呢？答案是否定的，因为除了要考虑性能因素之外，代码的可读性通常更为重要。

## forEach

forEach 在数组遍历过程中，不能被 break 或 return 提前结束循环。

```javascript
const things = ["have", "fun", "coding"];
const callbackFun = (item, idex) => {
  console.log(`${item} - ${index}`);
};
things.foreach(callbackFun);
```

## for ... of

for...of 是 ES6 支持的特性，用于遍历可迭代的对象，例如 String、Array、Map 和 Set 等，它对于代码可读性比较好。

```javascript
const arr = [3, 5, 7];
const str = "hello";
for (let i of arr) {
  console.log(i); // logs 3, 5, 7
}
for (let i of str) {
  console.log(i); // logs 'h', 'e', 'l', 'l', 'o'
}
```

// Airbnb 的代码规范中是不推荐使用 for...of 语句的。如果在 eslint 配置了 eslint-config-airbnb，当代码中使用了 for...of 会提示 iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations. 虽然 Airbnb 的代码规范维护者，同样认为代码的可读性要比性能更重要，但是 for...of 的迭代遍历的底层是依赖于 Symbol，需要引入 regenerator-runtime 来做支持。为了用 for...of 而引入一个额外的库，付出的成本有点高

## for...in

for...in 可以遍历访问对象的所有可枚举属性。当用 for...in 访问数组的时候，除了返回数组的索引之外，数组上的用户自定义属性也会被返回，所以要避免用 for...in 遍历数组。为了解释这个问题，可以参考下面这段代码

```javascript
const array = ["k", "o", "o"];

array.koo = true;

for (const key in array) {
  console.log(key); // 顺次打印 '0', '1', '2', 'koo'
}
```

Airbnb 的代码规范中也不推荐使用 for...in 来遍历对象的属性，推荐的方法是使用 Object.{keys,values,entries}

# 总结

- for 速度最快, 但可读性差
- foreach 速度快, 可控制属性
- for...of 比较慢, 但好用
- for...in 比较慢, 最不好用

最后给一个建议，把代码的可读性放在第一位。当开发一个复杂的结构（系统）时，代码可读性是必不可少的，但是也应该关注性能。尽量避免在代码中添加不必要的东西，以减少对应用程序性能造成的影响。
